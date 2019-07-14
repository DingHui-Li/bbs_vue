<template>
	<el-row type="flex" justify="center" :gutter="10">
		<el-col>
			<el-col :lg="6" :md="8" :sm="12" :xs="24"  v-for="(i,index) in countData" :key="index">
				<el-card :style="{'background-color':i.color,color:'#fff'}">
					<div slot="header">
						<i class="fa fa-file-text" aria-hidden="true" style="font-size:1.5rem"></i>
						<span style="float:right;font-weight:bold">{{i.name}}</span> 
					</div>
					<div align="center" style="margin-bottom:10px;font-size: 1.5rem;font-weight:bold;">
						{{i.num}}
					</div>
					<div align="center" style="font-size:0.7rem">{{i.time}}</div>
				</el-card>
			</el-col>
		</el-col>
	</el-row>	
</template>
<script>
export default {
	data(){
		return{
			countData:[
				{'name':'今日发帖数','num':12,'time':'2019-7-14 16:49','color':'#2196F3'},
				{'name':'今日发帖数','num':1123,'time':'2019-7-14 16:49','color':'#607D8B'},
				{'name':'今日发帖数','num':143,'time':'2019-7-14 16:49','color':'#536DFE'},
				{'name':'今日发帖数','num':231,'time':'2019-7-14 16:49','color':'#4CAF50'},
			]
		}
	}
}
</script>
<style>
</style>
