<template>
    <el-autocomplete placeholder="查找你感兴趣的内容"  v-model="state" style="background:none;" @select="select"
            prefix-icon="el-icon-search" clearable :fetch-suggestions="querySearch">
    </el-autocomplete>    
</template>
<script>
import { apiHost } from '../../../../apiConfig';
export default {
    name:'search',
    data(){
        return{
            state:''
        }
    },
    methods:{
        querySearch(queryStr,cb){
            console.log(queryStr)
            this.axios({
                url:apiHost+'/anon/post/searchPost?postTitle='+queryStr,
                method:'get'
            }).then(res=>{
                if(res.data.code==200){
                    let result=res.data.ls.map(item=>{
                        return {'value':item.title,'id':item.id}
                    })
                    cb(result)
                }
            })
        },
        select(value){
            this.$router.push(`/content/${value.id}`)
        }
    }
}
</script>
<style>

</style>
