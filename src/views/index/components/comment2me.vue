<template>
	<!-- 消息中心页面的‘回复我的’组件 -->
	<el-card id="commentCard">
		<div slot="header" style="font-size:1.2rem;color:#757575;font-weight:bold">回复我的</div>
		<el-scrollbar>
			<div style="padding:10px 20px" v-for="i in 9" :key="'focus'+i">
				<div style="width:40px;float:left">
					<el-avatar src="http://static.simpledesktops.com/uploads/desktops/2014/03/12/Frutas.png" :size="40"></el-avatar>
				</div>
				<div style="margin-top:10px;padding-left:45px">
					<div style="font-weight:bold;color:#757575">任我行
						<span style="float:right"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
					</div>
					<div style="color:#757575;font-size:0.8rem;margin:10px 0">00:00</div>
					<div style="font-weight:bold;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">我是预言家 我预言嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻</div>
					<div style="color:#757575;font-size:0.9rem;margin:5px 0;padding:10px;background-color:rgba(96,125,139,0.3);border-radius:5px">
						这里是帖子标题
					</div>
				</div>
				<el-divider></el-divider>
			</div>
		</el-scrollbar>
	</el-card>
</template>
<script>
import { apiHost } from '../../../../apiConfig';
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
	}
}
</script>
<style>
	#commentCard .el-scrollbar{
		height:80vh;
	}
</style>
