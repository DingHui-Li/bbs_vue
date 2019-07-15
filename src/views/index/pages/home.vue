<template>
    <el-row type="flex" justify="center" :gutter="20" class="animated fadeIn">
        <el-col :lg='18' :md='20' :xs='24' style="padding:0">
            <el-card style="padding:0;box-shadow:none;border:none;min-height:100vh;" id="homeCard">
                <el-tabs stretch style="color:#000;box-shadow:none;border:none;padding:0;" v-model="selectTab" @tab-click="plateChange" id="plateTab">
                    <el-tab-pane label="发现" :name="'发现'">
                        <el-col style="padding:0;" id="postContainer">
                            <post v-for="post in homeData" :key="'homepost'+post.id" :data='post' 
                                @postLoadComplete="postLoadComplete" className="homePost" parent="postContainer" :length="homeData.length"></post>
                        </el-col>
                        <el-col align="center" style="font-size:0.9rem;color:#757575;border-top:1px solid #ccc;padding:20px 0">{{homePageMsg}}</el-col>
                    </el-tab-pane>
                    <el-tab-pane v-for="(plate,index) in filterplates" :key="'tab_'+plate.plate_name" :label="plate.plate_name" :name="index+''">
                        <el-tabs stretch style="padding:0;" @tab-click="handleClick" v-model="actDistrict" id="district_pane">
                            <el-tab-pane v-for="(district) in plate.districtInfos" :key="'tab_'+district.district_name" :label="district.district_name" :name="district.id+''">
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="更多板块" name='more'></el-tab-pane> -->
                </el-tabs>
                <el-row type="flex" justify="center" v-if="selectTab!='发现'&&selectTab!='more'">
                    <el-col :lg="18">
                        <notice :data="totalNotice" type="total" />
                        <notice :data="plateNotice" type="plate" style="margin:5px 0"/>
                        <notice :data="districtNotice" />
                        <el-col style="margin:20px 0;animation-duration:2s" align="end" class="animated fadeIn">
                            帖子排序：
                            <el-radio-group v-model="sort" @change="sortChange()">
                                <el-radio-button label="最新发布"></el-radio-button>
                                <el-radio-button label="最新回复"></el-radio-button>
                                <el-radio-button label="回复数"></el-radio-button>
                                <el-radio-button label="浏览量"></el-radio-button>
                            </el-radio-group>
                        </el-col>
                        <el-col style="padding:0" id="distPostContainer" >
                            <post-horizontal v-for="post in posts" :key="'post'+post.id" :data='post'></post-horizontal>
                        </el-col>
                        <el-col align="center">
                            <el-button @click="getDistPost">{{distPageMsg}}</el-button>
                        </el-col>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <fab />
    </el-row>
</template>
<script>
import notice from '../components/notice'
import post from '../components/post'
import post_horizontal from '../components/post_horizontal'
import { apiHost } from '../../../../apiConfig';
import fab from '../components/fab'
export default {
    components:{notice,post,'post-horizontal':post_horizontal,fab},
    data(){
        return{
            selectTab:'发现',
            sort:'最新发布',
            homeData:[],
            plates:[],
            posts:[],
            actDistrict:'0',
            totalNotice:[],
            plateNotice:[],
            districtNotice:[],
            postNum:0,
            homePageNum:1,
            distPageNum:1,
            distPageMsg:'加载更多',
            homePageMsg:'下拉加载更多'
        }   
    },
    mounted(){
        this.getPlate();
        this.getHomeData();
        this.getNotice(-1,-1);
        window.onscroll = ()=>{
            if(this.selectTab=='发现'){
                if(this.checkBottom()){
                    this.getHomeData();
                }
            }
        }
    },
    computed:{
        filterplates(){
            let data= this.plates.map((item,index)=>{
                if(index<4) return item;
                return [];
            })
            data.splice(4,1);
            return data;
        }
    },
    methods:{
        getPlate(){
            const loading=this.loading('tabCard');
            this.axios({
                url:apiHost+"/anon/plate/getPlates",
                method:"get"
            }).then(res=>{
                if(res!=undefined){
                    this.plates=res.data;
                }
                loading.close();
            })
        },
        plateChange(tab,event){//父选项卡改变事件//分区改变-重新加载
            if(tab.name!='发现'&&tab.name!='more'){
                this.actDistrict=this.plates[tab.name].districtInfos[0].id+'';
                this.plateNotice=[];
                this.districtNotice=[];
                this.getNotice(this.plates[tab.name].id,-1);
                this.getNotice(-1, this.actDistrict);
            }
            if(tab.name=='more'){
                this.$router.push('/plate');
            }
        },
        handleClick(tab, event) {//子选项卡改变事件
            this.actDistrict=tab.name;
            this.districtNotice=[];
            this.getNotice(-1, this.actDistrict);
        },
        getHomeData(){
            this.homePageMsg="加载中..."
            this.axios({
                url:apiHost+'/anon/post/getIndexPostTitles?page='+this.homePageNum,
                method:'get'
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.homePageNum++;
                    if(res.data.PostTitleList.length==0){
                        this.homePageMsg='你发现了我的底线';
                        return;
                    }
                    for(let i=0;i<res.data.PostTitleList.length;i++){
                        this.homeData.push(res.data.PostTitleList[i])
                    }
                }else{
                    this.$message.error('加载失败');
                }
            })
        },
        loading(target){
            return this.$loading({
                    fullscreen:false,
                    target:document.getElementById(target),
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading'
            });
        },
        getDistPost(){
            this.distPageMsg='加载更多'
            let loading=this.loading('district_pane');
                this.axios({
                    url:apiHost+"/anon/post/getPostTitles?id="+this.actDistrict+"&orderby="+this.getSortType(this.sort)+'&page='+this.distPageNum,
                    method:'get'
                }).then(res=>{
                    loading.close();
                    if(res.data.code==200){
                        if(res.data.postInfos.length==0){
                            this.distPageMsg="没有更多了";
                            return;
                        }
                        this.distPageNum++;
                        for(let i=0;i<res.data.postInfos.length;i++){
                            this.posts.push(res.data.postInfos[i]);
                        }
                    }
            })    
        },
        getSortType(label){
            if(label=='最新发布') return 'post_time';
            if(label=='最新回复') return 'reply_time';
            if(label=='回复数') return 'reply_num';
            if(label=='浏览量') return 'view_num';
        },
        sortChange(){//排列方式改变-重新加载
            this.distPageNum=1;
            this.posts=[];
            this.getDistPost();
        },
        getNotice(plate_id,district_id){
            this.axios({
                url:apiHost+'/anon/getRecentAnnouncement?plate_id='+plate_id+'&district_id='+district_id,
                method:'get'
            }).then(res=>{
                // console.log(res)
                if(res.data.code==200){
                    if(plate_id==-1&&district_id==-1){
                        this.totalNotice=res.data;
                    }
                    else if(plate_id!=-1&&district_id==-1){
                        this.plateNotice=res.data;
                    }else if(plate_id==-1&&district_id!=-1){
                        this.districtNotice=res.data;
                    }
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
                        let pos=boxs[i].getBoundingClientRect();    
                        boxHeight.push(pos.height);
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
    },
    watch:{
        actDistrict:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.distPageNum=1;
                this.posts=[];
                this.getDistPost();       
            }
        },
    }
}
</script>
<style>
    #homeCard .el-card__body{
        padding:0
    }
    #plateTab .el-tabs__item{
        font-size: 1.5rem;
        font-weight: bold;
        color:#757575;
        margin-top:20px
    }
    #district_pane .el-tabs__item{
        font-size: 1.2rem;
        font-weight: bold;
        color:#757575;
    }
</style>
