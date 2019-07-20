<template>
	<el-row type="flex" justify="center" :gutter="10">
		<el-col>
			<el-col :lg="12" :xs="24" style="padding:0;margin-bottom:20px">
				<el-cascader :options="plateData"  @change="screenChange" clearable v-model="screenSelect" v-if="role>2"
					:props="{checkStrictly: true,expandTrigger: 'hover' }">
				</el-cascader>
				<el-cascader :options="plateData"  @change="screenDisChange" v-model="screenSelect" v-else
					:props="{checkStrictly: true,expandTrigger: 'hover' }">
				</el-cascader>
			</el-col>
			<el-col :lg="12" :xs="24" style="padding:0;margin:10px 0">
				<el-button style="width:100%" type="primary" @click="addNoticDialog=true">发布公告</el-button>
			</el-col>
			<el-button :style="{display:deleteBtnDisplay,marginTop:'20px'}" @click="deleteNotic" type="primary">删除</el-button>
			<el-table :data="noticeData"  ref="multipleTable" @select="select" @select-all="select">
				<el-table-column type="selection"></el-table-column>
				<el-table-column type="expand">
					<template slot-scope="scope">
						<el-form>
							<el-form-item label="内容:">
								<span style="color:#757575;font-weight:bold">{{scope.row.content}}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="id" label="ID"></el-table-column>
				<el-table-column prop="title" label="标题"></el-table-column>
				<el-table-column label="类型">
					<template slot-scope="scope">
						<span v-if="scope.row.plate_id!=0">
							{{scope.row.plate_name}}
						</span>
						<span v-else-if="scope.row.district_id!=0">
							{{scope.row.plate_name}}/{{scope.row.district_name}}
						</span>
						<span v-else>全站</span>
					</template>
				</el-table-column>
				<el-table-column label="用户">
					<template slot-scope="scope">
						<div style="width:35px;float:left">
							<el-image :src="geturl(scope.row.userBaseInfo.icon)" style="width:30px;height:30px;border-radius:50%"></el-image>
						</div>
						<div style="line-height:30px">
							{{scope.row.userBaseInfo.nick_name}}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="发布时间">
					<template slot-scope="scope">
						<span>{{dateFormat(scope.row.post_time)}}</span>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
		<el-dialog :visible.sync='addNoticDialog' title="发布新公告">
			<el-form>
				<el-form-item label="标题">
					<el-input type="text" v-model="newNotice.title" :maxLength="30"  show-word-limit></el-input>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" v-model="newNotice.content" :autosize="{ minRows: 2, maxRows: 4}" show-word-limit></el-input>
				</el-form-item>
			</el-form>
			<div align="right">
				<el-button style="" type="primary" @click="publish">发布到</el-button>
				<el-cascader :options="plateData"  @change="publishChange" 
					:props="{checkStrictly: true,expandTrigger: 'hover' }">
				</el-cascader>
			</div>
		
		</el-dialog>
	</el-row>	
</template>
<script>
import { apiHost, imgHost } from '../../../../apiConfig';
export default {
	props:['role'],
	data(){
		return{
			userInfo:JSON.parse(localStorage['userInfo']),
			screenSelect:'',//用于监听清空事件
			plateData:[],
			noticeData:[],
			screen:{
				plate:-1,
				district:-1,
			},
			selected:[],//选中的公告
			deleteBtnDisplay:'none',
			addNoticDialog:false,
			newNotice:{
				title:'',
				content:'',
				district:-1,
				plate:-1
			}
		}
	},
	mounted(){
		if(this.role!=-1){
			if(this.role>2){
				this.getPlateData();
			}else{
				this.getDistrict();
			}
			if(this.role==4){
				this.getData();
			}
		}
	},
	methods:{
		geturl(url){
			return imgHost+url;
		},
		getData(){
			this.axios({
				url:apiHost+'/admin/getAnnouncements?page=1&size=20',
				method:'get'
			}).then(res=>{
				if(res.data.code==200){
					this.noticeData=res.data.data;
					console.log(res.data)
				}else{
					this.$message.error(res.data.msg)
				}
			})
		},
		getNotice(plate_id,district_id){
			this.axios({
				url:apiHost+'/admin/getAnnByDis?plate_id='+plate_id+"&district_id="+district_id+"&page=1&size=10",
				method:'get'
			}).then(res=>{
				if(res.data.code==200){
					this.noticeData=res.data.data;
				}
			})
		},
		getPlateData(){
            this.axios({
                url:apiHost+"/admin/getPlates",
                method:"get"
            }).then(res=>{
                if(res.data.code==200){
                    this.plateData=res.data.data.map(plate=>{
                        let children=plate.districtInfos.map(district=>{
                            return {'value':district.plate_id+'-'+district.id,'label':district.district_name};
                        })
                        return {'value':plate.id,'label':plate.plate_name,'children':children}
					})
					if(this.role==4){
						this.plateData.unshift({'label':'全站公告',value:'-1'});
					}
                }
            })
		},
		getDistrict(){
			this.axios({
				url:apiHost+'/admin/getDis',
				method:'get'
			}).then(res=>{
				if(res.data.code==200){
                    this.plateData=res.data.data.map(plate=>{
                        return {'value':plate.id,'label':plate.district_name}
					})
					this.getNotice(0,this.plateData[0].value);
				}
			})
		},
		screenChange(value){
			let url='';
			if(value[0]!=undefined&&value[0]!=-1){
				this.screen.plate=value[0];
				if(value[1]!=undefined){//查询分区
					let temp=value[1].split('-');
					this.screen.district=temp[1];
					url='/admin/searchAnnByDis?page=1&size=20&dis_id='+this.screen.district;
				}else{//查询板块
					url='/admin/searchAnnByPlate?page=1&size=20&plate_id='+this.screen.plate;
				}
			}else if(value[0]==-1){
				url='/admin/searchAnn?page=1&size=20'
			}
			this.axios({
				url:apiHost+url,
				method:'post',
			}).then(res=>{
				if(res.data.code==200){
					this.noticeData=res.data.data;
					console.log(res)
				}
			})
		},
		screenDisChange(value){
			this.getNotice(0,value);
		},
		publishChange(value){
			if(this.role>2){//管理员和版主
				if(value[0]!=undefined&&value[0]!=-1&&value[1]!=undefined){//只选择了分区
					this.newNotice.plate=0;
					let temp=value[1].split('-');
					this.newNotice.district=temp[1];
				}else if(value[0]==-1){
					this.newNotice.plate=0;
					this.newNotice.district=0;
				}else{
					this.newNotice.plate=value[0];
					this.newNotice.district=0;
				}
			}else{
				this.newNotice.plate=0;
				this.newNotice.district=value[0];
			}
		},
		publish(){
			console.log(this.newNotice)
			if(this.newNotice.plate!=-1&&this.newNotice.district!=-1){
				if(this.newNotice.title.trim().length>0&&this.newNotice.content.trim().length>0){
					this.axios({
						url:apiHost+'/admin/addAnnouncement',
						data:{'plate_id':this.newNotice.plate,'district_id':this.newNotice.district,'owner':this.userInfo.id,
								'title':this.newNotice.title,'content':this.newNotice.content},
						method:'post'
					}).then(res=>{
						if(res.data.code==200){
							this.$notify({'title':'添加公告成功',type:"success"});
							this.$router.replace('/empty');
						}else{
							this.$notify.error(res.data.msg)
						}
					})
				}else{
					this.$message.error("请输入标题和内容");
				}
			}else{
				this.$message.error("请选择板块或分区");
			}
		},
		select(){
			this.selected=this.$refs.multipleTable.selection.map(item=>{
				return {'id':item.id}
			});
		},
		deleteNotic(){
			if(this.selected.length>0){
				this.axios({
					url:apiHost+'/admin/deleteAnnouncement',
					data:this.selected,
					method:'post'
				}).then(res=>{
					if(res.data.code==200){
						this.$notify({'title':'删除成功','type':'success'});
						this.$router.replace('/empty');
					}else{
						this.$notify.error('删除失败');
					}
				})
			}
		},
		dateFormat(date){
			let d=new Date(date);
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		},
	},
	watch:{
		screenSelect:function(newVal,oldVal){
			if(newVal.length==0){
				if(this.role==4){
					this.getData();
				}else{
					this.getNotice(0,this.plateData[0].value);
				}
			}
		},
		selected:function(newVal,oldVal){
			if(this.selected.length>0){
				this.deleteBtnDisplay='block';
			}else{
				this.deleteBtnDisplay="none";
			}
		}
	}
}
</script>
<style>
</style>
