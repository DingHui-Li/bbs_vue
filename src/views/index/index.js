import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './index.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../../assets/fontawesome-free-5.9.0-web/css/all.css"

const toolbar=()=>import('./components/toolbar')

const login=()=>import('./pages/login')
const home=()=>import('./pages/home')
const selected=()=>import('./pages/selected')


const routes=[{path:'/',component:toolbar,children:[
					{path:'/',redirect:'home'},
					{path:'home',component:home},
					{path:'selected',component:selected},
					// {path:'plate',component:plate},
					// {path:'notice',component:notice},
					{path:'login',component:login},	
					// {path:'person',component:person},
				]},]
const router=new VueRouter({routes})
Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
	router,
	render:h=>h(Index)
}).$mount('#index')
