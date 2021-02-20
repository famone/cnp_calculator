<template>
	<section id="p404">
		<div class="container text-center">
			<h1>Загружаем пресет</h1>
		</div>
	</section>
</template>


<script>
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'

	export default{
		computed: {
			...mapGetters({ 
				activePreset: "preset/getActivePreset"
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
                if(res.data.status == 404){
                    this.$router.replace('/404')
                }else{
                	this.$store.dispatch('preset/loadActivePreset', res.data.playlist)
                	this.$store.dispatch('preset/setPresetSlugs', clientPres)
                    this.$router.replace(`/page-1/${clientPres.login}/${clientPres.preset}`)
                }
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
</style>