import VueRouter from 'vue-router'
import routes from './routes.js';

import store from '../store'

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});


router.beforeEach((to, from, next) => {

	console.log(store.getters["smeta/getCalc"])
	next()

    // if (store.getters["smeta/getAuthenticated"]) {
    //      next()
    // }else{
    //     if (to.path != "/enter") {
    //          next("/enter")
    //      }
    //      else {
    //          next()
    //      }
    // }
})




export default router
