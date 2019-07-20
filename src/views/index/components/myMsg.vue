<template>
	<!-- 消息中心页面的‘我的消息’组件 -->
	<el-card style="min-height:50vh;" id="msgCard">
		<el-container>
			<el-aside style="overflow:hidden">
				<div style="font-size:1.2rem;color:#757575;font-weight:bold;padding:20px;background-color:rgba(189,189,189,.3);border-bottom:1px solid #ccc">我的消息</div>
				<el-scrollbar>
					<div v-for="(i,index) in 9" :key="i" style="padding:10px 20px;background-color:rgba(189,189,189,.3);cursor:pointer" id="msgItem" 
						:style="{filter:selectItem==index?'brightness(0.7)':''}" @click="selectItem=index">
						<div style="float:left">
							<el-avatar src="http://static.simpledesktops.com/uploads/desktops/2014/03/12/Frutas.png" :size="40"></el-avatar>
						</div>
						<div style="margin-left:50px;">
							<div style="font-size:0.9rem;font-weight:bold;">昵称</div>
							<div style="color:#757575;font-size:0.7rem;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">最新一条消息xxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
						</div>
						<div style="clear:both"></div>
					</div>
				</el-scrollbar>
			</el-aside>
			<el-main style="padding:0;height:60vh">
				<div style="font-size:1.2rem;color:#757575;font-weight:bold;padding:20px">昵称</div>
				<div id="sendArea">
					<el-scrollbar>
							<message :isme="false"/>
							<message :isme="true"/>	
							<message :isme="false"/>
							<message :isme="true"/>	
							<message :isme="false"/>
							<message :isme="true"/>	
					</el-scrollbar>
					<div align="right">
						<el-input ></el-input>
						<el-button style="margin:10px">发送</el-button>
					</div>
				</div>
			</el-main>
		</el-container>
	</el-card>
</template>
<script>
import message from './message'
export default {
	components:{message},
	name:'myMsg',
	data(){
		return{
			selectItem:0,
		}
	},
	mounted(){
		
	},
	methods:{

	},
	watch:{
		type:function(newVal,oldVal){
			if(newVal!=oldVal){
				this.$emit('changeBadgeType',newVal);
			}
		}
	}
}
</script>
<style>
	#msgCard .el-scrollbar{
		height:60vh;
	}
	#msgItem:hover{
		filter: brightness(0.8)
	}
	#sendArea .el-input__inner{
		border:none;
		border-top:1px solid #ccc;
		border-radius:0
	}
	#sendArea .el-scrollbar{
		height:80%
	}
</style>
