<template>
    <el-card id="postCard" :body-style="{padding:'0px'}" style="border-radius:10px;margin:10px 0;cursor:pointer;box-shadow:none">
        <el-image :src="geturl(data.image)"
            style="width:150px;height:150px;float:left" fit="cover" @click="postClick(data.id)">
            <div slot="error" class="image-slot" align="center" style="margin-top:20px">
                <i class="el-icon-picture-outline" ></i>
            </div>
            <div slot="placeholder" class="image-slot">
                <li class="el-icon-loading"></li>
            </div>
        </el-image>
        <div style="float:right;padding-right:20px;margin-top:10px" v-if='isme'>
            <i class="fa fa-pencil" aria-hidden="true" style="margin-right:20px"></i>
            <i class="fa fa-trash" aria-hidden="true" @click="deletePost"></i>
        </div>
        <div style="padding-top:50px;padding-left:150px">
            <div style="padding:10px;border-bottom:1px solid #ccc;margin-bottom:10px" @click="postClick(data.id)">
                {{data.title}}
            </div>
            <table style="font-weight:bold"  id="infoTable2Content" align="right">
                <tr>
                    <td style="color:#FF5252">
                        <i class="fa fa-heart-o" aria-hidden="true"> {{data.like_num}}</i>
                    </td>
                    <td style="color:#2196F3">
                        <i class="fa fa-commenting-o" aria-hidden="true"> {{data.reply_num}}</i>
                    </td>
                    <td style="color:#FF9800">
                        <i class="fa fa-star-o" aria-hidden="true"> 0</i>
                    </td>
                    <td style="color:#8BC34A">
                        <i class="fa fa-eye" aria-hidden="true"> {{data.view_num}}</i>
                    </td>
                </tr>
            </table>
        </div>
        
    </el-card>
</template>
<script>
import { apiHost,imgHost } from '../../../../apiConfig';
export default {
    name:'ezpost',
    props:['data','isme'],
    methods:{
        postClick(id){
            this.$router.push(`/content/${id}`);
        },
        geturl(url){
            return imgHost+url;
        },
        deletePost(){
            this.$confirm('此操作无法撤销，确定删除吗？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    target:document.getElementById('postCard'),
                    text: '删除中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.axios({
                    url:apiHost+'/userInfo/deletePost?post_title_id='+this.data.id,
                    method:'post'
                }).then(res=>{
                    loading.close();
                    console.log(res)
                    if(res.data.code==200){
                        this.$emit('deletePost',this.data.id);
                        this.$message({
                            message:'删除成功',
                            type:'success'
                        })
                    }else{
                        this.$message.error("删除失败")
                    }
                })
            }).catch(() => {
            });
        },
        editPost(){
            
        }
    },
}
</script>
<style>
    #postCard:hover{
        filter:brightness(0.9);
    }
    #infoTable2Content td {
		padding:0 30px 10px 0;
	}
</style>
