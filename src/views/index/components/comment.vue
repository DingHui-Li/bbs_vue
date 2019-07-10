<template>
    <!-- 发表评论的组件 -->
    <el-card style="padding:10px;box-shadow:none" id="comment">
        <el-input type="textarea"  :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入内容" v-model="msgTxt"></el-input>
        <div align="right" style="margin-top:20px">
            <el-button type="primary" @click="submit()">发表</el-button>
        </div>
    </el-card>
</template>
<script>
import wangeditor from 'wangeditor'
import { apiHost } from '../../../../apiConfig';
export default {
    props:['target'],
    data(){
        return{
            msgTxt:"",
            editor:null,
            islogin:false,
            userid:-1
        }
    },
    mounted(){
        this.checkSession();
    },
    methods:{
        submit(){
            if(this.islogin){
                if(this.msgTxt.trim().length==0){
                    this.$message.error('不能为空')
                    return;
                }
                const loading = this.$loading({
                    lock: true,
                    target:comment,
                    text: '回复中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.axios({
                    url:apiHost+"/replyInfo/addReplyInfo",
                    method:'post',
                    data:{'post_title_id':this.target,'user_id':this.userid,'content':this.msgTxt}
                }).then(res=>{
                    if(res.data.code==200){
                        this.$notify({
                            title:'成功',
                            type:'success'
                        });
                        this.msgTxt="";
                    }else{
                        this.$notify.error({
                            title:'失败'
                        })
                    }
                    loading.close();
                })
            }else{
                this.$message.error('未登录')
            }
        },
        checkSession(){
            this.axios({
                url:apiHost+'/checkSession',
                method:'post',
            }).then(res=>{
                if(res.data.code==200) {
                    this.islogin=true;
                    this.userid=res.data.id;
                }
                else this.islogin=false;
            })
        }
    }
}
</script>
<style>

</style>
