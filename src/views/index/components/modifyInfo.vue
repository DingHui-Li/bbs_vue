<template>
    <el-card class="animated flipInY" style="animation-duration:0.5s">
        <div slot="header">
            <i class="fa fa-chevron-left" aria-hidden="true" @click="back()"></i>
        </div>
        <el-tabs tab-position="left">
            <el-tab-pane label="修改个人资料">
                <div style="float:left;width:200px">
                    <el-image src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png" 
                        style="width:200px;height:200px;border-radius:50%"></el-image>
                </div>
                <div style="float:left;">
                    <el-form label-position="right" label-width="150px">
                        <el-form-item label="昵称：">
                        <el-input ></el-input>
                        </el-form-item>
                        
                        <el-form-item label="生日：">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期"  style="width: 100%;"></el-date-picker>
                        </el-col>
                        </el-form-item>
                        
                        <el-form-item label="性别：">
                        <el-radio-group >
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                        </el-form-item>
                        <el-form-item label="我的签名：">
                        <el-input type="textarea" ></el-input>
                        </el-form-item>
                        <el-form-item>
                        <el-button type="primary">确认修改</el-button>
                        <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="修改账号信息">
                <el-form label-position="right" label-width="100px">
                    <el-form-item label="账号">
                        <el-input disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="旧密码">
                        <el-input v-model="accountInfo.pw"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="accountInfo.newPw"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="accountInfo.rPw"></el-input>
                    </el-form-item>
                </el-form>
                <div align="center">
                    <el-button type="primary">提交</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
export default {
    name:'modifyInfo',
    data(){
        return{
            accountInfo:{
                pw:'',
                newPw:'',
                rPw:'',
            }
        }
    },
    methods:{
        back(){
            this.$emit('back');
        }
    }
}
</script>
<style>

</style>
