<template>
	<el-row type="flex" justify="center" :gutter="10" class="animated fadeInDown">
		<el-col>
			<el-col :xs="24" :lg="12" style="padding:10px">
				<el-input placeholder="输入关键字以搜索" clearable v-model="serarchKey">
					<template slot="append">
						<el-dropdown split-button  @command="changeSearchType">
							<span>
								搜索：{{searchTypeName}}
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="PostTitleInfo.id">账号</el-dropdown-item>
								<el-dropdown-item command="title">邮箱</el-dropdown-item>
								<el-dropdown-item command="content">昵称</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-input>
			</el-col>
			<el-col :xs="24" :lg="12" style="padding:10px">
				<el-button type="primary" :style="{display:deleteBtn}" @click="deletePost">删除</el-button>
			</el-col>
			<el-table :data='userData' stripe  ref="multipleTable" @select="select">
				<el-table-column type="selection"></el-table-column>
				<el-table-column prop="id" label="ID"></el-table-column>
				<el-table-column prop="user_name" label="账号"></el-table-column>
				<el-table-column label="昵称">
					<template slot-scope="scope">
						<div style="float:left;width:35px">
							<el-image :src="geturl(scope.row.icon)" style="height:30px;width:30px;border-radius:50%"></el-image>
						</div>
						<div style="float:left">
							<span style="line-height:30px;font-weight:bold;color:#757575">{{scope.row.nick_name}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="motto" label="签名"></el-table-column>
				<el-table-column prop="mail" label="邮箱"></el-table-column>
				<el-table-column label="账号状态">
					<template slot-scope="scope">
						<el-select :value="scope.row.state+''" @change="stateChange">
							<el-option label="正常" value="1"></el-option>
							<el-option label="禁止登录" value="0"></el-option>
						</el-select>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination align='center' background layout="prev, pager, next" :page-count="allPageNum" @current-change="pageChange">
			</el-pagination>
		</el-col>
	</el-row>	
</template>
<script>
import { apiHost, imgHost } from '../../../../apiConfig';
import { setTimeout } from 'timers';
export default {
	data(){
		return{
			userData:[],//用户数据
			serarchKey:'',
			searchType:'PostTitleInfo.id',
			searchTypeName:'昵称',
			selected:[],
			deleteBtn:'none',
			allPageNum:1,//总页数
			pageNum:1,//当前页数
		}
	},
	mounted(){
		this.getData();
		//this.test();
	},
	methods:{
		geturl(url){
			return imgHost+url;
		},
		getData(){
			this.axios({
                url:apiHost+'/admin/getUsers?&page='+this.pageNum,
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
					this.allPageNum=Math.ceil(res.data.num/20);
					let data=[];
					for(let i=0;i<res.data.BaseInfo.length;i++){
						let row=res.data.BaseInfo[i];
						for(let j=0;j<res.data.LoginInfo.length;j++){
							if(res.data.BaseInfo[i].user_id==res.data.LoginInfo[j].id){
								for(let key in res.data.LoginInfo[j]){
									if(key!='user_id'){
										row[key]=res.data.LoginInfo[j][key];
									}
								}
								data.push(row);
							}
						}
					}
					this.userData=data;
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
			if(this.serarchKey.trim().length>0){
				this.axios({
					url:apiHost+'/admin/searchByColum?colum_name='+this.searchType+'&s='+this.serarchKey,
					method:'get'
				}).then(res=>{
					this.loading=false;
					if(res.data.code==200){
						this.postData=res.data.ls;
					}
				})
			}
		},
		select(){
			this.selected=this.$refs.multipleTable.selection.map(item=>item.id);
		},
		stateChange(val){
			alert(val)
		},
		pageChange(page){
			this.pageNum=page;
			this.getData();
		},
		deletePost(){
			if(this.selected.length>0){
				
			}
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
	}
}
</script>
<style>
</style>
