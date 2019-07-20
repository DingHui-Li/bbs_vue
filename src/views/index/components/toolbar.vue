<template>
    <el-container style="padding:0;margin:0">
        <el-header style="padding:0;border-bottom:1px solid #e0e0e0;margin-top:10px;background:none;z-index:1"> 
            <keep-alive>
                <el-menu mode="horizontal" :default-active="active" style="float:right;background:none;" id="menu">
                    <el-menu-item class="hidden-sm-and-down">
                        <img :src="require('../../../assets/logo.png')" style="width:50px" @click="$router.push('/home')">
                    </el-menu-item>
                    <el-menu-item class="hidden-md-and-up">
                        <i class="fa fa-bars" aria-hidden="true" @click="openSideNav" align="center"></i>
                    </el-menu-item>
                    <el-menu-item >
                        <search />
                    </el-menu-item>
                    <el-menu-item v-for="(tab) in tabs" :key="tab.name+1" @click="$router.replace(tab.to)" :index="tab.to" class="hidden-sm-and-down">
                        {{tab.name}}
                    </el-menu-item>
                    <el-submenu index="5" class="hidden-sm-and-down">
                        <template slot="title">消息 <el-badge :value="messageNum.total" v-if="messageNum.total!=0"></el-badge></template>  
                        <el-menu-item index="/news/system" align="center" @click="$router.replace(`/news/${'system'}`)">系统通知<el-badge :value="messageNum.system" v-if="messageNum.system!=0" style="margin-left:5px"></el-badge></el-menu-item>
                        <el-menu-item index="news/msg" align="center" @click="$router.replace(`/news/${'msg'}`)">回复我<el-badge :value="messageNum.post" v-if="messageNum.post!=0" style="margin-left:5px"></el-badge></el-menu-item>
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
            </keep-alive>
        </el-header>
        <el-main style="padding:0;background-color:#e0e0e0;min-height:100vh">
            <keep-alive>
                <router-view style="margin:0;padding:0" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view style="margin:0;padding:0" v-if="!$route.meta.keepAlive" :messageNum="messageNum" @getMessageNum="getMessageNum"></router-view>
        </el-main>
        <div id="sideNav" class="animated slideInLeft" v-if="sideNav" @click="closeSideNav">
            <div style="width:300px;height:200px;background-color:#fff" @click="goPerson()" v-if="islogin">
                <el-image :src="icon" style="width:100%;height:auto;border-radius:50%" fit="cover"></el-image>
            </div>
            <div style="width:300px;height:200px;background-color:#fff;line-height:200px;font-size:1.5rem;color:#757575" align="center" v-else  @click="login()">
                <div>未登录</div>
            </div>
            <el-menu style="width:300px;height:100vh;position:fixed;" align="center">
                <el-menu-item v-for="tab in tabs" :key="tab.name+2" @click="$router.replace(tab.to)" style="font-size:1.5rem;font-weight:bold;color:#757575">
                    {{tab.name}}
                </el-menu-item>
                <el-menu-item @click="$router.replace(`/news/${'system'}`)" style="font-size:1.5rem;font-weight:bold;color:#757575">
                    消息
                </el-menu-item>
            </el-menu>
        </div>
    </el-container>
</template>
<script>
import {apiHost,imgHost} from '../../../../apiConfig.js'
import search from '../components/search'
import { setTimeout } from 'timers';
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
            islogin:false,
            messageNum:0,
            userIcon:localStorage['userIcon']
        }
    },
    computed:{
        icon(){
                return imgHost+this.userIcon;
        }
    },
    mounted:function(){
        this.active=this.$route.path;
        this.center();
        this.checkSession();
        this.getMessageNum();
    },
    updated(){
        
    },
    methods:{
        getMessageNum(){
            this.axios({
                url:apiHost+'/message/getMessageNum',
                method:'get'
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.messageNum=res.data.data;
                }
            })
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
        checkSession(){
            this.axios({
                url:apiHost+'/checkSession',
                method:'post',
            }).then(res=>{
                if(res.data.code==200) {
                    this.islogin=true;
                    localStorage['info']=JSON.stringify(res.data.data);
                }else{
                    this.islogin=false;
                    localStorage['info']='{}';
                }
            })
        },
        openSideNav(){
            this.sideNav=true;
        },
        closeSideNav(){
            sideNav.className='slideOutLeft';
            setTimeout(()=>{
                this.sideNav=false;
            },500)
        }
    },
    watch:{
        $route:function(to,form){
            this.checkSession();
            this.active=this.$route.path;
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
    #sideNav{
        width:100vw;
        height:100vh;
        position:fixed;
        z-index:99;
        background-color:rgba(0,0,0,.3);
        animation-duration:0.5s;
    }
</style>
