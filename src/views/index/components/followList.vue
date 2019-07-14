<template>
	<div>
		<div v-for="item in listData" :key="item.user_id" class="followAndFans" @click="goPerson(item.user_id)">
			<div style="width:50px;height:40px;float:left">
				<el-image :src="geturl(item.icon)" style="width:40px;height:40px;border-radius:50%"></el-image>
			</div>
			<div style="padding-top:3px;">
				<div style="color:#757575;font-weight:bold">{{item.nick_name}}</div>
				<div style="color:#757575;font-size:0.9rem">{{item.motto}}</div>
			</div>
		</div>
	</div>	
</template>
<script>
import { apiHost, imgHost } from '../../../../apiConfig';
export default {
	name:'followList',
	props:['userID','type'],
	data(){
		return{
			listData:[]
		}
	},
	mounted(){
		this.getData();
	},
	updated(){
		console.log(this.userID)
	},
	methods:{
		geturl(url){
			return imgHost+url;
		},
		getData(){
			let url=apiHost+'/userInfo/getFollowList?user_id='+this.userID;
			if(this.type=='fans') url=apiHost+'/userInfo/getFansList?user_id='+this.userID;
			this.axios({
				url:url,
				method:'get'
			}).then(res=>{
				if(res.data.code==200){
					this.listData=res.data.ls;
				}
			})
		},
		goPerson(id){
			this.$emit('refresh',id);
		}
	}
}
</script>
<style>
	.followAndFans{
		clear:both;
		height:60px;
		padding-top:20px;
		border-bottom:1px solid #e0e0e0;
		cursor:pointer;
	}
</style>
