<template>
    <el-row type="flex" justify="center" align="middle" :gutter="20" class="animated fadeIn">
        <el-col :xl="16" :lg='18' :md='20' :xs='24' style="padding:0;margin-top:30px;cursor:pointer" align="center" v-if="postData[0]!=undefined">
            <el-col :xs="24" :sm="8" class="animated fadeInDown">
                <div>
                    <i style="font-size:1.8rem;font-weight:bold">2nd</i>
                </div>
                <div style="width:250px;height:250px;" class="top3">
                    <el-image style="width:250px;height:150px;border-radius:5px 5px 0 0" 
                        :src="geturl(postData[1].postTitle.image)" fit="cover" @click="goPost(1)">
                    </el-image>
                    <div class="title" align="center" @click="goPost(1)">{{postData[1].postTitle.title}}</div>
                    <div class="info" style="line-height:50px">
                        <i class="fa fa-heart" aria-hidden="true" style="color:#FF5252" @click='like(1)' v-if="postData[1].postTitle.liked"> {{postData[1].postTitle.like_num}}</i>
                        <i class="fa fa-heart-o" aria-hidden="true" style="color:#FF5252" @click='like(1)' v-else> {{postData[1].postTitle.like_num}}</i>
                        <i class="fa fa-commenting" aria-hidden="true" style="margin:0 20px;color:#2196F3"> {{postData[1].postTitle.reply_num}}</i>
                        <i class="fa fa-star" aria-hidden="true" style="margin-right:20px;color:#FF9800"  v-if="postData[1].postTitle.collected" @click="mark(1)"> {{postData[1].postTitle.recommend_num}}</i>
                        <i class="fa fa-star-o" aria-hidden="true" style="margin-right:20px;color:#FF9800" v-else  @click="mark(1)"> {{postData[1].postTitle.recommend_num}}</i>
                        <i class="fa fa-eye" aria-hidden="true" style="color:#8BC34A;"> {{postData[1].postTitle.view_num}}</i>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" class="animated fadeInDown">
                <div>
                    <i style="font-size:2.5rem;font-weight:bold">1st</i>
                </div>
                <div style="width:300px;height:300px;margin:0 20px"  class="top3">
                    <el-image style="width:100%;height:200px;border-radius:5px 5px 0 0;" 
                    :src="geturl(postData[0].postTitle.image)" fit="cover" @click="goPost(0)">
                    </el-image>
                    <div style="margin-top:30px;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" 
                        align="center" @click="goPost(0)"> 
                        {{postData[0].postTitle.title}}
                    </div>
                    <div class="info">
                        <i class="fa fa-heart" aria-hidden="true" style="color:#FF5252" @click='like(0)' v-if="postData[0].postTitle.liked"> {{postData[0].postTitle.like_num}}</i>
                        <i class="fa fa-heart-o" aria-hidden="true" style="color:#FF5252" @click='like(0)' v-else> {{postData[0].postTitle.like_num}}</i>
                        <i class="fa fa-commenting" aria-hidden="true" style="margin:0 20px;color:#2196F3"> {{postData[0].postTitle.reply_num}}</i>
                        <i class="fa fa-star" aria-hidden="true" style="margin-right:20px;color:#FF9800"  v-if="postData[0].postTitle.collected" @click="mark(0)"> {{postData[0].postTitle.recommend_num}}</i>
                        <i class="fa fa-star-o" aria-hidden="true" style="margin-right:20px;color:#FF9800" v-else  @click="mark(0)"> {{postData[0].postTitle.recommend_num}}</i>
                        <i class="fa fa-eye" aria-hidden="true" style="color:#8BC34A;"> {{postData[0].postTitle.view_num}}</i>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" class="animated fadeInDown">
                <div>
                    <i style="font-size:1.8rem;font-weight:bold">3rd</i>
                </div>
                <div style="width:250px;height:250px;" class="top3">
                    <el-image style="width:250px;height:150px;border-radius:5px 5px 0 0" 
                        :src="geturl(postData[2].postTitle.image)" fit="cover" @click="goPost(2)">
                    </el-image>
                    <div class="title" align="center" @click="goPost(2)">{{postData[2].postTitle.title}}</div>
                    <div class="info" style="line-height:50px">
                        <i class="fa fa-heart" aria-hidden="true" style="color:#FF5252" @click='like(2)' v-if="postData[2].postTitle.liked"> {{postData[2].postTitle.like_num}}</i>
                        <i class="fa fa-heart-o" aria-hidden="true" style="color:#FF5252" @click='like(2)' v-else> {{postData[2].postTitle.like_num}}</i>
                        <i class="fa fa-commenting" aria-hidden="true" style="margin:0 20px;color:#2196F3"> {{postData[2].postTitle.reply_num}}</i>
                        <i class="fa fa-star" aria-hidden="true" style="margin-right:20px;color:#FF9800"  v-if="postData[2].postTitle.collected" @click="mark(2)"> {{postData[2].postTitle.recommend_num}}</i>
                        <i class="fa fa-star-o" aria-hidden="true" style="margin-right:20px;color:#FF9800" v-else  @click="mark(2)"> {{postData[1].postTitle.recommend_num}}</i>
                        <i class="fa fa-eye" aria-hidden="true" style="color:#8BC34A;"> {{postData[2].postTitle.view_num}}</i>
                    </div>
                </div>
            </el-col>
            <el-col id="divider">
                <el-divider></el-divider>
            </el-col>
            <el-col align="left" class="topItem animated fadeInUp" style="animation-duration:.5s" v-for="(post,index) in postData" :key="'top'+index">
                <template v-if="index>2" style="padding:0">
                    <div style="float:left;width:150px;height:150px;margin:0" @click="goPost(index)">
                        <el-image :src="geturl(post.postTitle.image)" 
                                style="border-radius:5px 0 0 5px;width:100%;height:100%" fit="cover">
                        </el-image>
                        <div style="width:100%;height:100%;border-radius:5px 0 0 5px;
                                position:relative;background-color:rgba(0,0,0,0.3);margin-top:-155px;line-height:150px" align="center">
                            <span style="font-size:2.5rem;font-weight:bold;color:#fff"> {{index+1}}</span>
                        </div>
                    </div>
                    <div style="margin-left:180px;margin-top:30px;">
                        <el-col :span="20" style="padding:0">
                            <div style="font-size:1.1rem;font-weight:bold;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" @click="goPost(index)">
                                {{post.postTitle.title}}
                            </div>
                            <div style="font-size:0.8rem;color:#757575;margin:10px 0">{{dateFormat(post.postTitle.post_time)}}</div>
                            <table style="font-weight:bold;cursor:pointer"  id="infoTable2Select" >
                                <tr>
                                    <td style="color:#FF5252">
                                        <i class="fa fa-heart" style="color:red" aria-hidden="true" v-if="post.postTitle.liked" @click='like(index)'></i>
                                        <i class="fa fa-heart-o" aria-hidden="true" v-else @click='like(index)'></i>
                                        <span> {{post.postTitle.like_num}}</span>
                                    </td>
                                    <td style="color:#2196F3">
                                        <i class="fa fa-commenting-o" aria-hidden="true"> {{post.postTitle.reply_num}}</i>
                                    </td>
                                    <td style="color:#FF9800">
                                        <i class="fa fa-star" aria-hidden="true" v-if="post.postTitle.collected" @click="mark(index)"></i>
                                        <i class="fa fa-star-o" aria-hidden="true" v-else @click="mark(index)"></i>
                                        <span> {{post.postTitle.recommend_num}}</span>
                                    </td>
                                    <td style="color:#8BC34A">
                                        <i class="fa fa-eye" aria-hidden="true"> {{post.postTitle.view_num}}</i>
                                    </td>
                                    <td style="padding:0" @click="$router.push(`/person/${post.postTitle.owner}`)">
                                        <el-image :src="geturl(post.postTitle.icon)" 
                                                style="border-radius:50%;width:30px;height:30px" fit="cover">
                                        </el-image>
                                    </td>
                                    <td style="padding-top:5px;color:#757575" @click="$router.push(`/person/${post.postTitle.owner}`)">
                                        {{post.postTitle.nick_name}}
                                    </td>
                                </tr>
                            </table>
                        </el-col>
                        <el-col :span="4">
                            <div style="font-weight:bold;font-size:1.2rem;margin-top:30px">{{post.diff}}</div>
                            综合评分
                        </el-col>
                    </div>
                </template>
            </el-col>
            <fab />
        </el-col>
    </el-row>
</template>
<script>
import post from "../components/post"
import { apiHost, imgHost } from '../../../../apiConfig';
import fab from '../components/fab'
export default {
    components:{post,fab},
    data(){
        return{
            postData:[]
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        dateFormat(date){
			let d=new Date(date);
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        },
        geturl(url){
            return imgHost+url;
        },
        getData(){
            this.axios({
                url:apiHost+'/anon/post/getGreatPostTitles',
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                    this.postData=[];
                    this.postData=res.data.postInfos;
                }
            })
        },
        goPost(index){
            this.$router.push(`/content/${this.postData[index].postTitle.id}`);
        },
        like(index){
            this.axios({
                url:apiHost+'/anon/post/like?post_title_id='+this.postData[index].postTitle.id,
                method:'get'
            }).then(res=>{ 
                if(res.data.code==200){
                    if(this.postData[index].postTitle.liked){
                        this.postData[index].postTitle.like_num-=1;
                        this.postData[index].postTitle.liked=false;
                    }else{
                        this.postData[index].postTitle.like_num+=1;
                        this.postData[index].postTitle.liked=true;
                    }
                }
            })
        },
        mark(index){
            // const loading = this.$loading({
            //     lock: true,
            //     target:document.getElementById('post'+this.postData[index].postTitle.id),
            //     text: '操作中...',
            //     spinner: 'el-icon-loading',
            //     background: 'rgba(0, 0, 0, 0.7)'
            // });
            this.axios({
                url:apiHost+'/anon/post/collect?post_title_id='+this.postData[index].postTitle.id,
                method:'get'
            }).then(res=>{
                // loading.close();
                if(res.data.code==200){
                    if(this.postData[index].postTitle.collected){
                        this.postData[index].postTitle.recommend_num-=1;
                        this.postData[index].postTitle.collected=false;
                    }else{
                        this.postData[index].postTitle.recommend_num+=1;
                        this.postData[index].postTitle.collected=true;
                    }
                }
            })
        },
    }
}
</script>
<style>
    #divider .el-divider{
        background-color:#ccc
    }
    #infoTable2Select td {
		padding:0 30px 10px 0;
	}
    .top3{
        background-color:#fff;
        display:inline-block;
        border-radius:5px;
    }
    .top3 .title{
        margin-top:3px;
        padding:5px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    .top3 .info{
        clear:both;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    .topItem{
        background-color:#fff;
        padding:0;
        border-radius:5px;
        margin-bottom:20px;
        padding:0 !important;
    }
</style>
