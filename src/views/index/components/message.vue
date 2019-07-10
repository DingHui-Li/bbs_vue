<template>
	<div style="padding:10px;clear:both">
		<div v-if="!isme">
			<div style="float:left;width:35px;">
				<el-avatar src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png" :size="35"></el-avatar>
			</div>
			<div style="margin-left:45px;">
				<div style="font-size:0.9rem;color:#757575">昵称</div>
				<div style="padding:10px;background-color:#e0e0e0;border-radius:5px;max-width:70%;word-wrap:break-word;word-break:break-all;display:inline-block">
					ssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
				</div>
			</div>
		</div>
		<div v-else>
			<div style="float:right;width:35px;">
				<el-avatar src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png" :size="35"></el-avatar>
			</div>
			<div style="font-size:0.9rem;color:#757575;padding-right:40px" align="right">
				<span>昵称</span>
			</div>
			<div style="padding:10px;background-color:#2196F3;color:#fff;border-radius:5px;word-wrap:break-word;word-break:break-all;max-width:70%;float:right;margin-right:5px">
				sssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props:['isme'],
	name:'message'	
}
</script>
<style>

</style>
