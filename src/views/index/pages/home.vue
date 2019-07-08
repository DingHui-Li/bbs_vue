<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col :lg='18' :md='20' :xs='24' style="padding:0">
            <el-card style="padding:0;box-shadow:none;border:none">
                    <el-tabs stretch style="color:#000;box-shadow:none;border:none;padding:0" type="border-card" >
                        <el-tab-pane v-for="(plate,index) in plates" :key="'tab_'+plate.plate_name" :label="plate.plate_name" :name="index+''">
                            <el-tabs stretch style="padding:0">
                                <el-tab-pane v-for="(district,index2) in plate.districts" :key="'tab_'+district.district_name" :label="district.district_name" :name="index2+''">
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
                                        <el-col :xl="6" :lg="8" :sm="12" :xs="24" v-for="i in 9" :key="i">
                                            <post></post>
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
            plates:[
                {"plate_name":'综合',
                    'districts':[{'district_name':'发现'}]},
                {"plate_name":'时尚',
                    'districts':[
                        {'district_name':'发现'},
                        {'district_name':'美妆'},
                        {'district_name':'穿搭'}]},
                {'plate_name':'美食',
                    'districts':[
                        {'district_name':'发现'}]},
                {'plate_name':'旅行',
                    'districts':[
                        {'district_name':'发现'}]},
                {'plate_name':'体育'},
                {'plate_name':'健康'},
                {'plate_name':'游戏'},
                {'plate_name':'影视'}
            ],
        }   
    },
    mounted(){
        this.test();
    },
    computed:{

    },
    methods:{
        test(){
            this.axios({
                url:apiHost+"/index",
                method:"post"
            }).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>
<style>
    .el-card__body{
        padding:0
    }
</style>
