<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col :lg='14'  :md='18' :xs='24'>
            <el-card style="box-shadow:none;border:none">
                <div align="center" @click="uploadCover()">
                    <el-image id="cover" style="width:100%;height:200px;border-radius:5px" :src="cover" fit="cover">
                        <div slot="error" class="image-slot" align="center">
                            <i class="el-icon-picture-outline" style="font-size:100px"></i>
                        </div>
                        <div slot="placeholder" class="image-slot">
                            <i class="el-icon-loading"></i>
                        </div>
                    </el-image>
                    <input type="file" style="display:none" id="coverInput">
                </div>
                <el-input maxlength="40" show-word-limit style="margin:20px 0" v-model="title">
                    <template slot="prepend">标题：</template>
                </el-input>
                <div style="border:1px solid #ccc;border-radius:5px">
                    <div ref='toolbar' style="overflow:hidden"></div>
                    <div ref='text' style="height:70%;"></div>
                </div>
                <div align="end" style="margin-top:20px;" id="submitBtn">
                    <el-button style="border-radius:5px 0 0 5px;" type="primary" @click="submit()">发布到</el-button>
                    <el-cascader clearable placeholder="请选择分区"
                            v-model="plateName"
                            :options="plates"
                            @change="selectPlate"  :props="{ expandTrigger: 'hover' }"></el-cascader>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import wangeditor from 'wangeditor'
import {imgHost} from '../../../../apiConfig.js'
export default {
    data(){
        return{
            //plates:['时尚','美食','旅行','体育','影视'],
            plates:[
                {'value':'1','label':'时尚',
                    'children':[
                        {'value':'1-1','label':'美妆'},
                        {'value':'1-2','label':'穿搭'}]},
                {'value':'2','label':'美食',
                    'children':[
                        {'value':'2-1','label':'美妆'},
                        {'value':'2-2','label':'穿搭'}]}
            ],
            plateName:'请选择分区',
            editor:null,
            cover:imgHost+'/default.jpg',
            title:'',
        }
    },
    methods:{
        selectPlate(value){
            this.plateName=value;
        },
        initEditor(){
            const editor=new wangeditor(this.$refs.toolbar,this.$refs.text);
			editor.customConfig.uploadImgServer = imgHost+'/blog/upload';
			editor.customConfig.uploadFileName = 'file';
			editor.customConfig.zIndex = 1;
			editor.customConfig.menus = [
				 'head',  // 标题
				'bold',  // 粗体
				'fontSize',  // 字号
				'fontName',  // 字体
				'italic',  // 斜体
				'underline',  // 下划线
				'strikeThrough',  // 删除线
				'foreColor',  // 文字颜色
				'backColor',  // 背景颜色
				'link',  // 插入链接
				'list',  // 列表
				'justify',  // 对齐方式
				'quote',  // 引用
				'emoticon',  // 表情
				'image',  // 插入图片
				'code',  // 插入代码
				'undo',  // 撤销
				'redo'  // 重复
			]
			const _this=this;
			editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
			editor.customConfig.uploadImgMaxLength = 1;
			editor.customConfig.customUploadImg=function(file,insert){
				let formData =new FormData();
				formData.append("file",file[0]);
				formData.append("type","img")

				_this.axios({
					method:'post',
					url: imgHost+'/img/upload',
					data:formData,
				}).then(function(res){
					if(res.data.code==200){
						insert(imgHost+res.data.path)

					}
				})
			}
			editor.create();
			this.editor=editor;
        },
        uploadCover(){
            coverInput.click();
            let _this=this;
            coverInput.addEventListener('change',function(){
                if(this.files[0]!=undefined){
                    let data=new FormData();
                    let file=this.files[0];
                    data.append('type','cover');
                    data.append('file',file);
                    if(file>( 2 * 1024 * 1024)){
						alert("图片大小不要超过2M");
                        return;
					}
                    _this.axios({
                        url:imgHost+"/img/upload",
                        method:'post',
                        data:data
                    }).then(res=>{
                        if(res.data.code==200){
                            _this.cover=imgHost+res.data.path;
                        }
                    })
                }
                this.value="";
            })
        },
        submit(){
            let content=this.editor.txt.html();
            console.log(content);
        }
    },
    mounted(){
        this.initEditor();
    }
}
</script>
<style>
    #submitBtn .el-cascader .el-input .el-input__inner{
        border-radius:0 5px 5px 0;
    }
    #cover:hover{
        filter:brightness(0.5);
    }
</style>
