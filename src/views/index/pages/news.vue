<template>
    <el-row type="flex" justify="center" :gutter="20" id="news" >
        <el-col :lg='18' :md='20' :xs='24'>
            <el-container style="padding-top:20px">
				<el-aside style="padding-right:10px;">
					<el-card id="leftItemCard">
						<div slot="header" align="center">
							<i class="fa fa-bell-o" aria-hidden="true" style="color:#757575"></i>
							<span style="font-weight:bold;color:#757575"> 消息中心</span> 
						</div>
						<el-menu align="center">
							<el-menu-item  v-for="item in leftItem" :key="item.name" :index="item.name" >
								<i class="fa fa-circle" aria-hidden="true" style="font-size:0.5rem;color:#757575"></i>
								<span class="leftItem" style="margin-right:10px;color:#757575"> {{item.name}}</span> 
								<el-badge style="margin-left:5px" :value="item.count" :hidden="!(item.count>0)"></el-badge>
							</el-menu-item>
						</el-menu>
						<el-divider></el-divider>
						<div align="center" style="cursor:pointer;padding-bottom:20px">
							<i class="fa fa-cog" aria-hidden="true" style="color:#757575"></i>
							<span> 消息设置</span>
						</div>
					</el-card>
				</el-aside>
				<el-main style="padding:0;">
					<focus />
				</el-main>
				<el-aside style="padding-left:10px;cursor:pointer;">
					<el-card style="padding:0;" id="rightItemCard">
						<el-image src="http://static.simpledesktops.com/uploads/desktops/2014/03/12/Frutas.png" fit="cover" style="height:100px;border-radius:5px 5px 0 0"></el-image>
						<div style="margin-top:-35px;margin-left:35px;z-index:9;position:relative;width:60px;float:left">
							<el-avatar src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png" 
							:size="60"></el-avatar>
						</div>
						<span style="font-weight:bold;margin-left:10px;color:#757575">任我行</span>
						<div style="clear:both;margin:20px 0" align="center">
							<table id="infoTable">
								<tr>
									<td>1.1w</td>
									<td>4.2w</td>
									<td>9999+</td>
								</tr>
								<tr>
									<td>关注</td>
									<td>粉丝</td>
									<td>帖子</td>
								</tr>
							</table>
						</div>
					</el-card>
					<el-card style="margin-top:20px" id="friendCard">
						<div slot="header" style="color:#757575">我的好友(20)</div>
						<el-scrollbar>
							<div style="padding:10px 20px" v-for="i in 20" :key="i">
								<div style="width:40px;float:left">
									<el-avatar src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png" :size="40"></el-avatar>
								</div>
								<div style="padding-left:50px;margin-top:3px;">
									<div style="font-size:0.9rem;">燕归来</div>
									<div style="font-size:0.7rem;color:#757575;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">我好困22222222222222222222222222222222</div>
								</div>
							</div>
						</el-scrollbar>
					</el-card>
				</el-aside>
			</el-container>
        </el-col>
    </el-row>
</template>
<script>
import focus from '../components/focus'
export default {
	components:{focus},
    data(){
		return{
			type:this.$route.params.type,
			leftItem:[
				{'name':"关注动态",'count':'0'},
				{'name':"回复我的",'count':'1'},
				{'name':"收到的赞",'count':'2'},
				{'name':"系统通知",'count':'3'},
				{'name':"我的消息",'count':'4'},
			]
		}
	},
	mounted(){
		
	}
}
</script>
<style>
	#news .el-card__body{
		padding:0
	}
	#infoTable td{
		padding:0 20px 0 20px;
		color:#757575;
		font-size:0.8rem
	}
	.el-scrollbar__wrap {
		overflow-x: hidden;
	}
	#friendCard .el-scrollbar{
		height:400px
	}
</style>