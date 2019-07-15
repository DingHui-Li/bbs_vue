<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col :xl="14" :lg='16' :md='20' :xs='24' style="padding:5px" id="contentCard">
            <el-image id="cover" style="width:100%;height:300px;border-radius:5px" :src="geturl(postData.image)" fit="cover" class="animated fadeInDown" v-if="postData.image!=undefined">
                <div slot="error" class="image-slot" align="center">
                    <i class="el-icon-picture-outline" style="font-size:100px"></i>
                </div>
                <div slot="placeholder" class="image-slot">
                    <i class="el-icon-loading"></i>
                </div>
            </el-image>
            <el-col style="padding:0;margin-bottom:5px">
                <el-col style="padding:0;" :xs="24" :sm="12" :md="10" >
                    <el-card style="border-radius:5px;padding:10px;box-shadow:none"  class="animated fadeInDown">
                        <div slot="header" style="font-weight:bold;color:#757575;">作者</div>
                        <div style="width:60px;float:left;" @click="$router.push(`/person/${userData.user_id}`)">
                            <el-image  :src="geturl(userData.icon)" style="border-radius:50%;width:60px;height:60px" fit="cover" v-if="userData.icon!=undefined"></el-image>
                        </div>
                        <div style="margin-left:80px;cursor:pointer" @click="$router.push(`/person/${userData.user_id}`)">
                            <div style="font-weight:bold;margin-top:5px">{{userData.nick_name}}</div>
                            <div style="color:#757575;margin-top:5px">{{userData.motto}}</div>
                        </div>
                        <el-col style="clear:both">
                            <el-divider style="margin:0"></el-divider>
                        </el-col>
                        <el-col >
                            <table style="font-weight:bold"  id="infoTable2Content">
								<tr style="color:#757575;">
									<td>关注</td>
									<td>粉丝</td>
									<td>获赞</td>
								</tr>
                                <tr>
                                    <td>{{userData.follow_num}}</td>
                                    <td>{{userData.fans_num}}</td>
                                    <td>{{userData.like_num}}</td>
                                </tr>
                            </table>
                        </el-col>
                    </el-card>
                </el-col>
                <el-col style="padding:0 0 0 10px;" :xs="24" :sm="12" :md="14">
                    <el-card style="border-radius:5px;padding:10px;box-shadow:none"  class="animated fadeInDown">
                        <div slot="header" style="font-weight:bold;color:#757575;">该用户的其他文章</div>
                        <el-col style="padding-top:15px 0 0 0;cursor:pointer" :lg="12" :xs="24" v-for="post in userPostData" :key="'more'+post.id">
                            <div style="margin-top:10px;width:60px;float:left" >
                                <el-avatar :src="geturl(post.image)" :size="60" shape="square"></el-avatar>
                            </div>
                            <div style="margin-left:70px;color:#757575;margin-top:20px;font-weight:bold;">
                                <div style="margin-top:10px; white-space: nowrap;text-overflow: ellipsis;overflow:hidden;"
                                    @click="$router.push(`/content/${post.id}`)">
                                    {{post.title}}
                                </div>
                                <i class="fa fa-heart-o" aria-hidden="true" style="font-size:0.8rem;font-weight:bold;"> {{post.like_num}}</i>
                                <i class="fa fa-eye" aria-hidden="true" style="font-size:0.8rem;margin-left:20px;font-weight:bold;"> {{post.view_num}}</i>
                            </div>
                        </el-col>
                        <el-col align="center" 
                            style="border-top:1px solid #e0e0e0;padding:10px;margin-top:10px;font-weight:bold;color:#757575;cursor:pointer">
                            <span @click="$router.push(`/person/${userData.user_id}`)"> 查看更多</span>
                        </el-col>
                    </el-card>
                </el-col>
            </el-col>
            <el-card style="box-shadow:none;animation-duration:1s"  class="animated fadeIn">
                <div slot="header" style="color:#757575;font-weight:bold;cursor:pointer;padding-left:10px" v-if="allData.plateInfo!=undefined">
                    <span>{{allData.plateInfo.plate_name}}</span>
                    <span style="margin:0 5px">/</span>
                    <span>{{allData.disInfo.district_name}}</span>
                </div>
                <el-col style="margin-top:20px">
                    <div style="font-size:1.4rem;margin-bottom:20px">{{postData.title}}</div>
                    <div style="color:#757575;font-size:0.8rem;margin-bottom:20px" align="right">编辑于 {{dateFormat(postData.post_time)}}</div>
                    <!-- <div style="color:#757575">
                        任我行说的就是真的啦？你们媒体千万要注意啊，不要“见着风，是得雨”啊。接到这些消息，你媒体本身也要判断，明白意思吗？假使这些完全……无中生有的东西，你再帮他说一遍，你等于，你也等于，你也有责任吧？
                        你…刚才你问我啊，我可以回答你一句“无可奉告”，那你们又不高兴，那怎么办？
                        我讲的意思不是我是说他不写作业。你问我他写没写，他是写了的。我就明确地给你告诉这一点。
                        我觉得你们啊，我感觉你们新闻界还要学习一个，你们非常熟悉西方的这一套 value。你们毕竟还 too young，明白这意思吧。我告诉你们我是身经百战了，见得多了！啊，西方的哪一个国家我没去过？媒体他们——你们要知道，美国的华莱士，那比你们不知道高到哪里去了。啊，我跟他谈笑风生！所以说媒体啊，要……还是要提高自己的知识水平！懂我的意思——识得唔识得啊？懂不懂啊？
                        唉，我也给你们着急啊，真的。
                        我很抱歉，我今天是作为一个长者给你们讲的。我不是新闻工作者，但是我见得太多了，我有这个必要告诉你们一点，人生的经验。
                        我刚才呢……我刚才我很想啊，就是我每一次碰到你们我就讲中国有一句话叫“闷声大发财”，我就什么话也不说。这是最好的！但是我想，我见到你们这样热情啊，一句话不说也不好。所以你刚才你一定要——在宣传上将来如果你们报道上有偏差，你们要负责的。我没有说要他不写作业，没有任何这个意思。但是你问，你一定要非得要问我，李嘉伟写没写作业？他现在是唯一一个ui设计师，设计师怎么能不写作业？
                        对不对？
                        欸，写作业也要按照项目进度表啊，对不对？要按照项目的！当然产品经理的要求也是很重要的。ui设计师，设计师是属于产品经理手下的啊。
                        啊？到那个时候我们会表态的！
                        明白这意思吧？
                        你们啊，不要想喜欢弄个大新闻，说现在他不写作业，再把我批判一番。
                        你们啊，naïve!
                        I'm angry! 我跟你讲啊，你们这样子啊，是不行的！
                        我今天算是得罪了你们一下！
                    </div> -->
                    <div style="color:#757575" id="content" v-html="postData.content"></div>
                </el-col>
                <el-col>
                    <el-divider></el-divider>
                    <el-col style="padding:0;" align="right" id="likeArea">
                        <table style="font-weight:bold;cursor:pointer"  id="infoTable2Content" >
                            <tr>
                                <td style="color:#FF5252">
                                    <i class="fa fa-heart" style="color:red" aria-hidden="true" v-if="postData.liked" @click='like()'> {{postData.like_num}}</i>
                                    <i class="fa fa-heart-o" aria-hidden="true" v-else @click='like()'> {{postData.like_num}}</i>
                                </td>
                                <td style="color:#2196F3">
                                    <i class="fa fa-commenting-o" aria-hidden="true"> {{postData.reply_num}}</i>
                                </td>
                                <td style="color:#FF9800">
                                    <i class="fa fa-star" aria-hidden="true" v-if="postData.collected" @click="mark"></i>
                                    <i class="fa fa-star-o" aria-hidden="true" v-else @click="mark"></i>
                                    <span> {{postData.recommend_num}}</span>
                                </td>
                                <td style="color:#8BC34A">
                                    <i class="fa fa-eye" aria-hidden="true"> {{postData.view_num}}</i>
                                </td>
                            </tr>
                        </table>
                    </el-col>
                </el-col>
            </el-card>
            <el-col style="padding:0" class="animated fadeIn">
                <div style="font-size:1.4rem;font-weight:bold;color:#757575;border-left:5px solid #2196F3;padding-left:10px;margin:20px 0">文章评论</div>
                <comment :target="id" style="margin-bottom:20px" @updateComment="getComment" />
                <comments v-for="comment in commentData" :key="'comment'+comment.id" :data="comment"/>
            </el-col>
        </el-col>
        <fab />
    </el-row>
</template>
<script>
import comments from '../components/comments'
import comment from '../components/comment'
import { apiHost,imgHost } from '../../../../apiConfig';
import fab from '../components/fab'
export default {
    components:{comment,comments,fab},
    data(){
        return{
            id:this.$route.params.id,//帖子id
            postData:{},
            userData:{},
            userPostData:[],
            commentData:[],
            allData:[]
        }
    },
    mounted(){
        this.getContent();
        this.getComment();
        this.toTop();
    },
    computed:{
    },
    methods:{
        toTop(){
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(this.toTop);
                window.scrollTo (0,currentScroll - (currentScroll/5));
            }
        },
        geturl(url){
            return imgHost+url;
        },
        getContent(){
            this.axios({
                url:apiHost+'/anon/post/getPostTitleContent?id='+this.id,
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                    this.allData=[];
                    this.allData=res.data;
                    console.log(this.allData.plateInfo)
                    this.postData=res.data.Content;
                    this.userData=res.data.UserInfo;
                    this.userPostData=res.data.CurrentPostTitle;
                }
                console.log(res)
            })
        },
        dateFormat(date){
			let d=new Date(date);
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        },
        getComment(){
            this.axios({
                url:apiHost+'/anon/replyInfo/viewReplyInfo?post_title_id='+this.id,
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                    this.commentData=res.data.ReplyInfos;
                }
            })
        },
        like(){
            const loading = this.$loading({
                lock: true,
                target:contentCard,
                text: 'loading...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios({
                url:apiHost+'/anon/post/like?post_title_id='+this.postData.id,
                method:'get'
            }).then(res=>{
                loading.close();
                if(res.data.code==200){
                    if(this.postData.liked){
                        this.postData.like_num-=1;
                        this.postData.liked=false;
                    }else{
                        this.postData.like_num+=1;
                        this.postData.liked=true;
                    }
                }
            })
        },
        mark(){
            const loading = this.$loading({
                lock: true,
                target:contentCard,
                text: '操作中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios({
                url:apiHost+'/anon/post/collect?post_title_id='+this.postData.id,
                method:'get'
            }).then(res=>{
                loading.close();
                console.log(res)
                if(res.data.code==200){
                    if(this.postData.collected){
                        this.postData.recommend_num-=1;
                        this.postData.collected=false;
                    }else{
                        this.postData.recommend_num+=1;
                        this.postData.collected=true;
                    }
                }
            })
        },
    },
    watch:{
        $route:function(newVal,oldVal){
            this.id=newVal.params.id;
            this.getContent();
        },
    }
}
</script>
<style>
    #infoTable2Content td {
		padding:0 30px 10px 0;
	}
    #contentCard #content img{
        max-width:500px;
    }
</style>