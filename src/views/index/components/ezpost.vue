<template>
    <!-- 个人中心页的帖子组件 -->
    <el-card :id="'ezpost'+data.id" :body-style="{padding:'0px'}" style="border-radius:10px;margin:10px 0;cursor:pointer;box-shadow:none">
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
            <i class="fa fa-pencil" aria-hidden="true" style="margin-right:20px" @click="editPost()"></i>
            <i class="fa fa-trash" aria-hidden="true" @click="deletePost"></i>
        </div>
        <div style="padding-top:50px;padding-left:150px">
            <div style="padding:10px;border-bottom:1px solid #ccc;margin-bottom:10px" @click="postClick(data.id)">
                {{data.title}}
            </div>
            <table style="font-weight:bold"  id="infoTable2Content" align="right">
                <tr>
                    <td style="color:#FF5252">
                        <i class="fa fa-heart" aria-hidden="true" v-if="data.liked" @click='like()'></i>
                        <i class="fa fa-heart-o" aria-hidden="true" v-else @click='like()'></i>
                        <span>{{data.like_num}}</span>
                    </td>
                    <td style="color:#2196F3">
                        <i class="fa fa-commenting-o" aria-hidden="true"> {{data.reply_num}}</i>
                    </td>
                    <td style="color:#FF9800">
                        <i class="fa fa-star" aria-hidden="true" v-if="data.collected" @click="mark"></i>
                        <i class="fa fa-star-o" aria-hidden="true" v-else @click="mark"></i>
                        <span> {{data.recommend_num}}</span>
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
            console.log(this.data.id)
            this.$router.push(`/publish/${this.data.id}`);
        },
        like(){
            const loading = this.$loading({
                lock: true,
                target:document.getElementById('ezpost'+this.data.id),
                text: 'loading...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios({
                url:apiHost+'/anon/post/like?post_title_id='+this.data.id,
                method:'get'
            }).then(res=>{ 
                loading.close();
                if(res.data.code==200){
                    if(this.data.liked){
                        this.data.like_num-=1;
                        this.data.liked=false;
                    }else{
                        this.data.like_num+=1;
                        this.data.liked=true;
                    }
                }
            })
        },
        mark(){
            const loading = this.$loading({
                lock: true,
                target:document.getElementById('ezpost'+this.data.id),
                text: '操作中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios({
                url:apiHost+'/anon/post/collect?post_title_id='+this.data.id,
                method:'get'
            }).then(res=>{
                loading.close();
                console.log(res)
                if(res.data.code==200){
                    if(this.data.collected){
                        this.data.recommend_num-=1;
                        this.data.collected=false;
                    }else{
                        this.data.recommend_num+=1;
                        this.data.collected=true;
                    }
                }
            })
        },
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
