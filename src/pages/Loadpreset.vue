<template>
	<section id="p404">
		<div class="container text-center">
			<h1>Калькулятор пользователя:</h1>
			<div class="avatar-box">
				<div class="avatar" v-if="presetAvatar" :style="{'background-image': 'url(' + presetAvatar + ')'}">
				</div>
			</div>
			<div class="avatar" v-if="presetAvatar" :style="{'background-image': 'url(' + presetAvatar + ')'}">
			</div>
			<h3 v-if="presetUser" style="color: #2E97E6;">{{presetUser}}</h3>
			<h3>{{activePresetName}}</h3>
			<router-link class="blue-btn" 
			tag="button" :to=" '/page-1/' + this.$route.params.login + '/' + this.$route.params.preset ">
				Перейти в калькулятор
			</router-link>
		</div>
	</section>
</template>


<script>
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'

	export default{
		computed: {
			...mapGetters({ 
				activePreset: "preset/getActivePreset",
				presetUser: "preset/getPresetUser",
				presetAvatar: "preset/getPresetAvatar",
				activePresetName: "preset/getActivePresetName",
			})
		},
		
		created(){

			let clientPres = {
				login: this.$route.params.login,
				preset: this.$route.params.preset
			}

			axios
            .get(`https://nikitapugachev.ru/wp-json/np/v1/calc/${clientPres.login}/${clientPres.preset}`)
            .then(res =>{

					console.log(res)
				
                	this.$store.dispatch('preset/loadActivePreset', res.data.playlist)
                	console.log(res.data.user_avatar)
                	this.$store.dispatch('preset/setPresetUser', res.data.user.data.display_name)
					this.$store.dispatch('preset/setPresetEmail', res.data.user.data.user_email)
                	this.$store.dispatch('preset/setPresetSlugs', clientPres)
                	this.$store.dispatch('preset/presetNameActivate', res.data.name)
                	this.$store.dispatch('preset/setPresetAvatar', res.data.user_avatar) 

                    // this.$router.replace(`/page-1/${clientPres.login}/${clientPres.preset}`)
                
            })

			

		}
	}
</script>

<style scoped>
#p404{
	height: calc(100vh - 110px);
	display: flex;
	justify-content: center;
	align-items: center;
} 
.avatar-box{
	justify-content: center;
}
.avatar{
	margin-right: 0;
	margin-bottom: 10px;
}
</style>