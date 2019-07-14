<template>
	<el-container>
		<el-aside style="position:fixed;" id="toolbar" class="hidden-sm-and-down">
			<el-menu style="background-color:#455A64;height:100vh;color:#fff" align="center">
				<el-menu-item v-for="item in sideNav" :key="item.path" :index="item.path" @click="addTab(item.name,item.path)">
					{{item.name}}
				</el-menu-item>
				<!-- <el-submenu v-for="item in sideNav" :key="item.path" :index="item.path">
					<template slot="title">{{item.name}}</template>
					<el-menu-item v-for="sonitem in item.children" :key="sonitem.path" :index="sonitem.path" >{{sonitem.name}}</el-menu-item>
				</el-submenu>	 -->
			</el-menu>	
		</el-aside>	
		<el-aside class="hidden-sm-and-down"></el-aside>
		<el-main>
			<!-- <el-tabs type="card" closable @tab-remove="removeTab" @tab-click="changeTab" v-model="selectTab">
				<el-tab-pane v-for="(tab,index) in tabs" :key="'tab-'+index" :label="tab.name" :name="tab.path"></el-tab-pane>
			</el-tabs> -->
			<router-view></router-view>
		</el-main>
	</el-container>	
</template>
<script>
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
			tabs:[]
		}
	},
	methods:{
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
		}
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
