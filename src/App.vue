<template>
    <v-app>
   	  <preloader v-if="preloader" />
      <Header />
      <Tabs />

      <transition name="slide" mode="out-in">
      	<router-view></router-view>
      </transition>	

      <!-- <Footer :prgrss="returnRoute" /> -->
      
    </v-app>
</template>

<script>
import './assets/css/style.css'
import {mapState} from 'vuex'
import Header from './components/Header.vue'
import Tabs from './components/Tabs.vue'
import Footer from './components/Footer.vue'
import preloader from './components/preloader.vue'

export default{
    components: {Header, Footer, Tabs, preloader},
    computed: {
    	returnRoute(){
    		return parseInt(this.$route.path.match(/\d+/))
    	},
    	...mapState('smeta', ['preloader'])
    },
    created(){
    	this.$store.dispatch('smeta/getCalc')
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

