<template>
    <el-col  :xl="6" :lg="8" :sm="12" :xs="24">
    <el-card :body-style="{padding:'0px'}" style="border-radius:10px;margin:10px 0;cursor:pointer;" :id="'post'+data.id">
        <!-- 封面 -->
        <el-image :src="geturl(data.image)"
            style="width:100%;height:auto;border-radius:10px 10px 0 0;" fit="cover" @click="postClick(data.id)">
            <div slot="error" class="image-slot" align="center" style="margin-top:20px">
                <i class="el-icon-picture-outline" ></i>
            </div>
            <div slot="placeholder" class="image-slot" align="center">
                <li class="el-icon-loading"></li>
            </div>
        </el-image>
        <!-- 标题 -->
        <div style="padding:10px;border-bottom:1px solid #ccc;margin-bottom:10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-weight:bold" @click="postClick(data.id)">{{data.title}}</div>
        <div style="padding:10px">
            <div style="float:left;width:30px;">
                <el-image style="width:30px;border-radius:50%;height:30px" :src='geturl(data.icon)' @click="$router.push(`/person/${data.owner}`)"></el-image>
            </div>
            <span @click="$router.push(`/person/${data.owner}`)" style="font-weight:bold;color:#757575;margin-top:5px;line-height:30px">{{data.nick_name}}</span>
            <table style="font-weight:bold;font-size:0.9rem"  id="infoTable2Home" align="right">
                    <tr>
                        <td style="color:#FF5252">
                            <i class="fa fa-heart" aria-hidden="true" v-if="data.liked" @click='like()'></i>
                            <i class="fa fa-heart-o" aria-hidden="true" v-else @click='like()'></i>
                            <span> {{data.like_num}}</span>
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
    </el-col>
</template>
<script>
import { apiHost,imgHost } from '../../../../apiConfig';
export default {
    name:'post',
    props:['data'],
    mounted(){
        
    },
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
                target:document.getElementById('post'+this.data.id),
                text: '操作中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios({
                url:apiHost+'/anon/post/collect?post_title_id='+this.data.id,
                method:'get'
            }).then(res=>{
                loading.close();
                // console.log(res)
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
    #infoTable2Home td {
		padding:0 5px;
	}
</style>
