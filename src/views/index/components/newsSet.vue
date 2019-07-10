<template>
	<!-- 消息中心页面的‘系统通知’组件 -->
	<el-card style="min-height:50vh;">
		<div slot="header" style="font-size:1.2rem;color:#757575;font-weight:bold;">消息设置</div>
		<div style="padding:20px">
			<div style="color:#757575;font-weight:bold;float:left;margin-right:20px">消息提醒方式：</div> 
			<el-radio-group v-model="type">
				<div><el-radio label="num" border >数字</el-radio></div>
				<div style="margin:20px 0"><el-radio label="dot" border >红点</el-radio></div>
				<div><el-radio label="hidden" border >不提醒</el-radio></div>
			</el-radio-group>
		</div>
		
	</el-card>
</template>
<script>
export default {
	name:'newsSet',
	data(){
		return{
			type:'num'
		}
	},
	watch:{
		type:function(newVal,oldVal){
			if(newVal!=oldVal){
				this.$emit('changeBadgeType',newVal);
			}
		}
	}
}
</script>
<style>
	#commentCard .el-scrollbar{
		height:80vh;
	}
</style>
