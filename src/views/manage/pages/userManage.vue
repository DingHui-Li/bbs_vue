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
			<el-table :data='userData' stripe  ref="multipleTable" @select="select"
				:loading="loading" element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
				<el-table-column type="selection"></el-table-column>
				<el-table-column prop="id" label="ID"></el-table-column>
				<el-table-column prop="user_name" label="账号"></el-table-column>
				<el-table-column prop="nick_name" label="昵称"></el-table-column>
				<el-table-column prop="motto" label="签名"></el-table-column>
				<el-table-column prop="mail" label="邮箱"></el-table-column>
				<el-table-column prop="state" label="账号状态"></el-table-column>
			</el-table>
			<el-pagination
				background
				layout="prev, pager, next"
				:total="1000">
			</el-pagination>
		</el-col>
	</el-row>	
</template>
<script>
import { apiHost } from '../../../../apiConfig';
import { setTimeout } from 'timers';
export default {
	data(){
		return{
			userData:[],
			serarchKey:'',
			searchType:'PostTitleInfo.id',
			searchTypeName:'ID',
			loading:true,
			selected:[],
			deleteBtn:'none',
		}
	},
	mounted(){
		this.getData();
		//this.test();
	},
	methods:{
		getData(){
			this.axios({
                url:apiHost+'/admin/getUsers?page=1',
                method:'get'
            }).then(res=>{
				this.loading=false;
                if(res.data.code==200){
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
					console.log(this.userData)
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
		}
	}
}
</script>
<style>
</style>
