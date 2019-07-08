<template>
    <el-card id="postCard" :body-style="{padding:'0px'}" style="border-radius:10px;margin:10px 0;">
        <el-image :src="'http://pic1.win4000.com/wallpaper/c/57918d798786e.jpg'"
            style="width:100%;height:auto;border-radius:10px 10px 0 0;" fit="cover" @click="postClick(12)">
            <div slot="error" class="image-slot" align="center" style="margin-top:20px">
                <i class="el-icon-picture-outline" ></i>
            </div>
        </el-image>
        <div style="padding:10px;border-bottom:1px solid #ccc;margin-bottom:10px">震惊！李嘉伟不写作业到底在干嘛？ 看完不敢相信...</div>
        <el-row type="flex" align="middle" style="padding:10px;overflow:hidden">
            <el-col :span="3" right>
                <el-avatar :size="30" src='http://pic1.win4000.com/wallpaper/c/57918d798786e.jpg'></el-avatar>
            </el-col>
            <el-col :span="10" left>
                <span>昵称昵称昵</span>
            </el-col>
            <el-col :span="5" left>
                <i class="far fa-thumbs-up"></i>
                <span style="margin-left:5px">0</span>
            </el-col>
            <el-col :span="5" left>
                <i class="fa fa-eye" aria-hidden="true"></i>
                <span style="margin-left:5px">1000</span>
            </el-col>
        </el-row>
    </el-card>
</template>
<script>
export default {
    name:'post',
    methods:{
        postClick(id){
            alert(id)
            this.$router.push(`/content/${id}`);
        }
    }
}
</script>
<style>
    #postCard:hover{
        filter:brightness(0.9);
    }
</style>
