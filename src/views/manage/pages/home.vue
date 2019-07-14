<template>
	<el-row type="flex" justify="center" :gutter="20">
		<el-col style="padding:0;" class='card'>
			<el-col :lg="6" :md="8" :sm="12" :xs="24"  v-for="(i,index) in countData" :key="index" style="margin-bottom:10px">
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
			<el-col :sm="24" :md="12">
				<charts id="charts1" type="bar" />
			</el-col>
			<el-col :sm="24" :md="12">
				<charts id="charts2" type="line" />
			</el-col>
			<el-col :sm="24" :md="12">
				<charts id="charts3" type="pie" />
			</el-col>
			<el-col :sm="24" :md="12" v-if="plateData.length>0">
				<charts id="charts4" type="sunburst" :data="plateData" />
			</el-col>
		</el-col>
	</el-row>	
</template>
<script>
import charts from '../components/charts'
import { apiHost } from '../../../../apiConfig';
export default {
	components:{charts},
	data(){
		return{
			countData:[
				{'name':'今日发帖数','num':12,'time':'2019-7-14 16:49','color':'#2196F3'},
				{'name':'今日发帖数','num':1123,'time':'2019-7-14 16:49','color':'#607D8B'},
				{'name':'今日发帖数','num':143,'time':'2019-7-14 16:49','color':'#536DFE'},
				{'name':'今日发帖数','num':231,'time':'2019-7-14 16:49','color':'#4CAF50'},
			],
			plateData:[]
		}
	},
	mounted(){
		this.getPlateData();
	},
	methods:{
		getPlateData(){
            this.axios({
                url:apiHost+"/anon/plate/getPlates",
                method:"get"
            }).then(res=>{
                if(res!=undefined){
					this.plateData=[];
					this.plateData=res.data.map(plate=>{
						let children=plate.districtInfos.map(district=>{
							return {name:district.district_name,value:district.post_num}
						});
						return {name:plate.plate_name,children:children}
					});
					//console.log(this.plateData)
                }
            })
		},
	}
}
</script>
<style>
</style>
