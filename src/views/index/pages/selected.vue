<template>
    <el-row type="flex" justify="center" align="middle" :gutter="20" class="animated fadeIn">
        <el-col :xl="16" :lg='18' :md='20' :xs='24' style="padding:0;margin-top:30px" align="center">
            <el-col :xs="24" :sm="8">
                <div>
                    <i style="font-size:1.8rem;font-weight:bold">2nd</i>
                </div>
                <div style="width:250px;height:250px;background-color:#fff;display:inline-block;border-radius:5px;margin:0 20px">
                    <el-image style="width:100%;border-radius:5px 5px 0 0" src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png"></el-image>
                    <div style="margin-top:3px;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" align="center">sssss</div>
                    <div style="clear:both;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
                        <i class="fa fa-heart-o" aria-hidden="true" style="color:#FF5252"> 1000</i>
                        <i class="fa fa-commenting-o" aria-hidden="true" style="margin:0 20px;color:#2196F3">1</i>
                        <i class="fa fa-eye" aria-hidden="true" style="color:#8BC34A">1</i>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="8">
                <div>
                    <i style="font-size:2.5rem;font-weight:bold">1st</i>
                </div>
                <div style="width:300px;height:300px;background-color:#fff;display:inline-block;border-radius:5px;margin:0 20px">
                    <el-image style="width:100%;border-radius:5px 5px 0 0" src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png"></el-image>
                    <div style="margin-top:30px;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" align="center">sssss</div>
                    <div style="clear:both;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
                        <i class="fa fa-heart-o" aria-hidden="true" style="color:#FF5252"> 1000</i>
                        <i class="fa fa-commenting-o" aria-hidden="true" style="margin:0 20px;color:#2196F3">1</i>
                        <i class="fa fa-eye" aria-hidden="true" style="color:#8BC34A">1</i>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="8">
                <div>
                    <i style="font-size:1.8rem;font-weight:bold">3rd</i>
                </div>
                <div style="width:250px;height:250px;background-color:#fff;display:inline-block;border-radius:5px;margin:0 20px">
                    <el-image style="width:100%;border-radius:5px 5px 0 0" src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png"></el-image>
                    <div style="margin-top:3px;padding:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" align="center">sssss</div>
                    <div style="clear:both;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
                        <i class="fa fa-heart-o" aria-hidden="true" style="color:#FF5252"> 1000</i>
                        <i class="fa fa-commenting-o" aria-hidden="true" style="margin:0 20px;color:#2196F3">1</i>
                        <i class="fa fa-eye" aria-hidden="true" style="color:#8BC34A">1</i>
                    </div>
                </div>
            </el-col>
            <el-col id="divider">
                <el-divider></el-divider>
            </el-col>
            <el-col align="left" style="background-color:#fff;padding:0;border-radius:5px;margin-bottom:20px" v-for="i in 20" :key="i">
                <div style="float:left;width:150px;height:150px;">
                    <el-image src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png" 
                            style="border-radius:5px 0 0 5px;width:100%;height:100%" fit="cover">
                    </el-image>
                    <div style="width:100%;height:100%;border-radius:5px 0 0 5px;
                            position:relative;background-color:rgba(0,0,0,0.3);margin-top:-155px;line-height:150px" align="center">
                        <span style="font-size:2.5rem;font-weight:bold;color:#fff"> {{i+3}}</span>
                    </div>
                </div>
                <div style="margin-left:180px;margin-top:30px;">
                    <el-col :span="20" style="padding:0">
                        <div style="font-size:1.1rem;font-weight:bold;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">这里是标题</div>
                        <div style="font-size:0.8rem;color:#757575;margin:10px 0">2019-7-4 19:16</div>
                        <table style="font-weight:bold;cursor:pointer"  id="infoTable2Select" >
                            <tr>
                                <td style="color:#FF5252">
                                    <i class="fa fa-heart" style="color:red" aria-hidden="true" v-if="postData.liked" @click='like()'> 111</i>
                                    <i class="fa fa-heart-o" aria-hidden="true" v-else @click='like()'> 222</i>
                                </td>
                                <td style="color:#2196F3">
                                    <i class="fa fa-commenting-o" aria-hidden="true">333</i>
                                </td>
                                <td style="color:#8BC34A">
                                    <i class="fa fa-eye" aria-hidden="true"> 333</i>
                                </td>
                                <!-- <td style="color:#FF9800">
                                    <i class="fa fa-star-o" aria-hidden="true"> {{postData.view_num}}</i>
                                </td> -->
                                <td style="padding:0">
                                    <el-image src="http://static.simpledesktops.com/uploads/desktops/2014/04/24/highPoint_2880x1800.png" 
                                            style="border-radius:50%;width:30px;height:30px" fit="cover">
                                    </el-image>
                                </td>
                                <td style="padding-top:5px;color:#757575">sssssssss</td>
                            </tr>
                        </table>
                    </el-col>
                    <el-col :span="4">
                        <div style="font-weight:bold;font-size:1.2rem;margin-top:30px">50214</div>
                        综合评分
                    </el-col>
                </div>
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
    #divider .el-divider{
        background-color:#ccc
    }
    #infoTable2Select td {
		padding:0 30px 10px 0;
	}
</style>
