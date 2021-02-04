<template>
	<header>
		<div class="container-fluid">
			<div class="shapka">
				<router-link tag="div" to="/" class="logo">
					COST<br>	
 					NIKITA<br>	
					PUGACHEV	
				</router-link>

				<div class="navigation">
					<!-- <button class="circle-btn">Попробуй бесплатно</button>
					<button class="servers"><img src="../assets/img/servers.svg" alt="">Сервисы</button> -->

					<div v-if="user" class="avatar" :style="{'background-image': 'url(' + user.avatar + ')'}"></div>
					<p v-if="user" class="white-txt" style="margin: 0 0 0 10px;">{{user.user_nicename}}</p>
					<router-link v-if="user" tag="button" to="/profile" class="lk-btn">
						<span class="mdi mdi-account-outline"></span>
						Личный кабинет
					</router-link>
					<button v-if="user" @click="signOut()" class="exit-btn">
						<span class="mdi mdi-exit-to-app"></span> 
						Выход
					</button>

					<router-link v-if="!user" tag="button" to="/enter" class="enter-btn">Вход</router-link>
				</div>

			</div>
		</div>
	</header>
</template>	


<script>
import {mapGetters} from 'vuex'
	export default{
		computed: {
			...mapGetters({ user: "auth/getAuthenticated"})
		},
		methods: {
			signOut(){
				this.$store.dispatch('auth/SIGN_OUT').then(() => {
        			this.$router.replace("/enter");
				});
			}
		}
	}
</script>