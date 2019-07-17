<template>
	<el-container>
		<el-aside style="position:fixed;" id="toolbar" class="hidden-sm-and-down">
			<el-menu style="background-color:#455A64;height:100vh;color:#fff" align="center">
				<div style="width:100%;height:100px;margin-top:40px;border-bottom:1px solid #e0e0e0" align="center">
					<div style="width:35px;">
						<el-image :src="geturl(userInfo.userBaseInfo.icon)" style="height:30px;width:30px;border-radius:50%"></el-image>
					</div>
					<span style="font-size:0.8rem ">{{userInfo.userBaseInfo.nick_name}}</span>
					<div>
						{{userInfo.roleInfos[0].name}}
					</div>
				</div>
				<el-menu-item v-for="item in sideNav" :key="item.path" :index="item.path" @click="addTab(item.name,item.path)">
					{{item.name}}
				</el-menu-item>
				<el-menu-item @click="quit()">退出</el-menu-item>
			</el-menu>	
		</el-aside>	
		<el-aside class="hidden-sm-and-down"></el-aside>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>	
</template>
<script>
import { apiHost, imgHost } from '../../../../apiConfig';
import { userInfo } from 'os';
export default {
	data(){
		return{
			selectTab:'',
			sideNav:[
				{'name':'首页','path':'/home'},
				{'name':'帖子管理','path':'/postManage'},
				{'name':'用户管理','path':'/userManage'},
				{'name':'板块管理','path':'/plateManage'},
				{'name':'公告管理','path':'/noticeManage'},
			],
			tabs:[],
			userInfo:JSON.parse(localStorage['userInfo'])
		}
	},
	updated(){
		this.checkSession();
	},
	mounted(){
		console.log(this.userInfo)
	},
	methods:{
		geturl(url){
			return imgHost+url;
		},
		addTab(name,path){
			this.$router.replace(path);
			this.selectTab=path;
			let index=this.getIndexToPath(path);
			if(index==-1){
				this.tabs.push({'name':name,'path':path});
			}
		},
		removeTab(name){
			let index=this.getIndexToPath(name);
			this.tabs.splice(index,1);
		},
		changeTab(tab,event){
			this.$router.replace(tab.name);
			this.selectTab=tab.name;
		},
		getIndexToPath(path){
			for(let i=0;i<this.tabs.length;i++){
				if(this.tabs[i].path==path){
					return i;
				}
			}
			return -1;
		},
		quit(){
			window.open('/','_self')
		},
		checkSession(){
            this.axios({
                url:apiHost+'/checkSession',
                method:'post',
            }).then(res=>{
                console.log(res.data)
            })
        },
	}
	
}
</script>
<style>
	*{
		margin:0;
		padding:0;
	}
	#toolbar .el-submenu__title{
		/* font-size:1.1rem; */
		color:#fff;
		font-weight:bold
	}
	#toolbar .el-menu-item{
		color:#fff;
		font-weight:bold
	}
</style>
