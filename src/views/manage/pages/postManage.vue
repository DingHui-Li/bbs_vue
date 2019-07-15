<template>
	<el-row type="flex" justify="center" :gutter="10" class="animated fadeInDown">
		<el-col v-if="!isContent">
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
				<el-table-column prop="id" label="ID"  align="center"></el-table-column>
				<el-table-column prop="title" label="标题"  align="center">
					<template slot-scope="scope">
						<span @click="selectPostid=scope.row.id;isContent=true" style="cursor:pointer">{{scope.row.title}}</span>
					</template>
				</el-table-column>
				<el-table-column label="用户">
					<template slot-scope="scope">
						<div style="float:left;width:35px">
							<el-image :src="geturl(scope.row.icon)" style="height:30px;width:30px;border-radius:50%"></el-image>
						</div>
						<div style="float:left">
							<span style="line-height:30px;font-weight:bold;color:#757575">{{scope.row.nick_name}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="view_num" label="浏览量" align="center"></el-table-column>
				<el-table-column prop="like_num" label="点赞量"  align="center"></el-table-column>
				<el-table-column prop="recommend_num" label="收藏量"  align="center"></el-table-column>
				<el-table-column prop="reply_num" label="评论数"  align="center"></el-table-column>
				<el-table-column prop="state" label="帖子状态"  align="center"></el-table-column>
				<el-table-column label="发帖时间"  align="center">
					<template slot-scope="scope">
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
		<el-col v-else class="animated fadeIn">
			<el-card id="contentCard">
				<div slot="header" style="cursor:pointer">
					<i class="fa fa-chevron-left" aria-hidden="true" @click="isContent=false"> 返回</i>
				</div>
				<div style="font-weight:bold;color:#757575;">{{contentData.title}}</div>
				<el-scrollbar style="margin-top:20px">
					<div v-html="contentData.content" ></div>
				</el-scrollbar>
			</el-card>
			<div></div>
		</el-col>
	</el-row>	
</template>
<script>
import { apiHost, imgHost } from '../../../../apiConfig';
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
			isContent:false,//内容页
			selectPostid:-1,//选中的帖子id，用于获取内容
			contentData:[]
		}
	},
	mounted(){
		this.getData();
		//this.test();
	},
	computed:{
		
	},
	methods:{
		geturl(url){
			return imgHost+url;
		},
		getData(){
			let loading=this.$loading({
				lock: true,
				target:document.getElementById('postTable'),
				text: 'Loading',
				spinner: 'el-icon-loading',
			});
			this.axios({
                url:apiHost+'/anon/post/getIndexPostTitles?size=10&page='+this.pageNum,
                method:'get'
            }).then(res=>{
				loading.close();
				this.loading=false;
				console.log(res)
                if(res.data.code==200){
					this.postData=res.data.PostTitleList;
					this.allPageNum=Math.ceil(res.data.num/10);
                }else{
					this.$message.error('数据获取错误')
				}
				
            })
		},
		getContent(){
			this.axios({
                url:apiHost+'/anon/post/getPostTitleContent?id='+this.selectPostid,
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                    this.contentData=res.data.Content;
                }
                console.log(this.contentData)
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
					url:apiHost+'/admin/searchByColum?size=10&page=1&colum_name='+this.searchType+'&s='+this.serarchKey,
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
		},
		selectPostid:function(newVal,oldVal){
			this.getContent();
		}
	}
}
</script>
<style>
	#contentCard .el-scrollbar{
		height:80vh;
	}
</style>
