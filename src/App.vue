<template>
    <v-app>
   	  <preloader v-if="preloader" />
	  <Bugs v-if="bugsPop" @hideBugs="bugsPop = false" />
      <Header @openBugs="bugsPop = true" />
      <Tabs v-if="this.$route.params.id === undefined" />
      <Tabs2 v-else />

      <!-- <transition name="slide" mode="out-in"> -->
      	<router-view></router-view>
      <!-- </transition>	 -->

      <Footer :prgrss="returnRoute" />
      
    </v-app>
</template>

<script>
import './assets/css/style.css'
import {mapState, mapGetters} from 'vuex'
import Header from './components/Header.vue'
import Tabs from './components/Tabs.vue'
import Tabs2 from './components/Tabs2.vue'
import Footer from './components/Footer.vue'
import preloader from './components/preloader.vue'
import Bugs from './components/Bugs.vue'

export default{
    components: {Header, Footer, Tabs, Tabs2, preloader, Bugs},
	data(){
		return{
			bugsPop: false
		}
	},
    computed: {
    	returnRoute(){
    		return parseInt(this.$route.path.match(/\d+/))
    	},
    	...mapState('smeta', ['preloader']),
    	...mapGetters({
    		calc: "smeta/getCalc",
			activePreset: "preset/getActivePreset"
    	})
    },
    mounted(){
		if(!this.activePreset){
			setInterval(() => {
				localStorage.setItem("calc", JSON.stringify(this.calc));
			}, 5000)
		}
    }
}
</script>

<style>


.slide-leave-active{
	transition: opacity .3s ease;
	opacity: 0;
	animation: slide-out .3s  ease-out forwards;
}
.slide-leave{
	opacity: 1;
	transform: translateX(0px);
}
.slide-enter-active{
	animation: slide-in .3s  ease-out forwards;
	opacity: 1;
}



@keyframes slide-out{
	0%{
		transform: translateY(0);
	}
	100%{
		transform: translateY(50px);
	}
}
@keyframes slide-in{
	0%{
		transform: translateY(50px);
		opacity: 0;
	}
	100%{
		transform: translateY(0px);
		opacity: 1;
	}
}
</style>

