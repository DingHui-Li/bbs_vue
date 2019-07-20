<template>
    <el-row type="flex" justify="center" :gutter="20" style="padding:0;">
        <el-col :lg='14'  :md='18' :xs='24' style="padding-top:40px;" id="personCard">
			<div v-if="!isModify" class="animated fadeIn" style="animation-duration:1s">
				<el-card style="padding:10px 0;box-shadow:none" >
					<el-col :span="8" id="avatar" :xs="24" align="center">
						<el-image  :src="geturl(userInfo.icon)"  style="width:200px;height:200px;border-radius:50%" fit="cover" v-if="userInfo.icon!=undefined">
							<div slot="placeholder" class="image-slot" align="center">
								<li class="el-icon-loading"></li>
							</div>
						</el-image>
					</el-col>
					<el-col :span="16" :xs="24" style="padding:0 30px;margin:10px 0" >
						<div>
							<div style="float:left;font-weight:bold;">
								<span style="font-size:1.4rem;">{{userInfo.nick_name}}</span>
								<span style="margin-left:50px;font-size:0.9rem">ID:{{this.userID}}</span>
							</div>
							
							<div style="float:right" v-if="isme">
								<i class="fa fa-cog" aria-hidden="true" @click="isModify=true"></i>
							</div>
							<div style="float:right;margin-left:60px" v-else>
								<el-button type="primary" @click="follow()" v-if="!isFollowed" class="followBtn">关注</el-button>
								<el-button @click="follow()" v-else class="followBtn">已关注</el-button>
							</div>
						</div>
						<div style="padding-top:10px;clear:both">
							<span>{{userInfo.motto}}</span>
						</div>
						<div id="infoTable" style="margin-top:20px">
							<table style="font-weight:bold">
									<tr style="color:#757575;">
										<td>关注</td>
										<td>粉丝</td>
										<td>获赞</td>
									</tr>
								<tr>
									<td @click="followDialog=true">{{userInfo.follow_num}}</td>
									<td @click="fansDialog=true">{{userInfo.fans_num}}</td>
									<td>{{userInfo.like_num}}</td>
								</tr>
							</table>
						</div>
					</el-col>
				</el-card>
				<el-tabs stretch>
					<el-tab-pane label="帖子">
						<el-col v-for="post in postData" :key="'post'+post.id">
							<ezpost :data="post" :isme="isme" @deletePost="deletePost"></ezpost>
						</el-col>
					</el-tab-pane>
					<el-tab-pane label="收藏">
						<el-col v-for="post in markData" :key="'mark'+post.post_title_id">
							<post-horizontal :data="post" :isme="isme" type="mark"></post-horizontal>
						</el-col>
					</el-tab-pane>
				</el-tabs>
			</div>
			<div v-else>
				<modifyInfo @back="back"/>
			</div>
        </el-col>
		<el-dialog title="关注列表" :visible.sync="followDialog">
			<followList :userID="userID" @refresh="refresh" type="follow"/>
		</el-dialog>
		<el-dialog title="粉丝列表" :visible.sync="fansDialog">
			<followList :userID="userID" @refresh="refresh" type="fans"/>
		</el-dialog>
		<fab />
    </el-row>
</template>
<script>
import post from '../components/post'
import ezpost from '../components/ezpost'
import post_horizontal from '../components/post_horizontal'
import modifyInfo from '../components/modifyInfo'
import followList from '../components/followList'
import fab from '../components/fab'
import { apiHost,imgHost } from '../../../../apiConfig';
export default {
	components:{fab,post,ezpost,'post-horizontal':post_horizontal,modifyInfo,followList},
    data(){
		return{
			postData:[],
			markData:[],
			tableData:[
				{'follow':12,'fans':23,'like':'55'}
			],
			userID:this.$route.params.id,
			userInfo:{
				'icon':localStorage['userIcon']
			},
			isme:false,
			isModify:false,
			isFollowed:false,
			followDialog:false,
			fansDialog:false
		}
	},
	mounted(){
		this.checkIsMe();
		this.getData();
		this.getMark();
		this.getPost();
	},
	updated(){
		this.checkIsMe();
	},
	methods:{
		geturl(url){
			return imgHost+url;
		},
		back(){
			this.isModify=false;
		},
		refresh(id){
			this.$router.replace(`/person/${id}`);
			this.$router.replace('/empty');
		},
		getData(){
			let loading=this.$loading({
                    fullscreen:false,
                    target:personCard,
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading'
            });
			this.axios({
				url:apiHost+"/userInfo/baseInfo?id="+this.userID,
				method:'post'
			}).then(res=>{
				loading.close();
				//console.log(res)
				if(res.data.code==200){
					this.userInfo=res.data.userInfo;
					this.isFollowed=res.data.isFollowed;
					this.userID=this.userInfo.user_id;
				}
			})
		},
		getMark(){
			this.axios({
				url:apiHost+'/userInfo/UserCollection?id='+this.userID,
				method:'post'
			}).then(res=>{
				//console.log(res)
				if(res.data.code==200){
					this.markData=res.data.collection;
				}
			})
		},
		getPost(){
			this.axios({
				url:apiHost+'/userInfo/userPostTitles?id='+this.userID,
				method:'post'
			}).then(res=>{
				if(res.data.code==200){
					this.postData=res.data.recentPost;
				}
			})
		},
		checkIsMe(){
			if(localStorage['info'].length==0){
				this.isme=false;
			}
			else if(this.userID==JSON.parse(localStorage['info']).id){
				this.isme=true;
			}else{
				this.isme=false;
			}
		},
		deletePost(id){
			for(let i=0;i<this.postData.length;i++){
				if(this.postData[i].id==id){
					this.postData.splice(i,1);
				}
			}
		},
		follow(){
			let loading=this.$loading({
                    fullscreen:false,
                    target:document.getElementsByClassName('followBtn')[0],
                    lock: true,
                    text: '',
                    spinner: 'el-icon-loading'
            });
			this.axios({
				url:apiHost+'/userInfo/followed?follow_id='+this.userID,
				method:'get'
			}).then(res=>{
				loading.close();
				if(res.data.code==200){
					if(this.isFollowed){
						this.isFollowed=false;
					}else{
						this.isFollowed=true;
					}
				}
			})
		}

	},
	watch:{
		$route:function(to,form){
            if(to!=form){
				this.userID=this.$route.params.id;
				this.getData();
				this.getMark();
				this.getPost();
				
            }
        }
	}
}
</script>
<style>
	#infoTable td {
		padding:0 20px 10px 0;
		cursor:pointer
	}
</style>