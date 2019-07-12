<template>
    <el-row type="flex" justify="center" :gutter="20" class="animated fadeIn">
        <el-col :lg='18' :md='20' :xs='24' style="padding:0">
            <el-card style="padding:0;box-shadow:none;border:none;min-height:100vh" id="homeCard">
                <el-tabs stretch style="color:#000;box-shadow:none;border:none;padding:0" type="border-card" :value="'发现'" @tab-click="plateChange">
                    <el-tab-pane label="发现" :name="'发现'">
                        <el-col :xl="6" :lg="8" :sm="12" :xs="24" v-for="post in homeData" :key="'homepost'+post.id">
                            <post :data='post'></post>
                        </el-col>
                    </el-tab-pane>
                    <el-tab-pane v-for="(plate,index) in plates" :key="'tab_'+plate.plate_name" :label="plate.plate_name" :name="index+''">
                        <el-tabs stretch style="padding:0;min-height:50vh" @tab-click="handleClick" v-model="actDistrict" id="district_pane">
                            <el-tab-pane v-for="(district) in plate.districtInfos" :key="'tab_'+district.district_name" :label="district.district_name" :name="district.id+''">
                                <notice :data="totalNotice" type="total" v-if="totalNotice!=[]&&totalNotice.userInfo!=undefined"/>
                                <notice :data="plateNotice" type="plate" v-if="plateNotice!=[]&&plateNotice.userInfo!=undefined" style="margin:5px 0"/>
                                <notice :data="districtNotice" v-if="districtNotice!=[]&&districtNotice.userInfo!=undefined"/>
                                <el-col style="margin:20px 0" align="end">
                                    帖子排序：
                                    <el-radio-group v-model="sort" @change="sortChange()">
                                        <el-radio-button label="最新发布"></el-radio-button>
                                        <el-radio-button label="最新回复"></el-radio-button>
                                        <el-radio-button label="回复数"></el-radio-button>
                                        <el-radio-button label="浏览量"></el-radio-button>
                                    </el-radio-group>
                                </el-col>
                                <el-col :xl="6" :lg="8" :sm="12" :xs="24" v-for="post in posts" :key="'post'+post.id">
                                    <post :data='post'></post>
                                </el-col>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import notice from '../components/notice'
import post from '../components/post'
import { apiHost } from '../../../../apiConfig';
export default {
    components:{notice,post},
    data(){
        return{
            sort:'最新发布',
            homeData:[],
            plates:[],
            posts:[],
            actDistrict:'0',
            totalNotice:[],
            plateNotice:[],
            districtNotice:[]
        }   
    },
    mounted(){
        this.getPlate();
        this.getHomeData();
        this.getNotice(-1,-1);
    },
    methods:{
        getPlate(){
            const loading=this.loading('tabCard');
            this.axios({
                url:apiHost+"/anon/plate/getPlates",
                method:"get"
            }).then(res=>{
                console.log(res)
                if(res!=undefined){
                    this.plates=res.data;
                }
                loading.close();
            })
        },
        plateChange(tab,event){//父选项卡改变事件
            if(tab.name!='发现'){
                this.actDistrict=this.plates[tab.name].districtInfos[0].id+'';
                this.plateNotice=[];
                this.districtNotice=[];
                this.getNotice(this.plates[tab.name].id,-1);
            }
        },
        handleClick(tab, event) {//子选项卡改变事件
            this.actDistrict=tab.name;
            this.districtNotice=[];
            this.getNotice(-1,tab.name);
        },
        getHomeData(){
            this.axios({
                url:apiHost+'/anon/post/getIndexPostTitles',
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                    this.homeData=res.data.PostTitleList;
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
            let loading=this.loading('district_pane');
                this.axios({
                    url:apiHost+"/anon/post/getPostTitles?id="+this.actDistrict+"&orderby="+this.getSortType(this.sort),
                    method:'get'
                }).then(res=>{
                    loading.close();
                    if(res.data.code==200){
                        this.posts=res.data.postInfos;
                    }
            })    
        },
        getSortType(label){
            if(label=='最新发布') return 'post_time';
            if(label=='最新回复') return 'reply_time';
            if(label=='回复数') return 'reply_num';
            if(label=='浏览量') return 'view_num';
        },
        sortChange(){
            this.getDistPost();
        },
        getNotice(plate_id,district_id){
            this.axios({
                url:apiHost+'/anon/getRecentAnnouncement?plate_id='+plate_id+'&district_id='+district_id,
                method:'get'
            }).then(res=>{
                console.log(res)
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
        }
    },
    watch:{
        actDistrict:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.getDistPost();       
            }
        }
    }
}
</script>
<style>
    #homeCard .el-card__body{
        padding:0
    }
</style>
