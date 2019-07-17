<template>
	<el-row type="flex" justify="center" :gutter="10">
		<el-col>
			<el-col :lg="12" :xs="24">
				<el-cascader :options="plateData"  @change="screenChange" clearable v-model="screenSelect" 
					:props="{checkStrictly: true,expandTrigger: 'hover' }">
				</el-cascader>
			</el-col>
			<el-col :lg="12" :xs="24">
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
						<span v-if="scope.row.plate_id!=-1">
							{{scope.row.plate_name}}
						</span>
						<span v-else-if="scope.row.district_id!=-1">
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
				<el-button style="" type="primary">发布到</el-button>
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
	data(){
		return{
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
		this.getData();
		this.getPlateData();
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
				}
			})
		},
		getPlateData(){
            this.axios({
                url:apiHost+"/anon/plate/getPlates",
                method:"get"
            }).then(res=>{
                if(res!=undefined){
                    this.plateData=res.data.map(plate=>{
                        let children=plate.districtInfos.map(district=>{
                            return {'value':district.plate_id+'-'+district.id,'label':district.district_name};
                        })
                        return {'value':plate.id,'label':plate.plate_name,'children':children}
					})
					this.plateData.unshift({'label':'全站公告',value:'-1'});
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
		publishChange(value){

		},
		select(){
			this.selected=this.$refs.multipleTable.selection.map(item=>{
				return {'id':item.id}
			});
			console.log(this.selected)
		},
		deleteNotic(){
			if(this.selected.length>0){
				this.axios({
					url:apiHost+'/admin/deleteAnnouncement'
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
				this.getData();
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
