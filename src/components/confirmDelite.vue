<template>
	<div class="edit-pop" @click="closeConfirm($emit)">
		<div class="edit-pop-box text-center" @click.stop>
			<h3>Вы уверены?</h3>
			<button class="blue-btn" @click="closeConfirm($emit)">Отмена</button>
			<button class="blue-btn" @click="delitePreset()" >Да</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

	export default{
		props: {
			delitingPreset: {
				type: String,
				required: true
			}
		},
		computed: {
			...mapGetters({ 
				user: "auth/getAuthenticated",
				presets: "preset/getPresets"
			}),
		},
		data(){
			return{
				presetMode: false
			}
		},
		methods: {
			delitePreset(){
				axios
				 .get(`https://nikitapugachev.ru/wp-json/np/v1/delete/calc/presets?user_id=${this.user.id}&playlist_slug=${this.delitingPreset}`)
				 .then(res =>{
				 	this.$store.dispatch('preset/clearActivePreset')
				 	this.$store.dispatch('preset/clearActivePresetName')
					this.$store.dispatch('preset/changePresetsAmount', res.data)
				 	this.closeConfirm()
				 })

			},
			closeConfirm(){
				this.$emit('closeConfirm')
			}
		},
		created(){
			if(this.$route.params.id !== undefined){
				this.presetMode = true
			}else{
				this.presetMode = false
			}
		}
	}
</script>