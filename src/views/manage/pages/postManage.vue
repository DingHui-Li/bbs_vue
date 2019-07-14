<template>
	<el-row type="flex" justify="center" :gutter="10">
		<el-col>
			<el-col>
				<span style="color:#757575;font-weight:bold;margin-right:10px">搜索</span> 
				<el-radio-group v-model="searchType">
					<el-radio-button label="ID"></el-radio-button>
					<el-radio-button label="标题"></el-radio-button>
					<el-radio-button label="内容"></el-radio-button>
					<el-radio-button label="分区"></el-radio-button>
				</el-radio-group>
				<el-input placeholder="搜索"></el-input>
			</el-col>
			<el-table :data='postData' v-if="postData.length>0" stripe>
				<el-table-column prop="id" label="ID"></el-table-column>
				<el-table-column prop="title" label="标题"></el-table-column>
			</el-table>
		</el-col>
	</el-row>	
</template>
<script>
import { apiHost } from '../../../../apiConfig';
export default {
	data(){
		return{
			postData:[],
			searchType:'ID'
		}
	},
	mounted(){
		this.getData();
	},
	methods:{
		getData(){
			this.axios({
                url:apiHost+'/anon/post/getIndexPostTitles?page=1',
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
					this.postData=res.data.PostTitleList;
					console.log(this.postData)
                }
            })
		}
	}
}
</script>
<style>
</style>
