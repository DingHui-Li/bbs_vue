<template>
    <el-container style="padding:0;margin:0">
        <el-header style="padding:0;border-bottom:1px solid #e0e0e0;margin-top:10px;background:none;z-index:1"> 
            <keep-alive>
                <el-menu mode="horizontal" :default-active="active" style="float:right;background:none;" id="menu">
                    <el-menu-item class="hidden-sm-and-down">
                        <img :src="require('../../../assets/logo.png')" style="width:50px">
                    </el-menu-item>
                    <el-menu-item class="hidden-md-and-up">
                        <i class="fa fa-bars" aria-hidden="true" @click="sideNav=true" align="center"></i>
                    </el-menu-item>
                    <el-menu-item >
                        <search />
                    </el-menu-item>
                    <el-menu-item v-for="(tab) in tabs" :key="tab.name+1" @click="$router.replace(tab.to)" :index="tab.to" class="hidden-sm-and-down">
                        {{tab.name}}
                    </el-menu-item>
                    <el-submenu index="5" class="hidden-sm-and-down">
                        <template slot="title">消息 <el-badge :value="2"></el-badge></template>  
                        <el-menu-item index="/news/system" align="center" @click="$router.replace(`/news/${'system'}`)">系统通知<el-badge :value="1" style="margin-left:5px"></el-badge></el-menu-item>
                        <el-menu-item index="news/msg" align="center" @click="$router.replace(`/news/${'msg'}`)">短消息<el-badge :value="1" style="margin-left:5px"></el-badge></el-menu-item>
                    </el-submenu>
                    <el-submenu index="6" class="hidden-sm-and-down" v-if="islogin">
                        <template slot="title">
                            <img :src="icon" style="width:40px;height:40px;border-radius:50%">
                        </template>       
                        <el-menu-item index="/person" align="center" @click="goPerson()">个人主页</el-menu-item>    
                        <el-menu-item index="6-2" align="center" @click="logout()">登出</el-menu-item>       
                    </el-submenu>
                    <el-menu-item v-else class="hidden-sm-and-down">
                        <i class="fa fa-user" aria-hidden="true" @click="login()" style="font-size:1.3rem"></i>
                        <span style="font-size:0.8rem" @click="login()"> 未登录</span>
                    </el-menu-item>
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
                </keep-alive>
        </el-header>
        <el-main style="padding:0;background-color:#e0e0e0;min-height:100vh">
            <router-view style="margin:0;padding:0" @getUserInfo="getUserInfo"></router-view>
        </el-main>
    </el-container>
</template>
<script>
import {apiHost,imgHost} from '../../../../apiConfig.js'
import search from '../components/search'
export default {
    name:'toolbar',
    components:{search},
    data(){
        return{
            tabs:[{'name':'首页','to':'/home'},
                    {'name':'精选','to':'/selected'},
                    {'name':'板块','to':'/plate'},
                    ],
            sideNav:false,
            active:'/home',
            state:'',
            userInfo:{},
            islogin:false
        }
    },
    computed:{
        icon(){
            if(localStorage['userIcon']!=undefined)
                return imgHost+localStorage['userIcon'];
            if(this.userInfo!={}){
                return imgHost+this.userInfo.icon;
            }
        }
    },
    mounted:function(){
        this.active=this.$route.path;
        this.center();
        this.checkSession();
    },
    methods:{
        test(){
            alert('test')
        },
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
        logout(){
            this.axios({
                url:apiHost+'/logout',
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                    this.checkSession();
                }
            })
        },
        goPerson(){
            let id=localStorage['userId'];
            if(id!=undefined)
                this.$router.replace(`/person/${id}`)
        },
        center(){
            let ele=document.getElementById("menu");
            let width=ele.offsetLeft;
            ele.style.marginRight=width/2+'px';
        },
        getUserInfo(info){
            this.userInfo=info;
            localStorage['userIcon']=info.icon;
            localStorage['userId']=info.id;
        },
        checkSession(){
            this.axios({
                url:apiHost+'/checkSession',
                method:'post',
            }).then(res=>{
                console.log(res.data)
                if(res.data.code==200) this.islogin=true;
                else this.islogin=false;
            })
        }
    },
    watch:{
        $route:function(to,form){
            this.checkSession();
        }
    }
}
</script>
<style>
    .el-row{
        margin:0 !important;
    }
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
