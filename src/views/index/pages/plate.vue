<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col style="padding:0" id="plate">
            <el-container>
                <el-aside style="position:fixed;top:0">
                    <el-collapse  accordion style="padding:20px;padding-top:100px">
                        <el-collapse-item v-for="plate in plates" :key="'plate'+plate.id" :name="plate.plate_name">
                            <template slot="title">
                                    <div style="font-size:1.2rem;padding-left:10px;font-weight:bold;color:#fff;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" >{{plate.plate_name}}</div>
                                    <span style="margin-left:10px;font-weight:bold;color:#fff;"> ({{plate.districtInfos.length}}-{{plate.post_num}})</span>
                            </template>
                            <div v-for="dist in plate.districtInfos" :key="dist.name" style="background:none;color:#fff;margin-bottom:10px;cursor:pointer" 
                                @click="changeDist(dist.plate_id,dist.id,plate.plate_name,dist.name)"> 
                                <el-card style="color:#757575;">
                                    <div style="font-size:1.2rem;font-weight:bold"> {{dist.district_name}}</div>
                                    <div style="font-size:0.8rem">
                                        帖子: <span>{{dist.post_num}}</span>
                                    </div>
                                    <div style="font-size:0.8rem">
                                        最新帖子：<span>2019-7-11 12:2:32</span>
                                    </div>
                                </el-card>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-aside>
                <el-aside></el-aside>
                <el-main>
                    <el-card style="box-shadow:none;border:none;background-color:#e0e0e0;">
                        <div style="font-size:2.5rem;color:#757575" slot="header">
                            <div style="float:left;padding-right:20px;margin-right:20px;border-right:1px solid #ccc">
                                {{actDistrictName}}
                            </div>
                            <div>
                                <div style="font-size:0.9rem;line-height:40px">所属板块：{{actPlateName}}</div> 
                                <!-- <div style="float:left;font-size:0.9rem;line-height:30px;">分区管理员：</div>
                                <div style="width:25px;float:left;height:25px;line-height:25px">
                                    <el-image src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png" 
                                            style="width:25px;height:25px;border-radius:50%">
                                    </el-image>
                                </div>
                                <div style="font-size:0.9rem;line-height:30px;"> 
                                    <span style="padding-left:6px">ss</span>
                                </div> -->
                            </div> 
                        </div>
                        <div>
                            <el-card style="border-radius:20px;padding-bottom:10px;" v-if="totalNotice.userInfo!=undefined">
                                    <div>
                                        <div style="width:30px;float:left;margin-right:5px"  @click="$router.push(`/person/${totalNotice.userInfo.id}`)">
                                            <el-image :src='geturl(totalNotice.userInfo.icon)' style="width:30px;height:30px;border-radius:50%"></el-image>
                                        </div>
                                        <span @click="$router.push(`/person/${totalNotice.userInfo.id}`)" style="cursor:pointer;line-height:30px">{{totalNotice.userInfo.nick_name}}</span> 
                                        <span style="font-size:0.8rem;color:#757575;margin-left:20px;">{{dateFormat(totalNotice.topAnnouncement.post_time)}}</span>
                                    </div>
                                    <el-col>
                                        <span style="font-size:1.1rem;font-style:bold">{{totalNotice.topAnnouncement.title}}
                                            <span style="font-size:0.8rem;color:#757575">（全站公告）</span>
                                        </span>
                                    </el-col>
                                    <el-col>
                                        <span style="font-size:0.8rem">
                                            {{totalNotice.topAnnouncement.content}}
                                        </span>
                                    </el-col>
                            </el-card>
                            <el-card style="border-radius:20px;padding-bottom:10px;margin:5px 0;" v-if="plateNotice.userInfo!=undefined">
                                    <div>
                                        <div style="width:30px;float:left;margin-right:5px"  @click="$router.push(`/person/${plateNotice.userInfo.id}`)">
                                            <el-image :src='geturl(plateNotice.userInfo.icon)' style="width:30px;height:30px;border-radius:50%"></el-image>
                                        </div>
                                        <span @click="$router.push(`/person/${plateNotice.userInfo.id}`)" style="cursor:pointer;line-height:30px">{{plateNotice.userInfo.nick_name}}</span> 
                                        <span style="font-size:0.8rem;color:#757575;margin-left:20px;">{{dateFormat(plateNotice.topAnnouncement.post_time)}}</span>
                                    </div>
                                    <el-col>
                                        <span style="font-size:1.1rem;font-style:bold">{{plateNotice.topAnnouncement.title}}
                                            <span style="font-size:0.8rem;color:#757575">（{{plateNotice.plate_name}}板块公告）</span>
                                        </span>
                                    </el-col>
                                    <el-col>
                                        <span style="font-size:0.8rem">
                                            {{plateNotice.topAnnouncement.content}}
                                        </span>
                                    </el-col>
                            </el-card>
                            <el-card style="border-radius:20px;padding-bottom:10px;" v-if="districtNotice.userInfo!=undefined">
                                    <div>
                                        <div style="width:30px;float:left;margin-right:5px"  @click="$router.push(`/person/${districtNotice.userInfo.id}`)">
                                            <el-image :src='geturl(districtNotice.userInfo.icon)' style="width:30px;height:30px;border-radius:50%"></el-image>
                                        </div>
                                        <span @click="$router.push(`/person/${districtNotice.userInfo.id}`)" style="cursor:pointer;line-height:30px">{{districtNotice.userInfo.nick_name}}</span> 
                                        <span style="font-size:0.8rem;color:#757575;margin-left:20px;">{{dateFormat(districtNotice.topAnnouncement.post_time)}}</span>
                                    </div>
                                    <el-col>
                                        <span style="font-size:1.1rem;font-style:bold">{{districtNotice.topAnnouncement.title}}
                                            <span style="font-size:0.8rem;color:#757575">（{{districtNotice.district_name}}区公告）</span>
                                        </span>
                                    </el-col>
                                    <el-col>
                                        <span style="font-size:0.8rem">
                                            {{districtNotice.topAnnouncement.content}}
                                        </span>
                                    </el-col>
                            </el-card>
                        </div>
                        <el-tabs v-model="selectTab" style="margin-top:20px">
                            <el-tab-pane label="全部" name="all">
                                <el-col style="margin:20px 0" align="end">
                                    帖子排序：
                                    <el-radio-group v-model="sort" @change="sortChange()">
                                        <el-radio-button label="最新发布"></el-radio-button>
                                        <el-radio-button label="最新回复"></el-radio-button>
                                        <el-radio-button label="回复数"></el-radio-button>
                                        <el-radio-button label="浏览量"></el-radio-button>
                                    </el-radio-group>
                                </el-col>
                                <el-col style="padding:0" id="postContainer"  >
                                    <post v-for="post in posts" :key="'posts'+post.id+'-'+post.view_num" :data='post' 
                                        @postLoadComplete="postLoadComplete" className="posts" parent="postContainer" :length="posts.length"></post>
                                </el-col>
                                <el-col align="center" style="font-size:0.9rem;color:#757575;border-top:1px solid #ccc;padding:20px 0">{{msg}}</el-col>
                            </el-tab-pane>
                            <el-tab-pane label="精华" name="quality">
                                <post-horizontal v-for="post in qualityPost" :key="'qualitypost'+post.id" :data='post'></post-horizontal>
                                <!-- <el-col align='center'>
                                    <el-button @click="getQuality">加载更多</el-button>
                                </el-col>  -->
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-main>
            </el-container>
        </el-col>
        <fab />
    </el-row>
</template>
<script>
import { apiHost, imgHost } from '../../../../apiConfig';
import notice from '../components/notice'
import post from '../components/post'
import post_horizontal from '../components/post_horizontal'
import fab from '../components/fab'
export default {
    components:{notice,post,'post-horizontal':post_horizontal,fab},
    data(){
        return{
            selectTab:'all',//选中的选项卡
            plates:[],//分区数据
            actDistrict:-1,//当前分区id
            actDistrictName:'',//当前分区名
            actPlateName:'',//当前板块名
            totalNotice:[],
            plateNotice:[],
            districtNotice:[],
            sort:"最新发布",
            posts:[],
            qualityPost:[],
            postNum:0,
            pageNum:1,
            msg:'加载更多'
        }
    },
    mounted(){
        this.getPlate();
        this.getNotice(0,0);
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            window.addEventListener('scroll',vm.scrollListener)
        })
    },
    beforeRouteLeave (to, from, next) {
        window.removeEventListener('scroll',this.scrollListener);
        next();
    },
    methods:{
        scrollListener(){
            if(this.posts.length!=0){
                if(this.selectTab=='all'){
                    if(this.checkBottom()){
                        this.getDistPost();
                    }
                }
            }
        },
        getPlate(){
            this.axios({
                url:apiHost+"/anon/plate/getPlates",
                method:"get"
            }).then(res=>{
                if(res!=undefined){
                    this.plates=res.data;
                    this.getNotice(this.plates[0].id,0);
                    this.getNotice(0,this.plates[0].districtInfos[0].id);
                    this.actDistrict=this.plates[0].districtInfos[0].id;
                    this.pageNum=1;
                    this.getDistPost();
                    this.getQuality();
                    this.actDistrictName=this.plates[0].districtInfos[0].district_name;
                    this.actPlateName=this.plates[0].plate_name;
                }
                
            })
        },
        getDistPost(){
                this.msg="加载中...";
                this.axios({
                    url:apiHost+"/anon/post/getPostTitles?size=20&id="+this.actDistrict+"&orderby="+this.getSortType(this.sort)+'&page='+this.pageNum,
                    method:'get'
                }).then(res=>{
                    if(res.data.code==200){
                        this.pageNum++;
                        if(res.data.postInfos.length==0){
                            this.msg="你找到了我的底线";
                            return;
                        }
                        this.msg="下拉加载更多"
                        for(let i=0;i<res.data.postInfos.length;i++){
                            this.posts.push(res.data.postInfos[i])
                        }
                    }
                    else{
                        this.msg="加载失败"
                    }
            })    
        },
        getNotice(plate_id,district_id){
            this.axios({
                url:apiHost+'/anon/getRecentAnnouncement?plate_id='+plate_id+'&district_id='+district_id,
                method:'get'
            }).then(res=>{
                console.log(plate_id+","+district_id)
                if(res.data.code==200){
                    if(plate_id==0&&district_id==0){
                        this.totalNotice=res.data;
                    }
                    else if(plate_id!=0&&district_id==0){
                        this.plateNotice=res.data;
                    }else if(plate_id==0&&district_id!=0){
                        this.districtNotice=res.data;
                    }
                }
            })
        },
        changeDist(plate_id,district_id,plate_name,district_name){//分区改变-重新加载
            this.actDistrict=district_id;
            this.pageNum=1;
            this.qualityPageNum=1;
            this.posts=[];
            this.postNum=0;
            this.getDistPost();
            this.getQuality();
            this.getNotice(plate_id,0);
            this.getNotice(0,district_id);
            this.getPlateNameANDDistrictName();
            
        },
        geturl(url){
            return imgHost+url;
        },
        dateFormat(date){
			let d=new Date(date);
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        },
        sortChange(){//排列方式改变-重新加载
            this.pageNum=1;
            this.posts=[];
            this.postNum=0;
            this.getDistPost();
        },
        getSortType(label){
            if(label=='最新发布') return 'post_time';
            if(label=='最新回复') return 'reply_time';
            if(label=='回复数') return 'reply_num';
            if(label=='浏览量') return 'view_num';
        },
        getPlateNameANDDistrictName(){
            for(let i=0;i<this.plates.length;i++){
                for(let j=0;j<this.plates[i].districtInfos.length;j++){
                    if(this.plates[i].districtInfos[j].id==this.actDistrict){
                        this.actDistrictName=this.plates[i].districtInfos[j].district_name;
                        this.actPlateName=this.plates[i].plate_name;
                        return;
                    }
                }
            }
        },
        getQuality(){
            this.axios({
                url:apiHost+'/anon/post/getRecommendPostTitles?district_id='+this.actDistrict,
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                    this.qualityPost=res.data.recomdTitles;
                }
            })
        },
        postLoadComplete(className,length,parent){
            this.postNum++;
            if(this.postNum==length){//等待所有图片加载完成
                this.setPosition(parent,className)
            }
        },

        setPosition(container,item){
            let boxs=document.getElementsByClassName(item);
            if(boxs.length>0){
                let box=boxs[0];
                let window_width=document.getElementById(container).offsetWidth;
                let num=Math.round(window_width/box.offsetWidth);
                let boxHeight=[];
                for(let i =0;i<boxs.length;i++){
                    if(i<num){//第一行
                        boxHeight.push(boxs[i].offsetHeight+80);
                    }else{
                        boxs[i].style.position='absolute';
                        let minHeight=Math.min.apply(null,boxHeight);
                        let minIndex=this.getMinHeightIndex(boxHeight,minHeight);
                        boxs[i].style.top=minHeight+'px';//设置top
                        boxs[i].style.left=boxs[minIndex].offsetLeft+'px';//设置left
                        boxHeight[minIndex]+=boxs[i].offsetHeight;//更新数组
                    }
                }
                document.getElementById(container).style.height=Math.max.apply(null,boxHeight)+'px';
            }
        },
        getMinHeightIndex(imgHeight,minHeight){
            for(let i=0;i<imgHeight.length;i++){
                if(imgHeight[i]==minHeight) return i;
            }
        },
        checkBottom(){
       		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
       		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
       		var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
             if(scrollTop+windowHeight+1>scrollHeight){
         	      return true;
             }  
            return false;
        }
    }
}
</script>
<style>
    #plate .el-collapse-item__header{
        background:none !important;
    }
    #plate .el-collapse-item__wrap{
        background:none !important;
    }
    #plate .el-collapse{
        height:100vh;
        color:#fff;
        background: linear-gradient(top,rgb(155, 123, 243,0.5),rgb(78, 160, 243,0.5));
    }
    #plate .el-collapse-item__arrow,.el-icon-arrow-right{
        color:#fff
    }
</style>
