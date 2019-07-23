<template>
	<el-row id="home">
		<el-col style="padding:0">
			<el-col :xs="24" :lg='8' class="infoCardContainer">
				<el-col :xs='12' :lg="12" style="padding:10px" v-for="(item,index) in totalNum" :key="'total'+index" >
					<el-card class="infoCard" >
						<div style="font-size:30px;padding:0" slot="header">
							<i class="fa fa-file-text" aria-hidden="true" v-if="index==0"></i>
							<i class="fa fa-user" aria-hidden="true" v-if="index==1"></i>
							<i class="fa fa-square" aria-hidden="true" v-if="index==2"></i>
							<i class="fa fa-th-large" aria-hidden="true" v-if="index==3"></i>
							<div style="font-weight:bold;font-size:0.9rem;float:right;line-height:4rem">
								{{item.name}}
							</div>
						</div>
						<div align="center">
							<div style="font-weight:bold;font-size:20px">
								{{item.value}}
							</div>
						</div>
					</el-card>
				</el-col>
			</el-col>
			<el-col :xs="24" :lg="16" style="padding:10px">
				<el-card >
					<div style="width:100%;" id="chart1" class="charts" align="center"></div>
				</el-card>
			</el-col>
		</el-col>
		<el-col style="padding:0;margin-top:30px">
			<el-col :xs="24" :lg='8' class="infoCardContainer">
				<el-col :xs='24' :lg="12" style="padding:10px" v-for="(item,index) in todayData" :key="index" >
					<el-card class="infoCard" style="font-weight:bold" :style="{color:color[index]}">
						<div style="font-size:30px">
							<i class="fa fa-star" aria-hidden="true" v-if="index==0" ></i>
							<i class="fa fa-heart" aria-hidden="true"  v-else-if="index==1"></i>
							<i class="fa fa-pencil" aria-hidden="true" v-else-if="index==2" ></i>
							<i class="fa fa-comments" aria-hidden="true" v-else-if="index==3"></i>
						</div>
						
						<div align="center">
							<div style="font-size:0.9rem">
								{{item.name}}
							</div>
							<div style="font-size:1.5rem">
								{{item.value}}
							</div>
						</div>
					</el-card>
				</el-col>
			</el-col>
			<el-col :xs="24" :lg="16" >
				<el-col style="padding:10px">
					<el-card>
						<div style="width:100%;" id="chart2" class="charts" align="center"></div>
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
			todayData:[
				{'name':'今日收藏','value':0,},
				{'name':'今日喜欢','value':0,},
				{'name':'今日发帖','value':0,},
				{'name':'今日回复','value':0},
			],
			totalNum:[
				{'name':'总帖数','value':0},
				{'name':'总用户','value':0},
				{'name':'总板块数','value':0},
				{'name':'总分区数','value':0},
			],
			registerNum:'',
			postNum:'',
			plateData:[],
			color:['#4CAF50','#8BC34A','#CDDC39','#388E3C'],
		}
	},
	mounted(){
		this.getData();
		this.setSize();
	},
	beforeRouteEnter(to,from,next){
		next(vm=>{
			if(vm.role<4){
				vm.$message.error('权限不足');
				vm.$router.replace('/postManage');
			}
		})
	},
	methods:{
		dateFormat(date){
			let d=new Date(date);
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate();
        },
		setSize(){
			let card=document.getElementsByClassName('infoCard');
			let width=card[0].offsetWidth;
			// for(let i=0;i<card.length;i++){
			// 	card[i].style.height=width-40+'px';
			// }
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
				if(res.data.code==200){
					// console.log(res.data.data)
					this.todayData[0].value=res.data.data.collectNum;
					this.todayData[1].value=res.data.data.likeNum;
					this.todayData[2].value=res.data.data.postNum;
					this.todayData[3].value=res.data.data.replyNum;

					this.totalNum[0].value=res.data.data.postTotalNum;
					this.totalNum[1].value=res.data.data.userNum;
					this.totalNum[2].value=res.data.data.plateNum;
					this.totalNum[3].value=res.data.data.disNum;

					this.registerNum=res.data.data.registNumList.map(item=>{
						return[this.dateFormat(item.time),item.num]
					});
					this.postNum=res.data.data.postNumList.map(item=>{
						return[this.dateFormat(item.time),item.num]
					});
					console.log(this.postNum)
					console.log(this.registerNum)
					this.initChart();
					this.initChart2();
				}
			})
		},
		initChart(){
			// let date;
			// if(this.registerNum.length>=this.postNum.length){
			// 	date=this.registerNum.map(item=>{
			// 		return item[0];
			// 	})
			// }else{
			// 	date=this.postNum.map(item=>{
			// 		return item[0];
			// 	})
			// }
			// date.unshift('日期');
			// let registerNum=this.registerNum.map(item=>item[1]);
			// registerNum.unshift('每日注册');
			// let postNum=this.postNum.map(item=>item[1]);
			// postNum.unshift('每日发帖');	
			var myChart = echarts.init(document.getElementById('chart1'));
			let option = null;
			option = {
				legend: {},
				tooltip: {
					trigger: 'axis',
					// showContent: false
				},
				// dataset: {
				// 	source: 
				// 		this.postNum
					
				// },
				xAxis: {
						type: 'category',
						axisLine:{
							lineStyle:{
								color:'rgba(75, 120, 218, 0.527)',
								width:1.5
							}
						}
					},
				yAxis: {
						gridIndex: 0,
						"splitLine": {     //网格线
							"show": false
						},
						axisLine:{
							lineStyle:{
								color:'rgba(75, 120, 218, 0.527)',
								width:1.5
							}
						}
					},
				series: [
					{
						name:'每日注册',
						type: 'bar', smooth: true, seriesLayoutBy: 'row',
						data:this.registerNum,

						itemStyle: {
							normal: {
								color: 'rgba(206, 191, 248, 0.685)'
							}
                    }},
					{
						name:'每日发帖',
						type: 'bar', smooth: true, seriesLayoutBy: 'row', 
						data:this.postNum,
						itemStyle: {
							normal: {
								color: 'rgba(75, 120, 218, 0.527)'
							}
                    }},
				]
			};
			myChart.setOption(option);
		},
		initChart2(){
			var myChart = echarts.init(document.getElementById('chart2'));
			let option = {
				series: [
					{
						type:'pie', //环形图的type和饼图相同
						// radius: ['50%', '70%'],//饼图的半径，第一个为内半径，第二个为外半径
						avoidLabelOverlap: false,
						color:this.color,
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
							},
						}, 
						data:this.todayData.sort(function (a, b) { return a.value - b.value; }),
						roseType: 'radius',
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
	/* #home .el-card__header{
		padding:0 20px
	} */
	.infoCard{
		color:#2196F3
	}
</style>
