<template>
	<!-- 消息中心页面的‘回复我的’组件 -->
	<el-card id="commentCard">
		<div slot="header" style="font-size:1.2rem;color:#757575;font-weight:bold">回复我的</div>
		<el-scrollbar>
			<div style="padding:10px 20px" v-for="(msg,index) in data" :key="'comment2me'+index">
				<div style="width:35px;float:left"  @click="$router.push(`/person/${msg.userBaseInfo.user_id}`)">
					<el-image :src="geturl(msg.userBaseInfo.icon)" style="width:35px;height:35px;border-radius:50%"></el-image>
				</div>
				<div style="margin-top:10px;padding-left:45px">
					<div style="font-weight:bold;color:#757575" @click="$router.push(`/person/${msg.userBaseInfo.user_id}`)">{{msg.userBaseInfo.nick_name}}
						<!-- <span style="float:right"><i class="fa fa-trash-o" aria-hidden="true"></i></span> -->
					</div>
					<div style="color:#757575;font-size:0.8rem;margin:10px 0">{{dateFormat(msg.send_time)}}</div>
					<div style="font-weight:bold;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;" v-html="msg.content" @click="$router.push(`/content/${msg.postTitleInfo.id}`)"></div>
					<div style="color:#757575;font-size:0.9rem;margin:5px 0;padding:10px;background-color:rgba(96,125,139,0.3);border-radius:5px"
							@click="$router.push(`/content/${msg.postTitleInfo.id}`)">
						{{msg.postTitleInfo.title}}
					</div>
				</div>
				<el-divider></el-divider>
			</div>
		</el-scrollbar>
	</el-card>
</template>
<script>
import { apiHost, imgHost } from '../../../../apiConfig';
export default {
	name:'comment2me',
	data(){
		return{
			data:'',
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
				url:apiHost+'/message/getMessage?type=11&page=1&size=20',
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
