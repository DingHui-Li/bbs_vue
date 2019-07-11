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
                                <notice />
                                <el-col style="margin:20px 0" align="end">
                                    帖子排序：
                                    <el-radio-group v-model="sort" >
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
            actDistrict:'0'
        }   
    },
    mounted(){
        this.getPlate();
        this.getHomeData();
    },
    computed:{

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
        plateChange(tab,event){
            if(tab.name!='发现'){
                this.actDistrict=this.plates[tab.name].districtInfos[0].id+'';
            }
        },
        handleClick(tab, event) {
            let loading=this.loading('district_pane');
            this.axios({
                url:apiHost+"/anon/post/getPostTitles?id="+tab.name,
                method:'get'
            }).then(res=>{
                this.posts=res.data;
                console.log(res);
                loading.close();
            })
        },
        getHomeData(){
            this.axios({
                url:apiHost+'/anon/post/getIndexPostTitles',
                method:'get'
            }).then(res=>{
                console.log(res)
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
        }
    },
    watch:{
        actDistrict:function(newVal,oldVal){
            if(newVal!=oldVal){
                this.axios({
                    url:apiHost+"/anon/post/getPostTitles?id="+newVal,
                    method:'get'
                }).then(res=>{
                    this.posts=res.data;
                    console.log(res);
                })                    
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
