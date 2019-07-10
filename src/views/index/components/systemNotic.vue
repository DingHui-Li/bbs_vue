<template>
	<!-- 消息中心页面的‘系统通知’组件 -->
	<el-card id="commentCard">
		<div slot="header" style="font-size:1.2rem;color:#757575;font-weight:bold">系统通知</div>
		<el-scrollbar>
			<div style="padding:10px 20px" v-for="i in 9" :key="'focus'+i">
				<el-card style="box-shadow:none;padding:20px;background-color:#e0e0e0;border-radius:10px">
					<div style="font-weight:bold">
						(全站公告)关于每日工作的分配
					</div>
					<div style="color:#757575;font-size:0.8rem;margin-top:10px">
						懂的把懂打到公屏上
					</div>
					<div style="float:right;color:#757575;font-size:0.7rem">
						子木 9102-7-10
					</div>
				</el-card>
			</div>
		</el-scrollbar>
	</el-card>
</template>
<script>
export default {
	name:'systemNotic'
}
</script>
<style>
	#commentCard .el-scrollbar{
		height:80vh;
	}
</style>
