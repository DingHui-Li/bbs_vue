<template>
    <el-card :body-style="{padding:'0px'}" style="border-radius:10px;margin:10px 0;cursor:pointer" :id="'post'+data.id">
        <el-image :src="geturl(data.image)"
            style="width:100%;height:auto;border-radius:10px 10px 0 0;" fit="cover" @click="postClick(data.id)">
            <div slot="error" class="image-slot" align="center" style="margin-top:20px">
                <i class="el-icon-picture-outline" ></i>
            </div>
            <div slot="placeholder" class="image-slot" align="center">
                <li class="el-icon-loading"></li>
            </div>
        </el-image>
        <div style="padding:10px;border-bottom:1px solid #ccc;margin-bottom:10px" @click="postClick(data.id)">{{data.title}}</div>
        <el-row type="flex" align="middle" style="padding:10px;overflow:hidden">
            <el-col :span="3" right >
                <el-image style="width:30px;border-radius:50%;height:30px" :src='geturl(data.icon)' @click="$router.push(`/person/${data.owner}`)"></el-image>
            </el-col>
            <el-col :span="10" left >
                <span @click="$router.push(`/person/${data.owner}`)">{{data.nick_name}}</span>
            </el-col>
            <el-col :span="5" left>
                <i class="fa fa-heart" style="color:red" aria-hidden="true" v-if="data.liked" @click='like()'></i>
                <i class="fa fa-heart-o" aria-hidden="true" v-else @click='like()'></i>
                <span style="margin-left:5px">{{data.like_num}}</span>
            </el-col>
            <el-col :span="5" left>
                <i class="fa fa-eye" aria-hidden="true"></i>
                <span style="margin-left:5px">{{data.view_num}}</span>
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
import { apiHost,imgHost } from '../../../../apiConfig';
export default {
    name:'post',
    props:['data'],
    methods:{
        postClick(id){
            this.$router.push(`/content/${id}`);
        },
        geturl(url){
            return imgHost+url;
        },
        like(){
            const loading = this.$loading({
                lock: true,
                target:document.getElementById('post'+this.data.id),
                text: 'loading...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios({
                url:apiHost+'/anon/post/like?post_title_id='+this.data.id,
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                    if(this.data.liked){
                        this.data.like_num-=1;
                        this.data.liked=false;
                    }else{
                        this.data.like_num+=1;
                        this.data.liked=true;
                    }
                }
                loading.close();
            })
        }
    },
}
</script>
<style>
    #postCard:hover{
        filter:brightness(0.9);
    }
</style>
