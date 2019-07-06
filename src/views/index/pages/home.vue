<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col :lg='18' :md='20' :xs='24'>
            <el-col>
                <el-tabs stretch style="color:#000" v-model="actPlateIndex" @tab-click="handleClick">
                    <el-tab-pane v-for="(plate,index) in plates" :key="'tab_'+plate.plate_name" :label="plate.plate_name" :name="index+''"> </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col>
                <swiper :options="swiperOpt" style="height:100vh" ref="mySwiper">
                    <swiper-slide v-for="plate in plates" :key="plate.plate_name" :name="plate.plate_name">
                        <el-col>
                            <el-tabs v-model="actDistrictIndex" @tab-click="handleClick2">
                                <el-tab-pane v-for="(district,index2) in plate.districts" :key="'tab_'+district.district_name" :label="district.district_name" :name="index2+''">
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                        <el-col>
                            <swiper :options="swiperOpt2" style="height:100vh" ref="mySwiper2">
                                <swiper-slide  v-for="district in plate.districts" :key="district.district_name">
                                    <notice />
                                </swiper-slide>
                            </swiper>
                        </el-col>
                    </swiper-slide>
                </swiper>
            </el-col>
        </el-col>
    </el-row>
</template>
<script>
import notice from '../components/notice'
export default {
    components:{notice},
    data(){
        return{
            swiperOpt:{
                on: {
                    slideChangeTransitionEnd:()=>{//使slide与tab同步
                        this.actPlateIndex=this.swiper.activeIndex+'';
                        this.actDistrictIndex='0';
                        this.swiper2().activeIndex="0";
                    }
                }
            },
            swiperOpt2:{
                on: {
                    slideChangeTransitionEnd:()=>{//使slide与tab同步
                        this.actDistrictIndex=this.swiper2().activeIndex+'';
                       // console.log(this.swiper2())
                    }
                }
            },
            plates:[
                {"plate_name":'综合'},
                {"plate_name":'时尚',
                    'districts':[
                        {'district_name':'发现'},
                        {'district_name':'美妆'},
                        {'district_name':'穿搭'}]},
                {'plate_name':'美食'},
                {'plate_name':'旅行'},
                {'plate_name':'体育'},
                {'plate_name':'健康'},
                {'plate_name':'游戏'},
                {'plate_name':'影视'}
            ],
            actPlateIndex:'0',
            actDistrictIndex:'0'
        }   
    },
    mounted(){
        
    },
    computed:{
        swiper(){
            return this.$refs.mySwiper.swiper;
        }
    },
    methods:{
        swiper2(){
            return this.$refs.mySwiper2[this.actPlateIndex].swiper;
        },
        handleClick(tab, event) {
            this.swiper.slideTo(tab.name);//使tab与slide同步
            this.actDistrictIndex='0';
            this.swiper2().activeIndex="0";
        },
        handleClick2(tab, event) {
            this.swiper2.slideTo(tab.name);//使tab与slide同步
        }
    }
}
</script>
<style>

</style>
