<template>
	<!-- 消息中心页面的‘收到的赞’组件 -->
	<el-card id="commentCard">
		<div slot="header" style="font-size:1.2rem;color:#757575;font-weight:bold">收到的赞</div>
		<el-scrollbar>
			<div style="padding:10px 20px" v-for="i in 9" :key="'focus'+i">
				<div style="width:55px;float:left">
					<el-avatar src="http://static.simpledesktops.com/uploads/desktops/2014/03/12/Frutas.png" :size="55"></el-avatar>
				</div>
				<div style="margin-top:10px;padding-left:60px">
					<div style="font-weight:bold;color:#757575">任我行</div>
					<div style="color:#757575;font-size:0.8rem;margin:10px 0">00:00</div>
					<div style="font-weight:bold;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">喜欢了你的帖子</div>
					<div style="color:#757575;font-size:0.9rem;margin:5px 0;padding:10px;background-color:rgba(96,125,139,0.3);border-radius:5px">
						这里是帖子标题
					</div>
				</div>
				<el-divider></el-divider>
			</div>
		</el-scrollbar>
	</el-card>
</template>
<script>
export default {
	name:'like'
}
</script>
<style>
	#commentCard .el-scrollbar{
		height:80vh;
	}
</style>
