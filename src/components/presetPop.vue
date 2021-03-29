<template>
	<div class="edit-pop" @click="closePop">
		<div class="edit-pop-box" @click.stop>
			<h3 class="text-left">Добавить пресет</h3>
			<div class="ed-inp-row">
				<label for="">Введите имя пресета:</label>
				<input type="text" v-model="presetName">
			</div>
			<div class="ed-inp-row text-center" v-if="load">
				<loading />
			</div>
			
			<div class="ed-inp-row text-center" v-else>
				<button class="exit-btn" @click="closePop">Отмена</button>
				<button class="blue-btn" @click="addToPreset()">Добавить</button>
			</div>	
			 
		</div>
	</div>
</template>


<script>
import {mapGetters} from 'vuex'
import loading from '../components/loading.vue'

	export default{
		components: {loading},
		data(){
			return{
				presetName: '',
				load: false
			}
		},
		computed: {
			...mapGetters({ 
				calc: "smeta/getCalc",
				user: "auth/getAuthenticated"
			})
		},
		methods: {
			addToPreset(){

				if(!this.user){
					this.$router.replace("/enter");
					return
				}


				this.load = true

				let pres = {
					user_id: this.user.id,
					json: this.calc,
					name: this.presetName
				}
				this.$store.dispatch('preset/addToPreset', pres).then(() => {
					this.$emit("closePop")
					this.$router.replace("/profile");
				});
			},
			closePop(){
				this.$emit("closePop")

			}
		}
	}
</script>