import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Page1 from '../pages/Page1.vue'
import Page2 from '../pages/Page2.vue'
import Page3 from '../pages/Page3.vue'
import Page4 from '../pages/Page4.vue'
import Page5 from '../pages/Page5.vue'
import Page6 from '../pages/Page6.vue'
import Page7 from '../pages/Page7.vue'
import Page8 from '../pages/Page8.vue'
import Page9 from '../pages/Page9.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import Notfound from '../pages/Notfound.vue'
import Loadpreset from '../pages/Loadpreset.vue'
import store from '../store'


const routes = [
		{
			path: '/',
			component: Home
		},
		{
			path: '/page-1',
			component: Page1,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next("/profile")
				}else{
					next()
				}
			}
		},
		{
			path: '/page-2',
			component: Page2,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next("/profile")
				}else{
					next()
				}
			}
		},
		{
			path: '/page-3',
			component: Page3,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next("/profile")
				}else{
					next()
				}
			}
		},
		{
			path: '/page-4',
			component: Page4,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next("/profile")
				}else{
					next()
				}
			}
		},
		{
			path: '/page-5',
			component: Page5,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next("/profile")
				}else{
					next()
				}
			}
		},
		{
			path: '/page-6',
			component: Page6,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next("/profile")
				}else{
					next()
				}
			}
		},
		{
			path: '/page-7',
			component: Page7,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next("/profile")
				}else{
					next()
				}
			}
		},
		{
			path: '/page-8',
			component: Page8,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next("/profile")
				}else{
					next()
				}
			}
		},
		{
			path: '/page-9',
			component: Page9,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next("/profile")
				}else{
					next()
				}
			}
		},
		{
			path: '/enter',
			component: Login
		},
		{
			path: '/profile',
			component: Profile,
			beforeEnter: (to, from, next) => {
				if (store.getters["auth/getAuthenticated"]) {
					next()
				} else {
					if (to.path != "/enter") {
						next("/enter")
					}
					else {
						next()
					}
				}
			}
		},
		{
			path: '/page-1/:name/:id',
			component: Page1,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next()
				}else{
					next("/profile")
				}
			}
		},
		{
			path: '/page-2/:name/:id',
			component: Page2,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next()
				}else{
					next("/profile")
				}
			}
		},
		{
			path: '/page-3/:name/:id',
			component: Page3,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next()
				}else{
					next("/profile")
				}
			}
		},
		{
			path: '/page-4/:name/:id',
			component: Page4,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next()
				}else{
					next("/profile")
				}
			}
		},
		{
			path: '/page-5/:name/:id',
			component: Page5,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next()
				}else{
					next("/profile")
				}
			}
		},
		{
			path: '/page-6/:name/:id',
			component: Page6,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next()
				}else{
					next("/profile")
				}
			}
		},
		{
			path: '/page-7/:name/:id',
			component: Page7,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next()
				}else{
					next("/profile")
				}
			}
		},
		{
			path: '/page-9/:name/:id',
			component: Page9,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next()
				}else{
					next("/profile")
				}
			}
		},
		{
			path: '/page-8/:name/:id',
			component: Page8,
			beforeEnter: (to, from, next) => {
				if(store.getters["preset/getActivePreset"]){
					next()
				}else{
					next("/profile")
				}
			}
		},
		{
			path: '/calc/:login/:preset',
			component: Loadpreset,
			name: 'calc-route'
		},
		{
			path: '/*',
			component: Notfound
		},
	]

export default routes;