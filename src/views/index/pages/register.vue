<template>
	<el-row type="flex" justify="center" align="middle">
		<el-col :xl="6" :md="12" :sm="18" :xs="24">
			<el-input>
				<template slot="prepend">用户名</template>
			</el-input>
			<el-input>
				<template slot="prepend">密 码</template>
			</el-input>
			<el-input>
				<template slot="prepend">确认密码</template>
			</el-input>
			<el-radio-group v-model="sex" style="margin-top:5px;width:100%" align="center">
				<el-radio-button label="男">男</el-radio-button>
				<el-radio-button label="女">女</el-radio-button>
			</el-radio-group>
			
		</el-col>
	</el-row>
</template>
<script>
export default {
	data(){
		return{
			sex:'男'
		}
	},
	watch:{
	}
}
</script>
<style>

</style>
