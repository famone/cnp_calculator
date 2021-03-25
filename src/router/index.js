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

 //    let calc  = store.getters["smeta/getCalc"]

	// if(calc){
 //        console.log(calc)
 //    }

	next()

    // if (store.getters["auth/getAuthenticated"]) {
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
