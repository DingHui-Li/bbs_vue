<template>
	<el-row type="flex" justify="center" :gutter="10">
		<el-col>
			<el-col :xs="24" :lg="12" style="padding:10px">
				<el-input placeholder="输入关键字以搜索" clearable v-model="serarchKey">
					<template slot="append">
						<el-dropdown split-button  @command="changeSearchType">
							<span>
								搜索：{{searchTypeName}}
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="PostTitleInfo.id">ID</el-dropdown-item>
								<el-dropdown-item command="title">标题</el-dropdown-item>
								<el-dropdown-item command="content">内容</el-dropdown-item>
								<el-dropdown-item command="nick_name">用户昵称</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-input>
			</el-col>
			<el-col :xs="24" :lg="12" style="padding:10px">
				<el-button type="primary" :style="{display:deleteBtn}" @click="deletePost">删除</el-button>
			</el-col>
			<el-table :data='postData' stripe  ref="multipleTable" @select="select" id="postTable"
					element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
				<el-table-column type="selection"></el-table-column>
				<el-table-column prop="id" label="ID"></el-table-column>
				<el-table-column prop="title" label="标题"></el-table-column>
				<el-table-column prop="nick_name" label="用户"></el-table-column>
				<el-table-column prop="view_num" label="浏览量"></el-table-column>
				<el-table-column prop="like_num" label="点赞量"></el-table-column>
				<el-table-column prop="recommend_num" label="收藏量"></el-table-column>
				<el-table-column prop="reply_num" label="评论数"></el-table-column>
				<el-table-column label="发帖时间">
					<template slot-scope="scope" >
						<span style="font-size:0.8rem">{{dateFormat(scope.row.post_time)}}</span>
					</template>
				</el-table-column>
			</el-table>
			<el-col align="center">
				<el-pagination
					background @current-change="pageChange"
					layout="prev, pager, next"
					:page-count="allPageNum">
				</el-pagination>
			</el-col>
			
		</el-col>
	</el-row>	
</template>
<script>
import { apiHost } from '../../../../apiConfig';
import { setTimeout } from 'timers';
export default {
	data(){
		return{
			postData:[],//帖子数据
			serarchKey:'',//搜索关键字
			searchType:'PostTitleInfo.id',//搜索类型
			searchTypeName:'ID',//搜索类型名称
			selected:[],//选中的id
			deleteBtn:'none',//delete按钮显示状态
			allPageNum:1,//总页数
			pageNum:1,//当前页数
		}
	},
	mounted(){
		this.getData();
		//this.test();
	},
	computed:{
		
	},
	methods:{
		getData(){
			let loading=this.$loading({
				lock: true,
				target:postTable,
				text: 'Loading',
				spinner: 'el-icon-loading',
			});
			this.axios({
                url:apiHost+'/anon/post/getIndexPostTitles?page='+this.pageNum,
                method:'get'
            }).then(res=>{
				loading.close();
				this.loading=false;
                if(res.data.code==200){
					this.postData=res.data.PostTitleList;
					this.allPageNum=Math.ceil(res.data.num/20);
					console.log(this.allPageNum)
                }else{
					this.$message.error('数据获取错误')
				}
				
            })
		},
		changeSearchType(command){
			if(command=='PostTitleInfo.id') this.searchTypeName="ID"
			else if(command=='title') this.searchTypeName="标题"
			else if(command=='content') this.searchTypeName="内容"
			else if(command=='nick_name') this.searchTypeName="用户昵称";
			this.searchType=command;
			this.serarch();
		},
		search(){
			let loading=this.$loading({
				lock: true,
				target:postTable,
				text: 'Loading',
				spinner: 'el-icon-loading',
			});
			if(this.serarchKey.trim().length>0){
				this.axios({
					url:apiHost+'/admin/searchByColum?colum_name='+this.searchType+'&s='+this.serarchKey,
					method:'get'
				}).then(res=>{
					loading.close();
					if(res.data.code==200){
						this.postData=res.data.ls;
					}
				})
			}
		},
		select(){
			this.selected=this.$refs.multipleTable.selection.map(item=>{
				return {'id':item.id}
			});
		},
		deletePost(){
			if(this.selected.length>0){
				this.axios({
					url:apiHost+'/admin/deletePosts',
					method:'post',
					data:this.selected
				}).then(res=>{
					if(res.data.code==200){
						this.selected=[];
						this.$notify({
							title:'删除成功',
							type:'success'
						})
					}
					else{
						this.$message.error(res.data.msg);
					}
				})
			}
		},
		pageChange(page){
			this.pageNum=page;
			this.getData();
		},
		dateFormat(date){
			let d=new Date(date);
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        },
	},
	watch:{
		serarchKey:function(newVal,oldVal){
			if(newVal!=oldVal){
				this.loading=true;
				if(newVal.trim().length==0){
					this.getData();
				}
				else{
					setTimeout(()=>{
						this.search();
					},1000)
				}
			}
		},
		selected:function(newVal,oldVal){
			if(newVal.length>0){
				this.deleteBtn='block';
			}else{
				this.deleteBtn='none';
			}
		}
	}
}
</script>
<style>
</style>
