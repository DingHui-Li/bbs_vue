import Vue from 'vue';
import VueRouter from 'vue-router';
import Manage from './manage.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

import vueAxios from 'vue-axios'
import axios from 'axios'

import animated from 'animate.css'

import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css'
//=========================router
const toolbar=()=>import('./components/toolbar')
const home=()=>import('./pages/home')
const userManage=()=>import('./pages/userManage')
const postManage=()=>import('./pages/postManage')
const plateManage=()=>import('./pages/plateManage')
const noticeManage=()=>import('./pages/noticeManage')

const routes=[
	{path:'/',component:toolbar,children:[
		{path:'/',redirect:'home'},
		{path:'/home',component:home},
		{path:'/userManage',component:userManage},
		{path:'/postManage',component:postManage},
		{path:'/plateManage',component:plateManage},
		{path:'/noticeManage',component:noticeManage},
	]}
]
const router=new VueRouter({routes})


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(vueAxios,axios);

axios.defaults.withCredentials=true;
new Vue({
	router,
	render: h => h(Manage),
}).$mount('#manage')