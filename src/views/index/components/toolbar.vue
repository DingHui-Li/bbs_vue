<template>
    <el-container style="padding:0;">
        <el-header style="padding:0;border-bottom:1px solid #e0e0e0"> 
                <el-menu mode="horizontal" :default-active="active" style="float:right;" id="menu">
                    <el-menu-item>
                        logo
                    </el-menu-item>
                    <el-menu-item class="hidden-md-and-up">
                        <i class="fa fa-bars" aria-hidden="true" @click="sideNav=true"></i>
                    </el-menu-item>
                    <el-menu-item >
                        <search />
                    </el-menu-item>
                    <el-menu-item v-for="(tab) in tabs" :key="tab.name+1" @click="$router.replace(tab.to)" :index="tab.to">
                        {{tab.name}}
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title">消息</template>
                        <el-menu-item index="5-1">系统通知</el-menu-item>
                        <el-menu-item index="5-2">短消息</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <img src="http://pic39.nipic.com/20140320/12795880_110914420143_2.jpg" style="width:40px;height:40px;border-radius:50%" @click="login()">
                        </template>       
                        <el-menu-item index="6-1">个人主页</el-menu-item>    
                        <el-menu-item index="6-2">登出</el-menu-item>       
                    </el-submenu>
                </el-menu>
                <transition name="el-fade-in-linea">
                    <div style="width:100vw;height:100vh;position:fixed;z-index:999;background-color:rgba(0,0,0,.3)" v-if="sideNav" @click="sideNav=false">
                        <el-menu style="width:300px;height:100vh;position:fixed;">
                            <el-menu-item v-for="tab in tabs" :key="tab.name+2" align="center" @click="$router.replace(tab.to)">
                                {{tab.name}}
                            </el-menu-item>
                        </el-menu>
                    </div>
                </transition>
        </el-header>
        <el-main style="padding:0">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>
import search from '../components/search'
export default {
    name:'toolbar',
    components:{search},
    data(){
        return{
            tabs:[{'name':'首页','to':'/home'},
                    {'name':'精选','to':'/selected'},
                    {'name':'板块','to':'/plate'},
                    {'name':'公告','to':'/notice'},
                    ],
            sideNav:false,
            active:'/home',
            state:''
        }
    },
    mounted:function(){
        this.active=this.$route.path;
        this.center();
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
        },
        center(){
            let ele=document.getElementById("menu");
            let width=ele.offsetLeft;
            ele.style.marginRight=width/2+'px';
        }
    },
    watch:{
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
