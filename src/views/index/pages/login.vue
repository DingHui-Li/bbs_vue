<template>
    <div :style="{height:'100vh',width:'100%',position:'fixed',left:0,top:0,zIndex:0,backgroundImage:'url('+require('../../../assets/bg.png')+')'}">
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
        <el-dialog :visible.sync="loginDialog"  center :append-to-body='true' :close-on-click-modal='false'>
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
                <el-button type="primary" @click="login">登 录</el-button>
                <div align="center" style="margin-top:30px;color:#454545">没有账号？<span style="color:#409EFF;cursor:pointer" @click="registerDialog=true;loginDialog=false">去注册</span></div>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="registerDialog"  center :append-to-body='true' :close-on-click-modal='false'>
            <span>
                <div style="font-size:5rem;color:#409EFF;margin-bottom:20px" align="center"> <img :src="require('../../../assets/logo.png')" alt=""></div>
                <el-input v-model="name" maxlength="20"  show-word-limit minlength="2" @change="checkName()">
                    <template slot="prepend">账号</template>
                    <template slot="append" v-if="check1" >
                        <el-tooltip :content="check1_msg" placement="top-start">
                            <i :class="check1_icon" :style="check1_icon_color" aria-hidden="true"></i>
                        </el-tooltip>
                    </template>
                </el-input>
                <el-input type="password" v-model="pw" show-password>
                    <template slot="prepend">密码</template>
                    <template slot="append" v-if="check2" >
                        <el-tooltip :content="check2_msg" placement="top-start">
                            <i :class="check2_icon" :style="check2_icon_color" aria-hidden="true"></i>
                        </el-tooltip>
                    </template>
                </el-input>
                <el-input type="password" v-model="rpw" show-password>
                    <template slot="prepend">确认密码</template>
                    <template slot="append" v-if="check3" >
                        <el-tooltip :content="check3_msg" placement="top-start">
                            <i :class="check3_icon" :style="check3_icon_color" aria-hidden="true"></i>
                        </el-tooltip>
                    </template>
                </el-input>
                <el-input type="mail" v-model="mail" @change="checkMail()">
                    <template slot="prepend">邮箱</template>
                    <template slot="append" v-if="check4" >
                        <el-tooltip :content="check4_msg" placement="top-start">
                            <i :class="check4_icon" :style="check4_icon_color" aria-hidden="true"></i>
                        </el-tooltip>
                    </template>
                </el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="loginDialog = false">取 消</el-button>
                <el-button type="primary" @click="register()">注册</el-button>
                <div align="center" style="margin-top:30px;color:#454545">已有账号？<span style="color:#409EFF;cursor:pointer" @click="loginDialog=true;registerDialog=false">去登录</span></div>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {apiHost} from '../../../../apiConfig.js'
import md5 from 'js-md5';
export default {
    name:'login',
    data(){
        return{
            loginDialog:false,
            registerDialog:false,
            name:'',
            pw:'',
            rpw:'',
            mail:'',
            loading:true,
            legal_name:false,
            check1:false,//检查注册用户名的提示图标状态
            check1_icon:'el-icon-loading',
            check1_icon_color:'color:',
            check1_msg:'查询中...',
            legal_pw:false,
            check2:false,//检查注册时密码的提示图标状态
            check2_icon:'el-icon-loading',
            check2_icon_color:'color:',
            check2_msg:'',
            legal_rpw:false,
            check3:false,//检查注册时确认密码的提示图标状态
            check3_icon:'el-icon-loading',
            check3_icon_color:'color:',
            check3_msg:'',
            legal_mail:false,
            check4:false,//检查注册时邮箱格式的提示图标状态
            check4_icon:'el-icon-loading',
            check4_icon_color:'color:',
            check4_msg:''
        }
    },
    computed:{
        createLoading(){
            return this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
    },
    methods:{
        login(){
            const loading1 = this.createLoading;
            this.axios({
                url:apiHost+"/login",
                method:'post',
                data:{'user_name':this.name,'password':md5(this.pw)}
            }).then((res)=>{
                if(res.data.code==200){
                    this.loginDialog = false;
                    this.$emit('getUserInfo',res.data)
                    localStorage['userinfo']=res.data;
                    this.$router.replace('/home');
                }else{
                    this.$message.error(res.data.msg);
                }
                loading1.close();
            }).catch(error=>{
                loading1.close();
                this.$message.error(error.message);
            })
        },
        checkName(){
            this.check1=true;
            this.check1_icon="el-icon-loading";
            this.check1_icon_color='color:';
            this.check1_msg="查询中...";
            this.legal_name=false;
            this.axios({
                url:apiHost+"/checkUsername",
                method:'post',
                data:{'user_name':this.name}
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.check1_icon="fa fa-check";
                    this.check1_icon_color='color:#8BC34A';
                    this.check1_msg=res.data.message;
                    this.legal_name=true;
                }else{
                    this.check1_icon="fa fa-exclamation-triangle";
                    this.check1_icon_color='color:#FF5252';
                    this.check1_msg=res.data.message;
                    this.legal_name=false;
                }
            })
        },
        checkMail(){
            this.check4=true;
            this.check4_icon="el-icon-loading";
            this.check4_icon_color='color:';
            this.check4_msg="查询中...";
            this.legal_mail=false;
            var re=/^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
            if(re.test(this.mail)){
                this.axios({
                    url:apiHost+'/checkMail',
                    method:'post',
                    data:{'mail':this.mail}
                }).then(res=>{
                    console.log(res)
                    if(res.data.code==200){
                        this.check4_icon="fa fa-check";
                        this.check4_icon_color='color:#8BC34A';
                        this.check4_msg="success";
                        this.legal_mail=true;
                    }else{
                        this.check4_icon="fa fa-exclamation-triangle";
                        this.check4_icon_color='color:#FF5252';
                        this.check4_msg=res.data.msg;
                        this.legal_mail=false;
                    }
                })
            }else{
                this.check4_icon="fa fa-exclamation-triangle";
                this.check4_icon_color='color:#FF5252';
                this.check4_msg="邮箱格式不正确";
                this.legal_mail=false;
            }
        },
        register(){
            const loading2 = this.createLoading;
            if(this.legal_name&&this.legal_pw&&this.legal_rpw&&this.legal_mail){
                this.axios({
                    url:apiHost+'/register',
                    method:'post',
                    data:{'user_name':this.name,'password':md5(this.pw),'mail':this.mail}
                }).then(res=>{
                    if(res.data.code==200){
                        this.registerDialog=false;
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    loading2.close();
                }).catch(error=>{
                loading2.close();
                this.$message.error(error.message);
            })
            }
        }
    },
    mounted(){
        
    },
    watch:{
        pw:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.check2=true;
                if(newVal.length>=3&&newVal.length<=20){
                    this.check2_icon="fa fa-check";
                    this.check2_icon_color='color:#8BC34A';
                    this.check2_msg="密码长度符合规则";
                    this.legal_pw=true;
                }else{
                    this.check2_icon="fa fa-exclamation-triangle";
                    this.check2_icon_color='color:#FF5252';
                    this.check2_msg="密码长度应为3-20位";
                    this.legal_pw=false;
                }
            }
            if(newVal!=this.rpw){
                this.check3_icon="fa fa-exclamation-triangle";
                this.check3_icon_color='color:#FF5252';
                this.check3_msg="密码不同";
                this.legal_rpw=false;
            }else{
                this.check3_icon="fa fa-check";
                this.check3_icon_color='color:#8BC34A';
                this.check3_msg="密码相同";
                this.legal_rpw=true;
            }
        },
        rpw:function(newVal,oldVal){
            this.check3=true;
            if(this.pw==newVal){
                this.check3_icon="fa fa-check";
                this.check3_icon_color='color:#8BC34A';
                this.check3_msg="密码相同";
                this.legal_rpw=true;
            }else{
                this.check3_icon="fa fa-exclamation-triangle";
                this.check3_icon_color='color:#FF5252';
                this.check3_msg="密码不同";
                this.legal_rpw=false;
            }
        }
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
    .el-input-group__append{
        background-color:#fff
    }
</style>
