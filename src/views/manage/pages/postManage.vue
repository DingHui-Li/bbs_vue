<template>
	<el-row type="flex" justify="center" :gutter="10" class="animated fadeInDown">
		<el-col v-if="!isContent">
			<el-col :xs="24" :lg="12" style="padding:0">
				<!-- 只能选择分区 -->
				<el-cascader :options="plateData"  @change="screenChange" v-if="role>=2&&role<4" v-model="screenDistrict"
					:props="{expandTrigger: 'hover' }">
				</el-cascader>
				<!-- 选择板块和分区 -->
				<el-cascader :options="plates"  @change="screenPlateChange" v-if="role==4" clearable v-model="screenPlate"
					:props="{expandTrigger: 'hover' }">
				</el-cascader>
			</el-col>
			<el-col :xs="24" :lg="12" style="padding:0px;margin-bottom:20px">
				<el-input placeholder="输入关键字以搜索" clearable v-model="serarchKey">
					<template slot="append">
						<el-dropdown split-button  @command="changeSearchType">
							<span>
								搜索：{{searchTypeName}}
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="PostTitleInfo.id">ID</el-dropdown-item>
								<el-dropdown-item command="title">标题</el-dropdown-item>
								<el-dropdown-item command="content">内容</el-dropdown-item>
								<el-dropdown-item command="nick_name">用户昵称</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-input>
			</el-col>
			<el-col :xs="24" :lg="12" style="padding:10px">
				<el-button type="primary" :style="{display:deleteBtn}" @click="deletePost">删除</el-button>
			</el-col>
			<el-table :data='postData' stripe  ref="multipleTable" @select="select" id="postTable" @select-all="select"
					element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
				<el-table-column type="selection"></el-table-column>
				<el-table-column prop="id" label="ID"  align="center" width="50px"></el-table-column>
				<el-table-column prop="title" label="标题"  align="center" width="200px">
					<template slot-scope="scope">
						<u @click="selectPostid=scope.row.id;isContent=true" style="cursor:pointer;color:#2196F3">{{scope.row.title}}</u>
					</template>
				</el-table-column>
				<el-table-column label="用户" width="200px">
					<template slot-scope="scope">
						<div style="float:left;width:35px">
							<el-image :src="geturl(scope.row.icon)" style="height:30px;width:30px;border-radius:50%"></el-image>
						</div>
						<div style="float:left">
							<span style="line-height:30px;font-weight:bold;color:#757575">{{scope.row.nick_name}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="view_num" label="浏览量" align="center"></el-table-column>
				<el-table-column prop="like_num" label="点赞量"  align="center"></el-table-column>
				<el-table-column prop="recommend_num" label="收藏量"  align="center"></el-table-column>
				<el-table-column prop="reply_num" label="评论数"  align="center"></el-table-column>
				<el-table-column label="帖子状态"  align="center" width="120px">
					<template slot-scope="scope">
						<el-select v-model="scope.row.state" @change="stateChange($event,scope.row.id)">
							<el-option label="正常" value="1"></el-option>
							<el-option label="精品" value="4"></el-option>
							<el-option label="置顶" value="5"></el-option>
							<el-option label="加精置顶" value="6"></el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="分区" width="150px">
					<template slot-scope="scope">
						<el-cascader placeholder="请选择分区"
                            :options="plates" 
                            :value="[scope.row.plate_id,scope.row.plate_id+'-'+scope.row.districtInfo_id]"
                            @change="selectPlate($event,scope.row.id)"  :props="{ expandTrigger: 'hover' }">
						</el-cascader>
					</template>
				</el-table-column>
				<el-table-column label="发帖时间"  align="center">
					<template slot-scope="scope">
						<span style="font-size:0.7rem">{{dateFormat(scope.row.post_time)}}</span>
					</template>
				</el-table-column>
			</el-table>
			<el-col align="center">
				<el-pagination
					background @current-change="pageChange"
					layout="prev, pager, next"
					:page-count="allPageNum">
				</el-pagination>
			</el-col>
		</el-col>
		<el-col v-else class="animated fadeIn">
			<el-card id="contentCard">
				<div slot="header" style="cursor:pointer">
					<i class="fa fa-chevron-left" aria-hidden="true" @click="isContent=false"> 返回</i>
				</div>
				<div style="font-weight:bold;color:#757575;">{{contentData.title}}</div>
				<el-scrollbar style="margin-top:20px">
					<div v-html="contentData.content" ></div>
				</el-scrollbar>
			</el-card>
			<div></div>
		</el-col>
	</el-row>	
</template>
<script>
import { apiHost, imgHost } from '../../../../apiConfig';
import { setTimeout } from 'timers';
export default {
	props:['role'],
	data(){
		return{
			postData:[],//帖子数据
			plateData:[],//分区数据
			screenPlate:-1,//选中的板块--管理员
			screenDistrict:-1,//选中的分区--版主
			plates:[],
			selectedPlate:['1','1-1'],
			serarchKey:'',//搜索关键字
			searchType:'PostTitleInfo.id',//搜索类型
			searchTypeName:'ID',//搜索类型名称
			selected:[],//选中的id
			deleteBtn:'none',//delete按钮显示状态
			allPageNum:1,//总页数
			pageNum:1,//当前页数
			isContent:false,//内容页
			selectPostid:-1,//选中的帖子id，用于获取内容
			contentData:[],
		}
	},
	mounted(){
		if(this.role==4){
			this.getData();
		}
		else{
			this.getDis();
		}
		this.getPlates();
	},
	computed:{
		
	},
	methods:{
		checkSession(){
            this.axios({
                url:apiHost+'/checkSession',
                method:'post',
            }).then(res=>{
                if(res.data.code!=200){
					localStorage['userInfo']="{}";
					this.$message.error('未登录');
					this.role=-1;
					window.open('/',"_self");
				}else{
					this.role=res.data.data.roleInfos[0].id;
				}
            })
        },
		geturl(url){
			return imgHost+url;
		},
		getData(){
			let loading=this.$loading({
				lock: true,
				target:document.getElementById('postTable'),
				text: 'Loading',
				spinner: 'el-icon-loading',
			});
			this.axios({
                url:apiHost+'/anon/post/getIndexPostTitles?size=10&page='+this.pageNum,
                method:'get'
            }).then(res=>{
				loading.close();
				this.loading=false;
                if(res.data.code==200){
					this.postData=res.data.PostTitleList;
					this.allPageNum=Math.ceil(res.data.num/10);
                }else{
					this.$message.error('数据获取错误')
				}
				
            })
		},
		getPlateOrDistPost(){
			this.axios({
				url:apiHost+'/admin/getPostTitlesByDis?size=10&district_id='+this.screenDistrict+"&page="+this.pageNum,
				method:'get',
			}).then(res=>{
				console.log(res)
				if(res.data.code==200){
					this.postData=res.data.data.list;
					this.allPageNum=Math.ceil(res.data.data.total/10);
				}else{
					this.$notify.error(res.data.msg)
				}
			})
		},
		getContent(){
			this.axios({
                url:apiHost+'/anon/post/getPostTitleContent?id='+this.selectPostid,
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                    this.contentData=res.data.Content;
                }
                console.log(this.contentData)
            })
		},
		changeSearchType(command){
			if(command=='PostTitleInfo.id') this.searchTypeName="ID"
			else if(command=='title') this.searchTypeName="标题"
			else if(command=='content') this.searchTypeName="内容"
			else if(command=='nick_name') this.searchTypeName="用户昵称";
			this.searchType=command;
			this.search();
		},
		stateChange(state,id){
			this.axios({
				url:apiHost+'/admin/changePostState?colum_name=state&post_id='+id+'&state='+state ,
				method:'post'
			}).then(res=>{
				if(res.data.code==200){
					this.$notify({
						title:'修改成功',
						type:'success'
					})
				}else{
					this.$notify.error(res.data.msg)
				}
			})
		},
		selectPlate(value,id){
			let temp=value[1].split('-');
            let districtId=temp[1];
			this.axios({
				url:apiHost+'/admin/changePostDis?colum_name=districtInfo_id&post_id='+id+'&dis_id='+districtId,
				method:'post',
			}).then(res=>{
				if(res.data.code==200){
					this.$notify({
						title:'修改成功',
						type:'success'
					})
				}else{
					this.$notify.error('修改失败')
				}
			})
		},
		getDis(){//获取分区版主和版主管理的分区
            this.axios({
                url:apiHost+"/admin/getDis",
                method:"get"
            }).then(res=>{
                if(res.data.code==200){
                    this.plateData=res.data.data.map(plate=>{
                        return {'value':plate.id,'label':plate.district_name}
					})
					this.screenDistrict=this.plateData[0].value;
				}
            })
		},

		getPlates(){
            this.axios({
                url:apiHost+"/anon/plate/getPlates",
                method:"get"
            }).then(res=>{
                if(res!=undefined){
                    this.plates=res.data.map(plate=>{
                        let children=plate.districtInfos.map(district=>{
                            return {'value':district.plate_id+'-'+district.id,'label':district.district_name};
                        })
                        return {'value':plate.id,'label':plate.plate_name,'children':children}
                    })
				}
            })
		},
		search(){
			let loading=this.$loading({
				lock: true,
				target:postTable,
				text: 'Loading',
				spinner: 'el-icon-loading',
			});
			if(this.serarchKey.trim().length>0){
				this.axios({
					url:apiHost+'/admin/searchByColum?size=10&&colum_name='+this.searchType+'&s='+this.serarchKey+"&page="+this.pageNum,
					method:'get'
				}).then(res=>{
					loading.close();
					if(res.data.code==200){
						this.postData=res.data.ls;
						this.allPageNum=Math.ceil(res.data.num/10);
					}
				})
			}
		},
		select(){
			this.selected=this.$refs.multipleTable.selection.map(item=>{
				return {'id':item.id}
			});
		},
		deletePost(){
			if(this.selected.length>0){
				this.axios({
					url:apiHost+'/admin/deletePosts',
					method:'post',
					data:this.selected
				}).then(res=>{
					if(res.data.code==200){
						this.selected=[];
						this.$notify({
							title:'删除成功',
							type:'success'
						})
					}
					else{
						this.$message.error(res.data.msg);
					}
				})
			}
		},
		pageChange(page){
			console.log(this.screenPlate+","+this.screenDistrict)
			this.pageNum=page;
			if(this.serarchKey!=''){
				this.search();
			}
			else if(this.screenPlate!=-1||this.screenDistrict!=-1){
				this.getPlateOrDistPost();
			}
			else{
				this.getData();
			}
		},
		screenChange(value){
			this.screenDistrict=value;
			this.pageNum=1;
		},
		screenPlateChange(value){
			if(value!=""){
				let temp=value[1].split('-');
				this.screenDistrict=temp[1];
				this.pageNum=1;
			}
		},
		dateFormat(date){
			let d=new Date(date);
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        },
	},
	watch:{
		serarchKey:function(newVal,oldVal){
			if(newVal!=oldVal){
				this.loading=true;
				if(newVal.trim().length==0){
					if(this.role==4){
						this.getData();
					}
					else{
						this.getPlateOrDistPost();
					}
				}
				else{
					setTimeout(()=>{
						this.search();
					},1000)
				}
			}
		},
		selected:function(newVal,oldVal){
			if(newVal.length>0){
				this.deleteBtn='block';
			}else{
				this.deleteBtn='none';
			}
		},
		selectPostid:function(newVal,oldVal){
			this.getContent();
		},
		screenDistrict:function(newVal,oldVal){
			this.getPlateOrDistPost();
		},
		screenPlate:function(newVal,oldVal){
			if(newVal.length==0){
				this.screenPlate=-1;
				this.getData();
			}
		}
	},
}
</script>
<style>
	#contentCard .el-scrollbar{
		height:80vh;
	}
</style>
