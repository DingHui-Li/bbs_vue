<template>
    <el-row type="flex" justify="center" :gutter="20">
        <el-col :lg='14'  :md='18' :xs='24'>
            <el-card style="box-shadow:none;border:none;padding:10px" id="publishCard">
                <div align="center" @click="uploadCover()" id="cover">
                    <el-image id="cover" style="width:100%;height:200px;border-radius:5px" :src="geturl" fit="cover">
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
                <div style="border:1px solid #ccc;border-radius:5px" id='publish'>
                    <div id='toolbar' style=""></div>
                    <div id='text' style="min-height:200px;max-height:70vh;"></div>
                </div>
                <div align="end" style="margin-top:20px;" id="submitBtn">
                    <el-button style="border-radius:5px 0 0 5px;" type="primary" @click="submit()">发布到</el-button>
                    <el-cascader clearable placeholder="请选择分区"
                            :options="plates"
                            v-model="selectedPlate"
                            @change="selectPlate"  :props="{ expandTrigger: 'hover' }"></el-cascader>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import wangeditor from 'wangeditor'
import {imgHost, apiHost} from '../../../../apiConfig.js'
export default {
    components:{wangeditor},
    data(){
        return{
            plates:[],
            districtId:-1,
            selectedPlate:[],
            editor:null,
            cover:'/default.jpg',
            title:'',
            id:this.$route.params.id,//帖子id
        }
    },
    computed:{
        geturl(){
            return imgHost+this.cover;
        }
    },
    methods:{
        selectPlate(value){
            let temp=value[1].split('-');
            this.districtId=temp[1];
        },
        initEditor(){
            let editor=new wangeditor('#toolbar','#text');
			editor.customConfig.uploadImgServer = imgHost+'/blog/upload';
			editor.customConfig.uploadFileName = 'file';
			editor.customConfig.zIndex = 999;
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
				'image',  // 插入图片
				'code',  // 插入代码
				'undo',  // 撤销
				'redo'  // 重复
			];
			const _this=this;
			editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
			editor.customConfig.uploadImgMaxLength = 1;
			editor.customConfig.customUploadImg=function(file,insert){
				let formData =new FormData();
                formData.append("file",file[0]);
                formData.append("type","img")
                const loading = _this.$loading({
                        lock: true,
                        text: '上传中...',
                        target:document.getElementById('text'),
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
				_this.axios({
					method:'post',
                    url: imgHost+'/img/upload',
					data:formData,
				}).then(function(res){
                    loading.close();
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
                    if(file.size>( 4 * 1024 * 1024)){
						alert("图片大小不要超过4M");
                        return;
                    }
                    const loading = _this.$loading({
                        lock: true,
                        text: '上传中...',
                        target:document.getElementById('cover'),
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    _this.axios({
                        url:imgHost+"/img/upload",
                        method:'post',
                        data:data
                    }).then(res=>{
                        loading.close();
                        if(res.data.code==200){
                            _this.cover=res.data.path;
                        }
                    })
                }
                this.value="";
            })
        },
        submit(){
            let content=this.editor.txt.html();
            let content_txt=this.editor.txt.text();
            if(this.title.trim().length==0){
                this.$message('标题不能为空');
                return;
            }
            if(content_txt.trim().length==0){
                this.$message('内容不能为空');
                return;
            }
            if(this.districtId==-1){
                this.$message('请选择分区');
                return;
            }
            if(this.cover==""){
                this.cover='/default.jpg'
            }
            let id=localStorage['userId'];
            if(id==undefined){
                return;
            } 
            const loading = this.$loading({
                lock: true,
                target:document.getElementById('publishCard'),
                text: '发帖中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let url=apiHost+'/anon/post/addPostTitle';
            if(this.id!=undefined){
                url=apiHost+'/anon/post/updatePostTitle'
            }
            this.axios({
                url:url,
                method:'post',
                data:{'title':this.title,'content':content,'districtInfo_id':this.districtId,'image':this.cover,'id':this.id}
            }).then(res=>{ 
                loading.close();
                if(res.data.code==200){
                    this.editor.txt.clear();
                    this.title="";
                    this.cover='/default.jpg'
                    this.$notify({
                        title: '成功',
                        type: 'success',
                        duration: 2000
                    });
                }else{
                    this.$notify({
                        title: '失败',
                        message:res.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        getPlates(){
            this.axios({
                url:apiHost+"/anon/plate/getPlates",
                method:"get"
            }).then(res=>{
                if(res!=undefined){
                    this.plates=res.data.map(plate=>{
                        let children=plate.districtInfos.map(district=>{
                            //父级value与子级value不能相同，所以给子级value前加上'父级id-',导致获取子级id时需要分割字符串
                            return {'value':district.plate_id+'-'+district.id,'label':district.district_name};
                        })
                        return {'value':plate.id,'label':plate.plate_name,'children':children}
                    })
                }
            })
        },
        getData(){
            let loading=this.$loading({
                    fullscreen:false,
                    target:publishCard,
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading'
            });
            this.axios({
                url:apiHost+'/anon/post/getPostTitleContent?id='+this.id,
                method:'get'
            }).then(res=>{
                loading.close();
                console.log(this.plates)
                if(res.data.code==200){
                    this.title=res.data.Content.title;
                    this.cover=res.data.Content.image;
                    this.editor.txt.html(res.data.Content.content);

                    let plateId=res.data.plateInfo.id;
                    let distId=res.data.disInfo.id;
                    this.districtId=distId;
                    this.selectedPlate=[];
                    this.selectedPlate.push(plateId);
                    this.selectedPlate.push(plateId+'-'+distId);
                }

            })
        }
    },
    mounted(){
        this.initEditor();
        this.getPlates();
        if(this.id!=undefined){
            this.getData();
        }
    },
    created(){
            this.axios({
                url:apiHost+'/checkSession',
                method:'post',
            }).then(res=>{
                if(res.data.code==200) {}
                else{
                    this.$message.error('未登录');
                    this.$router.go(-1);
                }
            })
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
    .w-e-text{
        overflow-y: hidden;
    }
    .w-e-text-container{
        overflow-x: hidden !important;
    }
</style>
