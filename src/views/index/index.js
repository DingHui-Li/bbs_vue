import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './index.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

import "../../assets/fontawesome-free-5.9.0-web/css/all.css"

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// ===============================================
const toolbar=()=>import('./components/toolbar')

const login=()=>import('./pages/login')
const home=()=>import('./pages/home')
const selected=()=>import('./pages/selected')
const register=()=>import('./pages/register')
const plate=()=>import('./pages/plate')
const notice=()=>import('./pages/notice')


const routes=[{path:'/',component:toolbar,children:[
					{path:'/',redirect:'home'},
					{path:'home',component:home},
					{path:'selected',component:selected},
					{path:'plate',component:plate},
					{path:'notice',component:notice},
					{path:'login',component:login},	
					// {path:'person',component:person},
					{path:'register',component:register},	
				]},]
const router=new VueRouter({routes})

//============================================================
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAwesomeSwiper);

new Vue({
	router,
	render:h=>h(Index)
}).$mount('#index')
