<template>
	<!-- 展示评论的组件 -->
	<el-card style="padding:20px;box-shadow:none">
		<el-col :sm="1" :xs="2" style="padding:0">
			<el-image :src="geturl(data.icon)" style="width:35px;border-radius:50%;height:35px" @click="$router.push(`/person/${data.user_id}`)"></el-image>
		</el-col>
		<el-col :sm="23" :xs="22" style="cursor:pointer">
			<el-col :sm="21" :xs="18">
				<div @click="$router.push(`/person/${data.user_id}`)" >{{data.nick_name}}</div>
				<div style="font-size:0.8rem;color:#757575;margin:5px 0">{{dateFormat(data.reply_time)}}</div>
				<div>{{data.content}}</div>
			</el-col>
			<el-col :sm="3" :xs="5" style="color:#757575;font-size:0.9rem">
				删除
			</el-col>
			<!-- <el-col>
				<div style="background-color:#f9f9f9;border-radius:10px;padding:10px">s</div>
			</el-col> -->
		</el-col>
	</el-card>
</template>
<script>
import { imgHost } from '../../../../apiConfig';
export default {
	props:['data'],
	name:'comments',
	methods:{
		geturl(url){
            return imgHost+url;
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

