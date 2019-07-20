<template>
	<el-container>
		<el-aside style="position:fixed;" id="toolbar" class="hidden-sm-and-down">
			<el-menu style="background-color:#455A64;height:100vh;color:#fff" align="center">
				<div style="width:100%;height:100px;margin-top:30px;padding-bottom:30px;border-bottom:1px solid #e0e0e0" align="center" v-if="userInfo.userBaseInfo!=undefined">
					<div>
						<el-image :src="geturl(userInfo.userBaseInfo.icon)" style="height:50px;width:50px;border-radius:50%"></el-image>
					</div>
					<span style="font-size:0.8rem ">{{userInfo.userBaseInfo.nick_name}}</span>
					<div>
						{{userInfo.roleInfos[0].name}}
					</div>
				</div>
				<el-menu-item v-for="item in sideNavToRole" :key="item.path" :index="item.path" @click="addTab(item.name,item.path)">
					{{item.name}}
				</el-menu-item>
				<el-menu-item @click="quit()">退出</el-menu-item>
			</el-menu>	
		</el-aside>	
		<el-aside class="hidden-sm-and-down"></el-aside>
		<el-main style="background-color:rgba(170, 159, 202, 0.205);min-height:100vh">
			<router-view :role="role" v-if="role!=-1"></router-view>
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
			userInfo:JSON.parse(localStorage['userInfo']),
			role:-1
		}
	},
	updated(){
		this.checkSession();
	},
	mounted(){
		this.checkSession();
	},
	computed:{
		sideNavToRole(){
			return this.sideNav;
		}
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
				console.log(res)
                if(res.data.code!=200){
					localStorage['userInfo']="{}";
					this.$message.error('未登录');
					this.role=-1;
					window.open('/',"_self");
				}else{
					this.role=res.data.data.roleInfos[0].id;
				}
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
