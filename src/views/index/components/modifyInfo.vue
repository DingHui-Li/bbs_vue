<template>
    <el-card class="animated fadeIn" style="animation-duration:1s">
        <div slot="header">
            <i class="fa fa-chevron-left" aria-hidden="true" @click="back()" style="cursor:pointer"> 返回</i>
        </div>
        <el-tabs tab-position="left">
            <el-tab-pane label="修改个人资料">
                <div style="float:left;width:200px">
                    <el-image :src="geturl(userInfo.icon)" 
                        @click="uploadIcon()" v-if="userInfo.icon!=undefined"
                        style="width:200px;height:200px;border-radius:50%">
                        <div slot="placeholder" class="image-slot" align="center">
							<li class="el-icon-loading"></li>
						</div>
                    </el-image>
                    <input type="file" id="iconInput" style="display:none" />
                </div>
                <div style="float:left;">
                    <el-form label-position="right" label-width="150px">
                        <el-form-item label="昵称：">
                        <el-input v-model="userInfo.nick_name"></el-input>
                        </el-form-item>
                        <el-form-item label="生日：">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期"  style="width:200px" v-model="userInfo.birth"></el-date-picker>
                        </el-col>
                        </el-form-item>
                        
                        <el-form-item label="性别：">
                        <el-radio-group v-model="userInfo.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                        </el-form-item>
                        <el-form-item label="我的签名：">
                        <el-input type="textarea" v-model="userInfo.motto"></el-input>
                        </el-form-item>
                        <el-form-item>
                        <el-button type="primary" @click="submit()">确认修改</el-button>
                        <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="修改账号信息">
                <el-form label-position="right" label-width="100px" :rules="rules" :model="accountInfo">
                    <el-form-item label="账号">
                        <el-input disabled="" v-model="accountInfo.id"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input disabled="" v-model="accountInfo.mail"></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码" prop="passowrd" required="">
                        <el-input v-model="accountInfo.password" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPw">
                        <el-input v-model="accountInfo.newPw" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="rPw">
                        <el-input v-model="rPw" type="password" show-password></el-input>
                    </el-form-item>
                </el-form>
                <div align="center">
                    <el-button type="primary" @click="submit2()">提交</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
import { apiHost, imgHost } from '../../../../apiConfig';
import md5 from 'js-md5';
export default {
    name:'modifyInfo',
    data(){
        let validatePw=(rule,value,callback)=>{
            if(this.rPw!=this.accountInfo.newPw)
                callback(new Error('两次输入密码不一致!'));
            else callback();
        }
        return{
            accountInfo:{
                id:'',
                password:'',
                mail:'',
                newPw:'',
            },
            rPw:'',
            userInfo:{
                'icon':localStorage['userIcon']
            },
            userID:this.$route.params.id,
            rules: {
                rPw:[{required: true, validator: validatePw, trigger: 'blur'}],
                password:[{required: true, message: '请输入密码', trigger: 'blur'}],
                newPw: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    mounted(){
        this.getUserInfo();
        this.getAccountInfo();
    },
    methods:{
        back(){
            this.$emit('back');
        },
        geturl(url){
            return imgHost+url;
        },
        getUserInfo(){
            this.axios({
				url:apiHost+"/userInfo/baseInfo?id="+this.userID,
				method:'post'
			}).then(res=>{
				if(res.data.code==200){
					this.userInfo=res.data.userInfo;
				}
			})
        },
        getAccountInfo(){
            this.axios({
				url:apiHost+'/changePwd',
				method:'get'
			}).then(res=>{
				if(res.data.code==200){
                    this.accountInfo.mail=res.data.mail;
                    this.accountInfo.id=res.data.user_id;
				}
			})
        },
        uploadIcon(){
            iconInput.click();
            let _this=this;
            iconInput.addEventListener('change',function(){
                if(this.files[0]!=undefined){
                    let data=new FormData();
                    let file=this.files[0];
                    data.append('type','cover');
                    data.append('file',file);
                    if(file>( 2 * 1024 * 1024)){
						alert("图片大小不要超过2M");
                        return;
					}
                    _this.axios({
                        url:imgHost+"/img/upload",
                        method:'post',
                        data:data
                    }).then(res=>{
                        if(res.data.code==200){
                            _this.userInfo.icon=res.data.path;
                            localStorage['userIcon']=res.data.path;
                        }
                    })
                }
                this.value="";
            })
        },
        submit(){
            this.axios({
                url:apiHost+'/userInfo/updateBaseInfo',
                method:'post',
                data:{
                    'nick_name':this.userInfo.nick_name,
                    'birth':this.userInfo.birth,
                    'icon':this.userInfo.icon,
                    'sex':this.userInfo.sex,
                    'motto':this.userInfo.motto
                    }
            }).then(res=>{
                if(res.data.code==200){
                    this.$notify({
                        title: '修改成功',
                        type:'success'
                    });
                    //this.$router.go(-1);
                }
            })
        },
        submit2(){
            if(this.rPw==this.accountInfo.newPw){
                this.axios({
                    url:apiHost+"/changePwd?oldPwd="+md5(this.accountInfo.password)+"&newPwd="+md5(this.accountInfo.newPw),
                    method:'post'
                }).then(res=>{
                    if(res.data.code==200){
                        this.$router.go(-1);
                        this.$notify({
                            title:'修改成功',
                            type:'success'
                        })
                    }
                })
            }
        }
    },
    watch:{
    }
}
</script>
<style>

</style>
