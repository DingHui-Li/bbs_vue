<template>
	<el-row id="home">
		<el-col style="padding:0">
			<el-col :xs="24" :lg='8' class="infoCardContainer">
				<el-col :xs='12' :sm="6" :md="6" :lg="12" style="padding:10px" v-for="(item,index) in countData" :key="index" >
					<el-card class="infoCard" >
						<div align="center" style="margin-top:25%">
							<div >
								{{item.name}}
							</div>
							<div>
								{{item.value}}
							</div>
						</div>
					</el-card>
				</el-col>
			</el-col>
			<el-col :xs="24" :lg="16" style="padding:10px">
				<el-card >
					<div style="width:100%;" id="chart1" class="charts"></div>
				</el-card>
			</el-col>
		</el-col>
		<el-col style="padding:0;margin-top:30px">
			<el-col :xs="24" :lg='8' class="infoCardContainer">
				<el-col :xs='24' :md="12" style="padding:10px" v-for="(item,index) in countData" :key="index" >
					<el-card class="infoCard">
						<div align="center" style="margin-top:25%">
							<div >
								{{item.name}}
							</div>
							<div>
								{{item.value}}
							</div>
						</div>
					</el-card>
				</el-col>
			</el-col>
			<el-col :xs="24" :lg="16" >
				<el-col :xs='24' :xl="12" style="padding:10px">
					<el-card>
						<div style="width:100%;" id="chart2" class="charts"></div>
					</el-card>
				</el-col>
			</el-col>
		</el-col>
	</el-row>
</template>
<script>
import charts from '../components/charts'
import { apiHost } from '../../../../apiConfig';
import echarts from 'echarts'
export default {
	components:{charts},
	data(){
		return{
			countData:[
				{'name':'今日收藏','value':0,},
				{'name':'今日喜欢','value':0,},
				{'name':'今日发帖','value':0,},
				// {'name':'今日注册','value':0},
				{'name':'今日回复','value':0},
			],
			plateData:[]
		}
	},
	mounted(){
		this.getData();
		this.setSize();
		this.initChart();
	},
	methods:{
		setSize(){
			let card=document.getElementsByClassName('infoCard');
			let width=card[0].offsetWidth;
			for(let i=0;i<card.length;i++){
				card[i].style.height=width-40+'px';
			}
			let height=document.getElementsByClassName('infoCardContainer')[0].offsetHeight;
			
			let charts=document.getElementsByClassName('charts');
			for(let i=0;i<charts.length;i++){
				charts[i].style.height=(width-50)*2+'px';
			}
		},
		getData(){
			this.axios({
				url:apiHost+'/admin/getHomeMessage',
				method:'get'
			}).then(res=>{
				console.log(res.data)
				if(res.data.code==200){
					let i=0;
					for(let key in res.data.data){
						if(key!='registNum'){
							this.countData[i].value=res.data.data[key];
							i++;
						}
					}
					this.initChart2();
				}
			})
		},
		initChart(){
			var dom = document.getElementById("chart1");
			var myChart = echarts.init(dom);
			var app = {};
			let option = null;
			// app.title = '嵌套环形图';
			option = {
				title: {
					text: '论坛的活跃与新会员',
					subtext: '',
					x: 'center'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: 'rgba(155, 123, 243, 0.685)'
						}
					}
				},
				legend: {
					data: ['新会员人数', '月活跃'],
					bottom: 0
				},
				xAxis: [
					{
						type: 'category',
						data: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
						axisPointer: {
							type: 'shadow'
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						name: '新会员人数(个)',
						min: 0,
						max: 1600,
						interval: 400,
						axisLabel: {
							formatter: '{value}'
						},
						nameLocation:'center',
						nameGap:65
					},
					{
						type: 'value',
						name: '月活跃(次数)',
						min: 0,
						max: 60000,
						// interval: 15000,
						axisLabel: {
							formatter: '{value}'
						},
						nameLocation:'center',
						nameGap:65,
						nameRotate:-90
					}
				],
				series: [
				{
						name: '新会员人数',
						type: 'bar',
						data: [229.6, 530, 684, 296, 707, 970, 796, 1366, 290, 60, 499,500],
						barWidth: '30%',
						itemStyle: {
							normal: {
								color: 'rgba(75, 120, 218, 0.527)'
							}
						}
				},
				{
						name: '月活跃',
						type: 'bar',
						yAxisIndex: 1,
						data: [13061, 17500, 32178, 13273, 33075, 51490, 47863, 34493, 13500, 3200, 23498,23000],
						barWidth: '30%',
						itemStyle: {
							normal: {
								color: 'rgba(206, 191, 248, 0.685)'
							}
						}
				}
				]
			};
				if (option && typeof option === "object") {
					myChart.setOption(option, true);
				}
		},
		initChart2(){
			var myChart = echarts.init(document.getElementById('chart2'));
			let option = {
				// tooltip: {//提示框，可以在全局也可以在
				// 	trigger: 'item',  //提示框的样式
				// 	formatter: "{a} <br/>{b}: {c} ({d}%)",
				// 	color:'#000', //提示框的背景色
				// 	textStyle:{ //提示的字体样式
				// 		color:"black",
				// 	}
				// },
				// legend: {  //图例
				// 	orient: 'vertical',  //图例的布局，竖直    horizontal为水平
				// 	x: 'right',//图例显示在右边
				// 	data:['今日收藏数','今日点赞数','今日评论数','今日浏览量'],
				// 	textStyle:{    //图例文字的样式
				// 		color:'#333',  //文字颜色
				// 		fontSize:12    //文字大小
				// 	}
				// },
				series: [
					{
						type:'pie', //环形图的type和饼图相同
						radius: ['50%', '70%'],//饼图的半径，第一个为内半径，第二个为外半径
						avoidLabelOverlap: false,
						color:['#fdebbb','#ff7c82','#ffa35a','#4c4c4c'],
						label: {
							normal: {  //正常的样式
								show: true,
								position: 'left'
							},
							emphasis: { //选中时候的样式
								show: true,
								textStyle: {
									fontSize: '20',
									fontWeight: 'bold'
								}
							}
						},  //提示文字
						// labelLine: {
						// 	normal: {
						// 		show: false
						// 	}
						// },
						data:this.countData
						
					}
				]
			};
			myChart.setOption(option);
		}
	}
}
</script>
<style>
	#home .el-card{
		box-shadow:none;
		border:none
	}
	.infoCard{
		color:#2196F3
	}
</style>
