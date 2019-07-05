<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col :lg='18' :md='20' :xs='24'>
            <el-col :xl="6" :md="8" :sm="12" :xs="24" v-for="i in 9" :key="i">
                <post />
            </el-col>
        </el-col>
    </el-row>
</template>
<script>
import post from "../components/post"
export default {
    components:{post}
}
</script>
<style>

</style>
