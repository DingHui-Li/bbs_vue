<template>
    <div :style="{height:'100vh',width:'100%',position:'fixed',left:0,top:0,zIndex:-1,backgroundImage:'url('+require('../../../assets/bg.png')+')'}">
        <div style="height:100vh;width:100%;position:fixed;background-color:rgba(0,0,0,0.4)">  
            <el-row type="flex" justify="center" align="middle" style="height:100%;">
                    <el-col :xs="18" :sm="14" :md="12" :lg="8" :xl='4'>
                        <el-card style="box-shadow:none;background:none;border:none">
                                <div style="font-size:5rem;color:#fff">
                                    <img :src="require('../../../assets/logo.png')" alt="">
                                </div>
                                <div style="font-size:1.7rem;color:#fff;margin-top:20px">登录狗扑</div>
                                <div style="font-size:1.7rem;color:#fff">分享你的生活</div>
                                <div style="margin-top:50px">
                                    <el-button id="loginBtn" @click="loginDialog=true">登 录</el-button>
                                </div>
                        </el-card>
                    </el-col>
            </el-row>
        </div>
        <el-dialog :visible.sync="loginDialog"  center :append-to-body='true'>
            <span>
                <div style="font-size:5rem;color:#409EFF;margin-bottom:20px" align="center"> <img :src="require('../../../assets/logo.png')" alt=""></div>
                <el-input v-model="name" maxlength="20"  show-word-limit minlength="2">
                    <template slot="prepend">账号</template>
                </el-input>
                <el-input type="password" v-model="pw" maxlength="20" show-word-limit minlength="6" show-password>
                    <template slot="prepend">密码</template>
                </el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginDialog = false">取 消</el-button>
                <el-button type="primary" @click="loginDialog = false">登 录</el-button>
                <div align="center" style="margin-top:30px;color:#454545">没有账号？<span style="color:#409EFF;cursor:pointer" @click="registerDialog=true;loginDialog=false">去注册</span></div>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="registerDialog"  center :append-to-body='true'>
            <span>
                <div style="font-size:5rem;color:#409EFF;margin-bottom:20px" align="center"> <img :src="require('../../../assets/logo.png')" alt=""></div>
                <el-input v-model="name" maxlength="20"  show-word-limit minlength="2">
                    <template slot="prepend">账号</template>
                </el-input>
                <el-input type="password" v-model="pw" maxlength="20" show-word-limit minlength="6" show-password>
                    <template slot="prepend">密码</template>
                </el-input>
                <el-input type="password" v-model="pw" maxlength="20" show-word-limit minlength="6" show-password>
                    <template slot="prepend">确认密码</template>
                </el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginDialog = false">取 消</el-button>
                <el-button type="primary" @click="loginDialog = false">注册</el-button>
                <div align="center" style="margin-top:30px;color:#454545">已有账号？<span style="color:#409EFF;cursor:pointer" @click="loginDialog=true;registerDialog=false">去登录</span></div>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return{
            loginDialog:false,
            registerDialog:false,
            name:'',
            pw:'',
        }
    },
    methods:{
    }
}
</script>
<style>
    #loginBtn{
        font-size:1.5rem;
        color:#fff;
        background:linear-gradient(right,#7C4DFF,#409EFF);
        border-radius:30px;
        padding:8px 45px;
        border:none
    }
    #loginPanel{
       
    }
</style>
