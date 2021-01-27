import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Page1 from '../pages/Page1.vue'
import Page2 from '../pages/Page2.vue'
import Page3 from '../pages/Page3.vue'
import Page4 from '../pages/Page4.vue'
import Page9 from '../pages/Page9.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import Notfound from '../pages/Notfound.vue'
import store from '../store'


const routes = [
		{
			path: '/',
			component: Home
		},
		{
			path: '/page-1',
			component: Page1,
			// beforeEnter: (to, from, next) => {
		 //        if(!store.getters["auth/getAuthenticated"]){
		 //        	alert('регайся лох')
		 //        	next("/login")
		 //        }
		 //    }
		},
		{
			path: '/page-2',
			component: Page2
		},
		{
			path: '/page-3',
			component: Page3
		},
		{
			path: '/page-4',
			component: Page4
		},
		{
			path: '/page-9',
			component: Page9
		},
		{
			path: '/enter',
			component: Login
		},
		{
			path: '/profile',
			component: Profile
		},
		{
			path: '/*',
			component: Notfound
		}
	]

export default routes;