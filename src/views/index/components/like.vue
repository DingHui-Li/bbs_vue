<template>
	<!-- 消息中心页面的‘收到的赞’组件 -->
	<el-card id="commentCard">
		<div slot="header" style="font-size:1.2rem;color:#757575;font-weight:bold">系统通知</div>
		<el-scrollbar>
			<div style="padding:10px 20px" v-for="(message,index) in data" :key="'systemMsg'+index">
				<div style="width:40px;float:left;cursor:pointer"  @click="$router.push(`/person/${message.userBaseInfo.user_id}`)">
					<el-avatar :src="geturl(message.userBaseInfo.icon)" :size="40"></el-avatar>
				</div>
				<div style="margin-top:10px;padding-left:45px">
					<div style="font-weight:bold;color:#757575;cursor:pointer" @click="$router.push(`/person/${message.userBaseInfo.user_id}`)">{{message.userBaseInfo.nick_name}}</div>
					<div style="color:#757575;font-size:0.8rem;margin:10px 0">{{dateFormat(message.send_time)}}</div>
					<div style="font-weight:bold;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;cursor:pointer" @click="$router.push(`/content/${message.postTItleId}`)">
						{{message.content}}
					</div>
					<!-- <div style="color:#757575;font-size:0.9rem;margin:5px 0;padding:10px;background-color:rgba(96,125,139,0.3);border-radius:5px">
						这里是帖子标题
					</div> -->
				</div>
				<el-divider></el-divider>
			</div>
		</el-scrollbar>
	</el-card>
</template>
<script>
import { apiHost, imgHost } from '../../../../apiConfig';
export default {
	name:'like',
	data(){
		return{
			data:[]
		}
	},
	mounted(){
		this.getData();
	},
	methods:{
		geturl(url){
			return imgHost+url;
		},
		getData(){
			this.axios({
				url:apiHost+'/message/getMessage?type=9&page=1&size=20',
				method:'get'
			}).then(res=>{
				console.log(res)
				if(res.data.code==200){
					this.data=res.data.data;
				}
			})
		},
		dateFormat(date){
			let d=new Date(date);
			return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
        },
	}
}
</script>
<style>
	#commentCard .el-scrollbar{
		height:80vh;
	}
</style>
