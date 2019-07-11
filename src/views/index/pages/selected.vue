<template>
    <el-row type="flex" justify="center" align="middle" :gutter="20" class="animated fadeIn">
        <el-col :lg='18' :md='20' :xs='24' style="padding:0;">
            <el-col :xs="24" :sm="8"></el-col>
            <el-col :xs="24" :sm="8"></el-col>
            <el-col :xs="24" :sm="8"></el-col>
            <div id="top3" align="center">
                <el-card style="width:250px">
                    <div slot="header" align="center">
                        sssssssss
                    </div>
                </el-card>
                <div style="width:300px;height:300px;background-color:#fff;display:inline-block;border-radius:5px;margin:0 20px">
                    <div>
                        <el-image style="width:100%;border-radius:5px 5px 0 0" src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png"></el-image>
                        <div style="margin-top:3px;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" align="center">sssss</div>
                        <div style="clear:both;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
                            <i class="fa fa-heart-o" aria-hidden="true"> 1000</i>
                            <i class="fa fa-commenting-o" aria-hidden="true" style="margin:0 20px">1</i>
                            <i class="fa fa-eye" aria-hidden="true">1</i>
                        </div>
                    </div>
                </div>
                <div style="width:200px;height:200px;background-color:#fff;display:inline-block;border-radius:5px">
                    <div>
                        <el-image style="width:100%;border-radius:5px 5px 0 0" src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png"></el-image>
                        <div style="margin-top:3px;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" align="center">sssss</div>
                        <div style="clear:both;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
                            <i class="fa fa-heart-o" aria-hidden="true"> 1000</i>
                            <i class="fa fa-commenting-o" aria-hidden="true" style="margin:0 20px">1</i>
                            <i class="fa fa-eye" aria-hidden="true">1</i>
                        </div>
                    </div>
                </div>
            </div>
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
