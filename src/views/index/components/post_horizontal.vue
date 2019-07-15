<template>
    <el-card class="post_horizontal animated fadeInUp" :id="'post_horizontal'+data.post_title_id" :body-style="{padding:'0px'}" 
            style="border-radius:10px;margin:10px 0;cursor:pointer;animation-duration:.5s">
        <el-image :src="geturl(data.image)"
            style="width:150px;height:150px;float:left" fit="cover" @click="postClick">
            <div slot="error" class="image-slot" align="center" style="margin-top:20px">
                <i class="el-icon-picture-outline" ></i>
            </div>
            <div slot="placeholder" class="image-slot">
                <li class="el-icon-loading"></li>
            </div>
        </el-image>
        <!-- <div style="float:right;padding-right:20px;margin-top:10px" v-if='isme'>
            <i class="fa fa-trash" aria-hidden="true" @click="deleteMark()"></i>
        </div> -->
        <div style="padding-top:50px;padding-left:150px">
            <div class="title" @click="postClick">{{data.title}}</div>
            <div style="float:left;margin-left:5px">
                <el-image :src="geturl(data.icon)" style="width:30px;height:30px;border-radius:50%" @click="$router.push(`/person/${data.user_id}`)" v-if="type=='mark'"></el-image>
                <el-image :src="geturl(data.icon)" style="width:30px;height:30px;border-radius:50%" @click="$router.push(`/person/${data.owner}`)" v-else></el-image>
            </div>
            <div style="padding-left:5px;float:left;line-height:30px;font-weight:bold;color:#757575" @click="$router.push(`/person/${data.user_id}`)" v-if="type=='mark'">{{data.nick_name}}</div>
            <div style="padding-left:5px;float:left;line-height:30px;font-weight:bold;color:#757575" @click="$router.push(`/person/${data.owner}`)" v-else>{{data.nick_name}}</div>
            <div>
                <table style="font-weight:bold"  id="infoTable2Content" align="right">
                    <tr>
                        <td style="color:#FF5252">
                            <i class="fa fa-heart" aria-hidden="true" v-if="data.liked" @click='like()'></i>
                            <i class="fa fa-heart-o" aria-hidden="true" v-else @click='like()'></i>
                            <span> {{data.like_num}}</span>
                        </td>
                        <td style="color:#2196F3">
                            <i class="fa fa-commenting" aria-hidden="true" > {{data.reply_num}}</i>
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
        </div>
        
    </el-card>
</template>
<script>
import { apiHost,imgHost } from '../../../../apiConfig';
export default {
    name:'post_horizontal',
    props:['data','isme','type'],
    methods:{
        postClick(id){
            if(this.type=="mark")
                this.$router.push(`/content/${this.data.post_title_id}`);
            else
                this.$router.push(`/content/${this.data.id}`);
        },
        geturl(url){
            return imgHost+url;
        },
        mark(){
            const loading = this.$loading({
                lock: true,
                target:document.getElementById('post_horizontal'+this.data.post_title_id),
                text: '操作中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let id=-1;
            if(this.type=="mark") id=this.data.post_title_id;
            else id=this.data.id;
            this.axios({
                url:apiHost+'/anon/post/collect?post_title_id='+id,
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
        like(){
            const loading = this.$loading({
                lock: true,
                target:document.getElementById('markPost'+this.data.post_title_id),
                text: 'loading...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            if(this.type=="mark") id=this.data.post_title_id;
            else id=this.data.id;
            this.axios({
                url:apiHost+'/anon/post/like?post_title_id='+id,
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
    .post_horizontal .title{
        padding:10px;
        border-bottom:1px solid #ccc;
        margin-bottom:10px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
</style>
