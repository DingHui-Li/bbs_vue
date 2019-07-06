<template>
    <el-autocomplete placeholder="查找你感兴趣的内容"  v-model="state"
            prefix-icon="el-icon-search" clearable :fetch-suggestions="querySearch"></el-autocomplete>    
</template>
<script>
export default {
    name:'search',
    data(){
        return{
            state:''
        }
    },
    methods:{
        querySearch(queryStr,cb){
            
        }
    }
}
</script>
<style>

</style>
