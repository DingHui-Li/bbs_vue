<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col :lg='18' :md='20' :xs='24' style="padding:20px;background-color:#fff" id="plate">
            <el-collapse  accordion style="padding:20px;">
                <el-collapse-item v-for="plate in plates" :key="'plate'+plate.name" :name="plate.name" :title="plate.name+'(4)'">
                    <div v-for="dist in plate.district" :key="dist.name" > 
                        <el-col :md="8" :xs="24" style="padding:10px">
                            <el-card style="border-radius:10px;background-color:#607D8B;color:#fff">
                                <div slot="header" align="center" style="font-size:2rem"> {{dist.name}}</div>
                                <div style="font-size:1rem">
                                    帖子: <span>23</span>
                                </div>
                                <div style="font-size:1rem">
                                    最新帖子：<span>2019-7-11 12:2:32</span>
                                </div>
                            </el-card>
                        </el-col>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data(){
        return{
            plates:[
                {'name':'美食','district':[
                    {'name':'中餐'},
                    {'name':'中餐'},
                    {'name':'中餐'},
                    {'name':'中餐'},
                    {'name':'中餐'},
                    ]},
                {'name':'游戏','district':[{
                    'name':'中餐'
                }]},
                {'name':'影视','district':[{
                    'name':'中餐'
                }]},
                {'name':'时尚','district':[{
                    'name':'中餐'
                }]}
            ]
        }
    },
    mounted(){
    
    }
}
</script>
<style>
    #plate .el-collapse-item__header{
        font-size:1.5rem;
        padding:20px
    }
</style>
