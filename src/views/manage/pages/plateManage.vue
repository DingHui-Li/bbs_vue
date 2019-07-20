<template>
	<el-row type="flex" justify="center" :gutter="10">
		<el-col>
			<el-card style="padding:0;box-shadow:none;border:none">
				<div id="plateChart" style="width:100%;height:500px"></div>
			</el-card>
		</el-col>
		<el-dialog :visible.sync="modifyPlateDialog" title="修改板块">
			<el-button style="width:100%;background-color:red;color:#fff;margin-bottom:20px" @click="deletePlate()"  v-if="role>3">删除该板块</el-button>
			<el-input v-model="modifyPlateData.plate_name" maxlength='10' show-word-limit>
				<template slot="append">
					<el-button style="background-color:#2196F3;color:#fff;" @click="modifyPlate()">确认修改</el-button>
				</template>
			</el-input>
			<div style="margin:20px 0 20px 0;font-weight:bold;color:#757575">
				版主：
				<div style="float:right;margin-right:15px;font-size:1.5rem;color:#4CAF50" @click="addPlateModerator">
					<i class="fa fa-plus-circle" aria-hidden="true"></i> 
				</div>
			</div>
			<div style="margin:10px 0;padding-bottom:10px;border:1px solid #e0e0e0;height:30px;padding:5px;border-radius:5px" 
				v-for="moterator in modifyPlateData.moderator" 
				:key="'moderator'+moterator.id">
				<div style="float:left;width:40px">
					<el-image :src="geturl(moterator.icon)" style="width:30px;height:30px;border-radius:50%"></el-image>
				</div>
				<div style="float:left;line-height:30px">{{moterator.nick_name}}</div>
				<div style="line-height:30px;float:right;margin-right:10px;color:red;font-size:1.2rem">
					<i class="fa fa-minus-circle" aria-hidden="true" @click="deltePlateModerator(moterator.user_id)"></i>
				</div>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="modifyDistrictDialog" title="修改分区">
			<el-button style="width:100%;background-color:red;color:#fff;margin-bottom:20px" @click="deleteDistrict()" v-if="role>2">删除该分区</el-button>
			<el-input v-model="modifyDistrictData.district_name" maxlength='10' show-word-limit>
				<template slot="append">
					<el-button style="background-color:#2196F3;color:#fff;" @click="modifyDistrict()">确认修改</el-button>
				</template>
			</el-input>
			<div style="margin:20px 0 20px 0;font-weight:bold;color:#757575">
				分区版主：
				<div style="float:right;margin-right:15px;font-size:1.5rem;color:#4CAF50" @click="addDistrictModerator">
					<i class="fa fa-plus-circle" aria-hidden="true"></i> 
				</div>
			</div>
			<div style="margin:10px 0;padding-bottom:10px;border:1px solid #e0e0e0;height:30px;padding:5px;border-radius:5px" 
				v-for="moterator in modifyDistrictData.moderator" 
				:key="'moderator'+moterator.id">
				<div style="float:left;width:40px">
					<el-image :src="geturl(moterator.icon)" style="width:30px;height:30px;border-radius:50%"></el-image>
				</div>
				<div style="float:left;line-height:30px">{{moterator.nick_name}}</div>
				<div style="line-height:30px;float:right;margin-right:10px;color:red;font-size:1.2rem">
					<i class="fa fa-minus-circle" aria-hidden="true" @click="delteDistrictModerator(moterator.user_id)"></i>
				</div>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="addPlateDialog" title="增加板块">
			<el-input v-model="addPlateData.plate_name" maxlength='10' show-word-limit></el-input>
			<div style="margin-top:20px" align="right">
				<el-button @click="addPlateDialog=false">取消</el-button>
				<el-button @click="addPlate()" type="primary">确定</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="addDistrictDialog" title="增加分区">
			<el-input v-model="addDistrictData.district_name" maxlength='10' show-word-limit></el-input>
			<div style="margin-top:20px" align="right">
				<el-button @click="addDistrictDialog=false">取消</el-button>
			<el-button @click="addDist()" type="primary">确定</el-button>
			</div>
		</el-dialog>

	</el-row>	
</template>
<script>
import echarts from 'echarts'

import { apiHost, imgHost } from '../../../../apiConfig';
export default {
	props:['role'],
	data(){
		return{
			plateData:[],
			plateChart:null,
			modifyPlateDialog:false,
			modifyDistrictDialog:false,
			addPlateDialog:false,
			addDistrictDialog:false,
			modifyPlateData:{
				id:-1,
				plate_name:'',
				moderator:[]
			},
			modifyDistrictData:{
				id:-1,
				plate_id:-1,
				district_name:'',
				moderator:[]
			},
			addPlateData:{
				plate_name:''
			},
			addDistrictData:{
				district_name:'',
				plate_id:-1
			},
			district:[]
		}
	},
	mounted(){
		this.getPlateData();
		this.init();
	},
	beforeRouteEnter(to,from,next){
		next(vm=>{
			if(vm.role<3){
				vm.$message.error('权限不足');
				vm.$router.replace(from.path);
			}
		})
	},
	methods:{
		geturl(url){
			return imgHost+url;
		},
		getPlateData(){
            this.axios({
                url:apiHost+"/admin/getPlates",
                method:"get"
            }).then(res=>{
                if(res.data.code==200){
					this.plateData={'name':'狗扑','children':[]};
					this.plateData.children=res.data.data.map(plate=>{
						let children=plate.districtInfos.map(district=>{
							return {'name':district.district_name,
									'value':district.post_num,
									'id':district.id,
									'plate_id':district.plate_id,
									'type':'district'
									}
						});
						if(this.role>=3){
								children.push({'name':'+','plate_id':plate.id,'type':'addDist',itemStyle:{color:'#4CAF50',borderColor:'none'},})
						}
						return {'name':plate.plate_name,'children':children,'id':plate.id,'type':'plate'}
					});
					if(this.role==4){
						this.plateData['children'].push({'name':'+','type':'addPlate',itemStyle:{color:'#4CAF50',borderColor:'none'},})
					}
					this.plateChart.setOption({
						series: [{
							data: [this.plateData]
						}]
					});
                }
            })
		},
		addPlate(){
			if(this.addPlateData.plate_name.trim().length>0){
				this.axios({
					url:apiHost+'/admin/addPlates?name='+this.addPlateData.plate_name,
					method:'post'
				}).then(res=>{
					if(res.data.code==200){
						this.$router.replace('/empty')
						// this.addPlateData.plate_name="";
						// this.addPlateDialog=false;
						this.$notify({'title':'添加板块成功',type:"success"});
					}else{
						this.$notify.error(res.data.msg);
					}
				})
			}
		},
		addDist(){
			if(this.addDistrictData.district_name.trim().length>0){
				this.axios({
					url:apiHost+'/admin/addDistricts?plate_id='+this.addDistrictData.plate_id+'&district_name='+this.addDistrictData.district_name,
					method:'post'
				}).then(res=>{
					if(res.data.code==200){
						this.$router.replace('/empty')
						// this.addDistrictDialog=false;
						// this.addDistrictData.district_name="";
						this.$notify({'title':'添加分区成功',type:"success"});
						//this.getPlateData();
					}else{
						this.$notify.error('添加分区失败');
					}
				})
			}
		},
		getModerator(){
			this.axios({
				url:apiHost+'/admin/getPlateModerator?plate_id='+this.modifyPlateData.id,
				method:'get'
			}).then(res=>{
				if(res.data.code==200){
					this.modifyPlateData.moderator=res.data.ls;
				}
			})
		},
		getDistrictModerator(){
			this.axios({
				url:apiHost+'/admin/getDisOwner?district_id='+this.modifyDistrictData.id,
				method:'get'
			}).then(res=>{
				console.log(res)
				if(res.data.code==200){
					this.modifyDistrictData.moderator=res.data.ls;
				}
			})
		},
		addPlateModerator(){
			this.$prompt('请输入用户id', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /^[0-9]*$/ ,
				inputErrorMessage: '只能输入数字'
				}).then(({ value }) => {
					this.axios({
						url:apiHost+'/admin/addPlateModerator',
						method:'post',
						data:{'user_id':value,'plate_id':this.modifyPlateData.id}
					}).then(res=>{
						if(res.data.code==200){
							this.getModerator();
							this.$notify({'title':'添加版主成功',type:"success"});
						}else{
							this.$notify.error(res.data.msg);
						}
					})
				})
		},
		addDistrictModerator(){
			this.$prompt('请输入用户id', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /^[0-9]*$/ ,
				inputErrorMessage: '只能输入数字'
				}).then(({ value }) => {
					this.axios({
						url:apiHost+'/admin/addDisOwner',
						method:'post',
						data:{'user_id':value,'plate_id':this.modifyDistrictData.plate_id,'district_id':this.modifyDistrictData.id}
					}).then(res=>{
						if(res.data.code==200){
							this.getDistrictModerator();
							this.$notify({'title':'添加区主成功',type:"success"});
						}else{
							this.$notify.error(res.data.msg);
						}
					})
				})
		},
		deltePlateModerator(id){
			this.axios({
				url:apiHost+'/admin/deletePlateModerator?user_id='+id+'&plate_id='+this.modifyPlateData.id,
				method:'get'
			}).then(res=>{
				if(res.data.code==200){
					this.getModerator();
					this.$notify({'title':'删除版主成功',type:"success"});
				}else{
					this.$notify.error(res.data.msg);
				}
			})
		},
		delteDistrictModerator(id){
			this.axios({
				url:apiHost+'/admin/deleteDisOwner?user_id='+id+'&district_id='+this.modifyDistrictData.id,
				method:'get'
			}).then(res=>{
				if(res.data.code==200){
					this.getDistrictModerator();
					this.$notify({'title':'删除区主成功',type:"success"});
				}else{
					this.$notify.error(res.data.msg);
				}
			})
		},
		deletePlate(){
			this.$confirm('此操作将会删除所属的所有帖子和分区，且不可撤销，是否继续','警告',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'warning'
			}).then(()=>{
				this.axios({
					url:apiHost+'/admin/deletePlate?plate_id='+this.modifyPlateData.id,
					method:'post'
				}).then(res=>{
					if(res.data.code==200){
						this.$router.replace('/empty')
						//this.getPlateData();
						//this.modifyPlateDialog=false;
						this.$notify({'title':'删除板块成功',type:"success"});
					}else{
						this.$notify.error('删除板块失败');
					}
				})
			})
		},
		deleteDistrict(){
			this.$confirm('此操作将会删除所属的所有帖子，且不可撤销，是否继续','警告',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'warning'
			}).then(()=>{
				this.axios({
					url:apiHost+'/admin/deleteDistricts?id='+this.modifyDistrictData.id,
					method:'post'
				}).then(res=>{
					if(res.data.code==200){
						this.$router.replace('/empty')
						// this.getPlateData();
						// this.modifyDistrictDialog=false;
						this.$notify({'title':'删除分区成功',type:"success"});
					}else{
						this.$notify.error('删除分区失败');
					}
				})
			})
		},
		modifyPlate(){
			if(this.modifyPlateData.plate_name.trim().length>0){
				this.axios({
					url:apiHost+'/admin/updatePlates?name='+this.modifyPlateData.plate_name+"&id="+this.modifyPlateData.id,
					method:'post'
				}).then(res=>{
					if(res.data.code==200){
						this.$notify({'title':'修改板块成功',type:"success"});
						//this.getPlateData();
						this.$router.replace('/empty')
					}else{
						this.$notify.error('修改板块失败');
					}
				})
			}
		},
		modifyDistrict(){
			if(this.modifyDistrictData.district_name.trim().length>0){
				this.axios({
					url:apiHost+'/admin/updateDistricts?',
					method:'post',
					data:{'district_name':this.modifyDistrictData.district_name,
							'id':this.modifyDistrictData.id,
							'plate_id':this.modifyDistrictData.plate_id}
				}).then(res=>{
					if(res.data.code==200){
						this.$notify({'title':'修改分区成功',type:"success"});
						//this.getPlateData();
						this.$router.replace('/empty')
					}else{
						this.$notify.error('修改分区失败');
					}
				})
			}
		},
		init(){
			let charts=echarts.init(document.getElementById('plateChart'));
			let option={
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [
						{
							type: 'tree',
							top: '1%',
							left: '7%',
							bottom: '1%',
							right: '20%',
							symbol:'circle',
							symbolSize: 15,
							label: {
								color:'#455A64',
								fontSize:'14',
								position: 'right',
							},
							itemStyle:{
								color:'#2196F3',
								borderColor:'none'
							},
							leaves: {
								itemStyle:{
									color:'#FF5252',
									borderColor:'none'
								},
							},
							expandAndCollapse:false
						}
					]
				}
			charts.setOption(option);
			charts.on('click',params=>{
				if(params.data.type=='plate'){
					this.modifyPlateDialog=true;
					this.modifyPlateData.plate_name=params.data.name;
					this.modifyPlateData.id=params.data.id;
					this.getModerator();
				}
				else if(params.data.type=='district'){
					this.modifyDistrictDialog=true;
					this.modifyDistrictData.district_name=params.data.name;
					this.modifyDistrictData.id=params.data.id;
					this.modifyDistrictData.plate_id=params.data.plate_id;
					this.getDistrictModerator();
				}
				else if(params.data.type=='addPlate'){
					this.addPlateDialog=true;
				}
				else if(params.data.type=='addDist'){
					this.addDistrictDialog=true;
					this.addDistrictData.plate_id=params.data.plate_id;
				}
			})
			this.plateChart=charts;
		},
	}
}
</script>
<style>
</style>
