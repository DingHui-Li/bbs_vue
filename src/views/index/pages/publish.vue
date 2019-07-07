<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col :lg='14'  :md='18' :xs='24' style="padding-top:40px;">
            <div style="border:1px solid #ccc;color:#ccc" align="center">
                上传封面
                <el-image style="width:100%">
                    <div slot="error" class="image-slot" align="center">
                        <i class="el-icon-picture-outline" style="font-size:100px"></i>
                    </div>
                </el-image>
            </div>
            <el-input maxlength="40" show-word-limit style="margin:20px 0">
                <template slot="prepend">标题：</template>
            </el-input>
            <!-- <ckeditor :editor="editor"></ckeditor> -->
            <div>
                <div ref='toolbar'></div>
			    <div ref='text' style="height:70%;"></div>
            </div>
            <div align="end" style="margin-top:20px;" id="submitBtn">
                <!-- <el-dropdown split-button type="primary" @command="selectPlate"> 
                    发布到：{{plateName}}
                    <el-dropdown-menu slot='dropdown'>
                        <el-dropdown-item v-for="plate in plates" :key="plate" :command="plate">{{plate}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
                <el-button style="border-radius:5px 0 0 5px;" type="primary">发布到</el-button>
                <el-cascader clearable placeholder="请选择分区"
                        v-model="plateName"
                        :options="plates"
                        @change="selectPlate"  :props="{ expandTrigger: 'hover' }"></el-cascader>
            </div>
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
            editor:null
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
</style>
