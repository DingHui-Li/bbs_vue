<template>
    <div style="position:fixed;bottom:10%;right:5%">
        <div class="fab" style="margin-bottom:5px" align="center" @click="$router.push('/publish')">
            <i class="fa fa-pencil" aria-hidden="true" style="font-size:20px;color:#fff;"></i>
        </div>
        <div class="fab" align="center" @click="toTop()">
            <i class="fa fa-arrow-up" aria-hidden="true" style="font-size:20px;color:#fff"></i>
        </div>
    </div>
</template>
<script>
export default {
    name:'fab',
    methods:{
        toTop(){
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(this.toTop);
                window.scrollTo (0,currentScroll - (currentScroll/5));
        }
}
    }
}
</script>
<style>
    .fab{
        border-radius:50%;
        width:50px;
        height:50px;
        background-color:#2196F3;
        line-height:50px;
    }
</style>
