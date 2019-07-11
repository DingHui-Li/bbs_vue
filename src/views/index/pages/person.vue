<template>
    <el-row type="flex" justify="center" :gutter="20" style="padding:0;">
        <el-col :lg='14'  :md='18' :xs='24' style="padding-top:40px;" id="personCard">
			<el-card style="padding:10px 0;box-shadow:none" >
				<el-col :span="8" id="avatar" :xs="24" align="center">
					<el-image  :src="geturl(userInfo.icon)"  style="width:200px;height:200px;border-radius:50%" fit="cover" >
						<div slot="placeholder" class="image-slot" align="center">
							<li class="el-icon-loading"></li>
						</div>
					</el-image>
				</el-col>
				<el-col :span="16" :xs="24" style="padding:0 30px;margin:10px 0" >
					<div >
						<span style="font-weight:bold;font-size:1.4rem">{{userInfo.nick_name}}</span>
						<el-button style="margin-left:40px">修改个人信息</el-button>
						<el-button style="margin-left:40px">修改账号信息</el-button>
						<el-button @click="$router.replace('/publish')">测试</el-button>
					</div>
					<div style="margin:10px 0">
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
								<td>{{userInfo.follow_num}}</td>
								<td>{{userInfo.fans_num}}</td>
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
						<markPost :data="post" :isme="isme" @deleteMark="deleteMark"></markPost>
					</el-col>
				</el-tab-pane>
			</el-tabs>
        </el-col>
    </el-row>
</template>
<script>
import post from '../components/post'
import ezpost from '../components/ezpost'
import markPost from '../components/markPost'
import { apiHost,imgHost } from '../../../../apiConfig';
export default {
	components:{post,ezpost,markPost},
    data(){
		return{
			postData:[],
			markData:[],
			tableData:[
				{'follow':12,'fans':23,'like':'55'}
			],
			userID:this.$route.params.id,
			userInfo:{},
			isme:false
		}
	},
	mounted(){
		this.getData();
		this.getMark();
		this.getPost();
		this.checkSession();
	},
	methods:{
		geturl(url){
			return imgHost+url;
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
				if(res.data.code==200){
					this.userInfo=res.data.userInfo;
				}
				console.log(res)
				loading.close();
			})
		},
		getMark(){
			this.axios({
				url:apiHost+'/userInfo/UserCollection?id='+this.userID,
				method:'post'
			}).then(res=>{
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
		checkSession(){
            this.axios({
                url:apiHost+'/checkSession',
                method:'post',
            }).then(res=>{
                if(res.data.code==200){ 
					if(res.data.id==localStorage['userId']&&res.data.id==this.userID) this.isme=true;
					else this.isme=false;
				}
                else this.isme=false;
            })
		},
		deletePost(id){
			for(let i=0;i<this.postData.length;i++){
				if(this.postData[i].id==id){
					this.postData.splice(i,1);
				}
			}
		},
		deleteMark(id){
			for(let i=0;i<this.markData.length;i++){
				if(this.markData[i].id==id){
					this.markData.splice(i,1);
				}
			}
		}
	},
	watch:{
		$route:function(to,form){
            if(to!=form){
				this.userID=this.$route.params.id;
				this.getData();
				this.getMark();
				this.getPost();
				this.checkSession();
            }
        }
	}
}
</script>
<style>
	#infoTable td {
		padding:0 20px 10px 0;
	}
</style>