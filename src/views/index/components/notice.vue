<template>
    <el-col>
        <el-card style="border-radius:20px;border:2px solid #6699FF;padding:20px">
            <el-row  >
                <el-col>
                    <div style="width:30px;float:left;margin-right:5px"  @click="$router.push(`/person/${data.userInfo.id}`)">
                        <el-image :src='geturl(data.userInfo.icon)' style="width:30px;height:30px;border-radius:50%"></el-image>
                    </div>
                    <span @click="$router.push(`/person/${data.userInfo.id}`)" style="cursor:pointer;line-height:30px">{{data.userInfo.nick_name}}</span> 
                    <span style="font-size:0.8rem;color:#757575;margin-left:20px;">{{dateFormat(data.topAnnouncement.post_time)}}</span>
                </el-col>
                <el-col>
                    <span style="font-size:1.1rem;font-style:bold">{{data.topAnnouncement.title}}
                        <span v-if="type=='total'">（全站公告）</span>
                        <span v-else-if="type=='plate'">（板块公告）</span>
                        <span v-else>（分区公告）</span>
                    </span>
                </el-col>
                <el-col>
                    <span style="font-size:0.8rem">
                        {{data.topAnnouncement.content}}
                    </span>
                </el-col>
            </el-row>
        </el-card>
    </el-col>
</template>
<script>
import { apiHost } from '../../../../apiConfig';
export default {
    props:['data','type'],
    name:'notice',
    methods:{
        geturl(url){
            console.log(this.data)
            return apiHost+url;
        },
        dateFormat(date){
			let d=new Date(date);
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        },
    }
}
</script>
<style>

</style>
