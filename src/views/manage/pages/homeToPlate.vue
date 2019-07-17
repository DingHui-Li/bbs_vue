<template>
	<el-row type="flex" justify="center" :gutter="20">
		<el-col style="padding:0;" class='card'>
			<el-col style="margin-bottom:10px" :lg="8" :md="12" :xs="24">
				<el-card>
					<div slot="header">
						<i class="fa fa-file-text" aria-hidden="true" style="font-size:1.5rem"></i>
						<span style="font-weight:bold;margin-left:10px">我管理的板块</span>  
						<span style="font-weight:bold;float:right;font-size:1.3rem">2</span>
					</div>
					<div style="margin:0 0 10px 30px;font-size: 1.3rem;font-weight:bold;color:#757575;">
						美食
					</div>
					<div style="margin:0 0 10px 30px;font-size: 1.3rem;font-weight:bold;color:#757575" >
						游戏
					</div>
				</el-card>
			</el-col>
		</el-col>
	</el-row>	
</template>
<script>
export default {
	
}
</script>
<style>

</style>
