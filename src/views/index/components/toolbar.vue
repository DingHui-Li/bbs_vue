<template>
    <el-row :gutter="40">    
        <el-col :span=24 >
            <el-col :span="3">
                logo
            </el-col>
            <el-col :span="6">
                <el-input placeholder="查找你感兴趣的内容"></el-input>
            </el-col>
            <el-col :span="12">
                <el-tabs @tab-click="handleClick" v-model="actTab">
                    <el-tab-pane v-for="tab in tabs" :key="tab.name+1" :label="tab.name" :name="tab.to">
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="3">
                <el-dropdown>
                    <el-avatar :size="40" src='http://img5.imgtn.bdimg.com/it/u=833875676,3026751171&fm=26&gp=0.jpg'></el-avatar>
                    <el-dropdown-menu slot="dropdown" @click="login()">
                        <el-dropdown-item>登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
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
                    {'name':'成为会员'},],
            actTab:""
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
