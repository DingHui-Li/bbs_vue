<template>
	<el-card style="padding:0" class="charts">
		<div :id='id' style="width:100%;height:500px"></div>
	</el-card>
</template>
<script>
import echarts from 'echarts'
export default {
	props:['id','data','type'],
	name:'charts',
	data(){
		return{

		}
	},
	mounted(){
		this.init();
	},
	methods:{
		init(){
			let charts=echarts.init(document.getElementById(this.id));
			let option = {
				color: ['#f44'],
				tooltip : {
				trigger: 'axis',
				axisPointer : {
					type : 'shadow'
				}
				},
				xAxis : [
				{
					type : 'category',
					data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
					axisTick: {
					alignWithLabel: true
					}
				}
				],
				yAxis : [
				{
					type : 'value'
				}
				],
				series : [
				{
					name:'每月花费',
					type:this.type,
					barWidth: '60%',
					data:[995,666,444,858,654,236,645,546,846,225,547,356]
				}
				]
			};
			console.log(this.type)
			if(this.type=='sunburst'){
				console.log(this.data)
				option={
					series: {
						type: 'sunburst',
						highlightPolicy: 'ancestor',
						data: this.data,
						radius: [0, '95%'],
						sort: null,
						levels: [{}, {
							r0: '15%',
							r: '35%',
							itemStyle: {
								borderWidth: 2
							},
							label: {
								rotate: 'tangential'
							}
						}, {
							r0: '35%',
							r: '70%',
							label: {
								align: 'right'
							}
						}, {
							r0: '70%',
							r: '72%',
							label: {
								position: 'outside',
								padding: 3,
								silent: false
							},
							itemStyle: {
								borderWidth: 3
							}
						}]
					}
				}
			}
			charts.setOption(option);
		}
	}
}
</script>
<style>
	.charts .el-card__body{
		padding:0
	}
</style>
