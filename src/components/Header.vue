<template>
	<header>
		<div class="container-fluid">
			<div class="shapka">
				<div class="logobox">
					<router-link tag="div" :to="myPresetLink" class="logo">
						COST<br>	
 						NIKITA<br>	
						PUGACHEV	
					</router-link>

					<div class="calc-info">
						<div v-if="presetAvatar" class="avatar" :style="{'background-image': 'url(' + presetAvatar + ')'}" style="margin-right: 5px;"></div>
						<p class="white-txt ma-0" v-if="presetUser">{{presetUser}} - </p> 
						<p class="white-txt ma-0">{{activePresetName}}</p>
					</div>
				</div>

				<div class="navigation hidden-xs">
					<button class="enter-btn mr-2" @click="openBugs($emit)" v-if="user">
						Сообщить о баге
					</button>

					<div v-if="user" class="avatar" :style="{'background-image': 'url(' + user.avatar + ')'}"></div>
					<p v-if="user" class="white-txt" style="margin: 0 0 0 10px;">{{user.user_display_name}}</p>
					<router-link v-if="user" tag="button" to="/profile" class="lk-btn">
						<span class="mdi mdi-account-outline"></span>
						Личный кабинет
					</router-link>
					<button v-if="user" @click="signOut()" class="exit-btn">
						<span class="mdi mdi-exit-to-app"></span> 
						Выход
					</button>

					<router-link v-if="!user" tag="button" to="/enter" class="enter-btn">
						Вход
					</router-link>
				</div>

				<div class="burger hidden-lg hidden-md hidden-sm" :class="{burgerAc: mobileMenu}" @click="mobileMenu = !mobileMenu">
					<span></span>
					<span></span>
				</div>


				<div class="mobileNav" v-if="mobileMenu" @click="mobileMenu = !mobileMenu">

					<div>
						<button class="enter-btn" @click="openBugs($emit)" v-if="user">
						Сообщить о баге
					</button>
					<br>

					<div class="d-flex justify-center align-center mt-4">
						<div v-if="user" class="avatar" :style="{'background-image': 'url(' + user.avatar + ')'}"></div>
						<p v-if="user" class="white-txt" style="margin: 0 0 0 10px;">{{user.user_display_name}}</p>
					</div>
					<br>
					<router-link v-if="user" tag="button" to="/profile" class="lk-btn" style="margin:0px;">
						<span class="mdi mdi-account-outline"></span>
						Личный кабинет
					</router-link>
					


					<button v-if="user" @click="signOut()" class="exit-btn">
						<span class="mdi mdi-exit-to-app"></span> 
						Выход
					</button>

					<router-link v-if="!user" tag="button" to="/enter" class="enter-btn">
						Вход
					</router-link>
					</div>

				</div>


			</div>
		</div>
	</header>
</template>	


<script>
import {mapGetters} from 'vuex'

	export default{
		data(){
			return{
				mobileMenu: false
			}
		},
		computed: {
			...mapGetters({ 
				user: "auth/getAuthenticated",
				activePreset: "preset/getActivePreset",
				activePresetName: "preset/getActivePresetName",
				presets: "preset/getPresets",
				presetSlugs: "preset/getPresetSlugs",
				presetUser: "preset/getPresetUser",
				presetAvatar: "preset/getPresetAvatar"
			}),
			myPresetLink(){
				if(this.activePreset && this.user){
					return '/page-1/' + this.user.user_nicename + '/' + this.presets.data[0].slug
				}else{
					return '/'
				}
			}
		},
		methods: {
			openBugs(){
				this.$emit("openBugs")
			},
			signOut(){
				this.$store.dispatch('auth/SIGN_OUT').then(() => {
					this.$store.dispatch("preset/clearActivePreset")
					this.$store.dispatch("preset/clearActivePresetName")
        			this.$router.replace("/enter");
				});
			}
		}
	}
</script>


<style>
.logobox{
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.logobox h4{
	color: #fff;
	margin-left: 30px;
}
.calc-info{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-left: 25px;
}
.calc-info .white-txt{
	padding-right: 5px!important;
}
</style>