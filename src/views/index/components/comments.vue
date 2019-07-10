<template>
	<!-- 展示评论的组件 -->
	<el-card style="padding:20px;box-shadow:none">
		<el-col :sm="1" :xs="2" style="padding:0">
			<el-avatar src="http://pic1.win4000.com/wallpaper/c/57918d798786e.jpg" :size="35"></el-avatar>
		</el-col>
		<el-col :sm="23" :xs="22">
			<el-col :sm="21" :xs="18">
				<div>Y.</div>
				<div style="font-size:0.8rem;color:#757575;margin:5px 0">{{dateFormat(data.reply_time)}}</div>
				<div>{{data.content}}</div>
			</el-col>
			<el-col :sm="3" :xs="5" style="color:#757575;font-size:0.9rem">
				回复|删除
			</el-col>
			<!-- <el-col>
				<div style="background-color:#f9f9f9;border-radius:10px;padding:10px">s</div>
			</el-col> -->
		</el-col>
	</el-card>
</template>
<script>
export default {
	props:['data'],
	name:'comments',
	methods:{
		dateFormat(date){
			let d=new Date(date);
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate()+" "+d.getUTCHours()+":"+d.getMinutes()+":"+d.getSeconds();
        },
	}
}
</script>
<style>

</style>

