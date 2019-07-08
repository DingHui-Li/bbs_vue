<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col :lg='18' :md='20' :xs='24'>
            <el-image id="cover" style="width:100%;height:300px;border-radius:5px" src="http://pic1.win4000.com/wallpaper/c/57918d798786e.jpg" fit="cover">
                <div slot="error" class="image-slot" align="center">
                    <i class="el-icon-picture-outline" style="font-size:100px"></i>
                </div>
                <div slot="placeholder" class="image-slot">
                    <i class="el-icon-loading"></i>
                </div>
            </el-image>
        </el-col>
    </el-row>
</template>
<script>
export default {
    mounted(){
        console.log(this.$route.params['id'])
    }
}
</script>
<style>

</style>