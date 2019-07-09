<template>
    <el-row type="flex" justify="center" :gutter="20" style="padding:0;">
        <el-col :lg='14'  :md='18' :xs='24' style="padding-top:40px;">
			<el-card style="padding:10px 0">
				<el-col :span="8" id="avatar" :xs="24" align="center">
					<el-avatar  src="http://pic1.win4000.com/wallpaper/c/57918d798786e.jpg"  :size="200" fit="cover" >
					</el-avatar>
				</el-col>
				<el-col :span="16" :xs="24" style="padding:0 30px;margin:10px 0" >
					<div >
						<span style="font-weight:bold;font-size:1.4rem">happy</span>
						<el-button style="margin-left:40px">修改个人信息</el-button>
						<el-button style="margin-left:40px">修改账号信息</el-button>
						<el-button @click="$router.replace('/publish')">测试</el-button>
					</div>
					<div style="margin:10px 0">
						<span>12222222222222222222222</span>
					</div>
					<div id="infoTable" style="margin-top:20px">
						<table style="font-weight:bold">
								<tr style="color:#757575;">
									<td>关注</td>
									<td>粉丝</td>
									<td>获赞</td>
								</tr>
							<tr>
								<td>123123</td>
								<td>12</td>
								<td>12</td>
							</tr>
						</table>
					</div>
				</el-col>
			</el-card>
			<el-tabs stretch>
				<el-tab-pane label="帖子">
					<el-col :sm="12" :xs="24" v-for="i in 9" :key="i" v-if="postData.length>0">
						<post></post>
					</el-col>
				</el-tab-pane>
				<el-tab-pane label="收藏">
					<el-col :sm="12" :xs="24" v-for="i in 9" :key="i"  v-if="markData.length>0">
						<post></post>
					</el-col>
				</el-tab-pane>
			</el-tabs>
        </el-col>
    </el-row>
</template>
<script>
import post from '../components/post'
export default {
	components:{post},
    data(){
		return{
			postData:[],
			markData:[],
			tableData:[
				{'follow':12,'fans':23,'like':'55'}
			]
		}
	}
}
</script>
<style>
	#infoTable td {
		padding:0 20px 10px 0;
	}
</style>