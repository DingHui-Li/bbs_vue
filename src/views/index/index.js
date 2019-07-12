import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './index.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

import vueAxios from 'vue-axios'
import axios from 'axios'

import animated from 'animate.css'

import {apiHost} from '../../../apiConfig'
// ===============================================
const toolbar=()=>import('./components/toolbar')

const login=()=>import('./pages/login')
const home=()=>import('./pages/home')
const selected=()=>import('./pages/selected')
const plate=()=>import('./pages/plate')
const person=()=>import('./pages/person')
const publish=()=>import('./pages/publish')
const content=()=>import('./pages/content')
const news=()=>import('./pages/news')

const routes=[{path:'/',component:toolbar,children:[
					{path:'/',redirect:'home'},
					{path:'home',component:home},
					{path:'selected',component:selected},
					{path:'plate',component:plate},
					{path:'login',component:login},	
					{path:'person/:id',component:person},
					{path:'publish',component:publish},
					{path:'publish/:id',component:publish},
					{path:'content/:id',component:content},
					{path:'news/:type',component:news},
				]},]
const router=new VueRouter({routes})

// router.beforeEach((to,form,next)=>{
// 	if(to.path.indexOf('publish')!=-1){
// 		axios({
// 			url:apiHost+'/checkSession',
// 			method:'post',
// 		}).then(res=>{
// 			if(res.data.code==200) {
// 			}
// 			console.log(res)
// 		})
// 	}
// 	return next;
// })
//============================================================
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(vueAxios,axios);
axios.defaults.withCredentials=true;
axios.interceptors.request.use(request=>{
	if(request.url=="http://lidh.top:8084/imgservice/img/upload"){
		request.withCredentials=false;
	}
	return request;},error=>{
	alert(error)
})
axios.interceptors.response.use(response=>{
	if(response.data.code==500){
		if(response.config.url.indexOf('checkSession')==-1)
			alert(response.data.msg);
	}
	return response;},error=>{
	alert(error)
})
new Vue({
	router,
	render:h=>h(Index)
}).$mount('#index')
