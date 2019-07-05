<template>
    <el-row :gutter="40">    
        <el-col :span='24'>
            <el-col :md="3" class="hidden-sm-and-down">
                logo
            </el-col>
            <el-col :xs="3" :sm="3" class="hidden-md-and-up">
                <i class="fa fa-bars" aria-hidden="true" @click="sideNav=true"></i>
            </el-col>
            <el-col :md="6" :xs="18" :sm="18">
                <el-input placeholder="查找你感兴趣的内容"></el-input>
            </el-col>
            <el-col :md="12" class="hidden-sm-and-down">
                <el-tabs @tab-click="handleClick" v-model="actTab">
                    <el-tab-pane v-for="tab in tabs" :key="tab.name+1" :label="tab.name" :name="tab.to">
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :md="3" :xs="3" :sm="3">
                <el-dropdown>
                    <!-- <el-avatar :size="40" src='http://pic39.nipic.com/20140320/12795880_110914420143_2.jpg'></el-avatar> -->
                    <img src="http://pic39.nipic.com/20140320/12795880_110914420143_2.jpg" style="width:40px;height:40px;border-radius:50%" @click="login()">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <transition name="el-fade-in-linea">
            <div style="width:100vw;height:100vh;position:fixed;z-index:999;background-color:rgba(0,0,0,.3)" v-if="sideNav" @click="sideNav=false">
                <el-menu style="width:300px;height:100vh;position:fixed;">
                    <el-menu-item v-for="tab in tabs" :key="tab.name+2" align="center" @click="$router.replace(tab.to)">
                        {{tab.name}}
                    </el-menu-item>
                </el-menu>
            </div>
        </transition>
        <el-col :span="24">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name:'toolbar',
    data(){
        return{
            tabs:[{'name':'首页','to':'/home'},
                    {'name':'精选','to':'/selected'},
                    {'name':'板块','to':'/plate'},
                    {'name':'公告'},
                    {'name':'成为会员',to:'/register'},],
            actTab:"",
            sideNav:false
        }
    },
    mounted:function(){
        this.actTab=this.$route.path;
    },
    methods:{
        tabChange:function(){
            this.drawer=!this.drawer;
        },
        handleClick:function(tab,event){
            if(tab.name!=undefined)
                this.$router.replace(tab.name);
        },
        login:function(){
            this.$router.replace("/login");
        }
    },
    watch:{
        $route:function(to,form){
            if(to.path=="/login") this.actTab=form.path;
            else  this.actTab=to.path;
        }
    }
}
</script>
<style>
    #searchArea{
        border-radius:50px;
        background-color: #e0e0e0;
        padding:10px;
        height:40px;
        overflow: hidden;
    }
    #searchInput{
        outline:none;
        padding:10px
    }
</style>
