<template>
    <el-row type="flex" justify="center" :gutter="20" class="animated fadeIn">
        <el-col :lg='18' :md='20' :xs='24' style="padding:0;">
            <el-col :xl="6" :md="8" :sm="12" :xs="24" v-for="i in postData" :key="i">
                <post />
            </el-col>
        </el-col>
    </el-row>
</template>
<script>
import post from "../components/post"
export default {
    components:{post},
    data(){
        return{
            postData:[]
        }
    }
}
</script>
<style>
</style>
