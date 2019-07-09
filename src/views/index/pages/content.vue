<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col :xl="12" :lg='16' :md='20' :xs='24' style="padding:5px">
            <el-image id="cover" style="width:100%;height:300px;border-radius:5px" src="http://pic1.win4000.com/wallpaper/c/57918d798786e.jpg" fit="cover">
                <div slot="error" class="image-slot" align="center">
                    <i class="el-icon-picture-outline" style="font-size:100px"></i>
                </div>
                <div slot="placeholder" class="image-slot">
                    <i class="el-icon-loading"></i>
                </div>
            </el-image>
            <el-col style="padding:0">
                <el-col style="padding:0;" :xs="24" :sm="12" :md="10" >
                    <el-card style="border-radius:5px;padding:10px">
                        <div slot="header" style="font-weight:bold;color:#757575;">作者</div>
                        <el-col :span="5" style="margin-top:10px">
                            <el-avatar src="http://pic1.win4000.com/wallpaper/c/57918d798786e.jpg" :size="60"></el-avatar>
                        </el-col>
                        <el-col :span="19" style="margin-top:10px;">
                            <div style="font-weight:bold;margin-top:5px">任我行</div>
                            <div style="color:#757575;margin-top:5px">我好想回家啊</div>
                        </el-col>
                        <el-col>
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
                                    <td>123123</td>
                                    <td>12</td>
                                    <td>12</td>
                                </tr>
                            </table>
                        </el-col>
                    </el-card>
                </el-col>
                <el-col style="padding:0 0 0 10px;" :xs="24" :sm="12" :md="14">
                    <el-card style="border-radius:5px;padding:10px">
                        <div slot="header" style="font-weight:bold;color:#757575;">该用户的其他文章</div>
                        <el-col style="padding-top:15px 0 0 0" :md="24" :xs="12" v-for="i in 2" :key="'more'+i">
                            <el-col :md="4" :xs="8" style="margin-top:10px">
                                <el-avatar src="http://pic1.win4000.com/wallpaper/c/57918d798786e.jpg" :size="60" shape="square"></el-avatar>
                            </el-col>
                            <el-col :md="20" :xs="16" style="margin-top:10px">
                                <div style="margin-top:10px; white-space: nowrap;text-overflow: ellipsis;overflow:hidden;font-weight:bold;color:#757575">
                                    李嘉伟为何又失踪了，他到底隐藏着什么秘密
                                </div>
                                <i class="fa fa-heart-o" aria-hidden="true" style="font-size:0.8rem"> 11K</i>
                            </el-col>
                        </el-col>
                        <el-col align="center" style="border-top:1px solid #e0e0e0;padding:10px;margin-top:10px;font-weight:bold;color:#757575">查看更多</el-col>
                    </el-card>
                </el-col>
            </el-col>
            <el-col style="margin-top:20px">
                <div style="font-size:1.4rem;margin-bottom:20px">震惊！李嘉伟不写作业到底在干嘛？ 看完不敢相信...</div>
                <div style="color:#757575;font-size:0.8rem;margin-bottom:20px" align="right">编辑于 2019-7-04 13：30</div>
                <div style="color:#757575">
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
                </div>
            </el-col>
            <el-col>
                <el-divider></el-divider>
                <el-col style="padding:0;" align="right">
                    <table style="font-weight:bold"  id="infoTable2Content" >
                        <tr>
                            <td style="color:#FF5252">
                                <i class="fa fa-heart" aria-hidden="true"> 3.3w</i>
                            </td>
                            <td style="color:#2196F3">
                                <i class="fa fa-commenting-o" aria-hidden="true"> 4</i>
                            </td>
                            <td style="color:#FF9800">
                                <i class="fa fa-star" aria-hidden="true">10k</i>
                            </td>
                        </tr>
                    </table>
                </el-col>
            </el-col>
            <el-col>
                <div style="font-size:1.4rem;font-weight:bold;color:#757575;border-left:5px solid #2196F3;padding-left:10px;margin-bottom:20px">文章评论</div>
                <comment  v-for="i in 4" :key="'comment'+i" />
            </el-col>
        </el-col>
    </el-row>
</template>
<script>
import comment from '../components/comment'
export default {
    components:{comment},
    data(){
        return{
            id:this.$route.params.id
        }
    },
    mounted(){
        
    }
}
</script>
<style>
    #infoTable2Content td {
		padding:0 30px 10px 0;
	}
</style>