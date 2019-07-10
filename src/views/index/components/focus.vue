<template>
	<!-- 消息中心页面的关注动态组件 -->
	<el-card id="focusCard" >
		<div slot="header" style="font-size:1.2rem;color:#757575;font-weight:bold">我的关注</div>
		<el-scrollbar>
			<div style="padding:10px 20px" v-for="i in 9" :key="'focus'+i">
				<div style="width:55px;float:left">
					<el-avatar src="http://static.simpledesktops.com/uploads/desktops/2014/03/12/Frutas.png" :size="55"></el-avatar>
				</div>
				<div style="margin-top:10px;padding-left:60px">
					<div style="font-weight:bold;color:#757575">任我行</div>
					<div style="color:#757575;font-size:0.8rem;margin:10px 0">00:00</div>
					<div style="font-weight:bold;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">我是预言家 我预言嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</div>
					<div style="color:#757575;font-size:0.9rem;margin:5px 0">这里是内容简介</div>
					<div>
						<i class="fa fa-heart" aria-hidden="true" style="color:#FF5252;margin-right:20px"> 3.3w</i>
						<i class="fa fa-commenting-o" aria-hidden="true" style="color:#2196F3;margin-right:20px"> 4</i>
						<i class="fa fa-star" aria-hidden="true" style="color:#FF9800"> 10k</i>
					</div>
					<div style="background-color:#f9f9f9;border-radius:5px;padding:10px;font-size:0.8rem;color:#757575">
							<span>木子</span>：<span>哈哈哈哈哈哈哈哈哈</span>
					</div>
				</div>
				<el-divider></el-divider>
			</div>
		</el-scrollbar>
	</el-card>
</template>
<script>
export default {
	name:'focus'
}
</script>
<style>
	#focusCard .el-scrollbar{
		height:80vh;
	}
</style>
