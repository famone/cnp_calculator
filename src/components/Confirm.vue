<template>
	<div class="edit-pop" @click="closeConfirm($emit)">
		<div class="edit-pop-box text-center" @click.stop>
			<h3>Вы уверены?</h3>
			<button class="blue-btn" @click="closeConfirm($emit)">Отмена</button>
			<button class="blue-btn" @click="clearCalc()" >Да</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				presetMode: false
			}
		},
		methods: {
			clearCalc(){
				if(this.presetMode){
					this.$store.dispatch('preset/clearActivePreset')
					this.$emit('closeConfirm')
					this.$router.replace('/profile')
				}else{
					this.$store.dispatch('smeta/getCalc')
					this.$emit('closeConfirm')
				}
				
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