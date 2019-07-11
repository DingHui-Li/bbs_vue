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
            <i class="fa fa-trash" aria-hidden="true" @click="deleteMark()"></i>
        </div>
        <div style="padding-top:50px;padding-left:150px">
            <div style="padding:10px;border-bottom:1px solid #ccc;margin-bottom:10px" @click="postClick(data.post_title_id)">{{data.title}}</div>
            <div style="float:left;margin-left:5px">
                <el-image :src="geturl(data.icon)" style="width:30px;height:30px" @click="$router.push(`/person/${data.user_id}`)"></el-image>
            </div>
            <div style="padding-top:7px;float:left" @click="$router.push(`/person/${data.user_id}`)">{{data.nick_name}}</div>
            <div>
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
        </div>
        
    </el-card>
</template>
<script>
import { apiHost,imgHost } from '../../../../apiConfig';
export default {
    name:'markPost',
    props:['data','isme'],
    methods:{
        postClick(id){
            this.$router.replace(`/content/${id}`);
        },
        geturl(url){
            return imgHost+url;
        },
        deleteMark(){
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
                    this.$emit('deleteMark',this.data.id);
                    this.$message({
                        message:'删除成功',
                        type:'success'
                    })
                }else{
                    this.$message.error("删除失败")
                }
            })
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
