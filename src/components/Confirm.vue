<template>
	<div class="edit-pop" @click="closeConfirm($emit)">
		<div class="edit-pop-box text-center" @click.stop>
			<h3>Вы уверены?</h3>
			<button class="blue-btn" @click="closeConfirm($emit)">Отмена</button>
			<button class="blue-btn" @click="toDefault()" >Да</button>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'

	export default{
		data(){
			return{
				presetMode: false
			}
		},
		computed: {
			...mapGetters({ 
				calc: "smeta/getCalc",
				activePreset: "preset/getActivePreset",
				user: "auth/getAuthenticated",
				presetSlugs: "preset/getPresetSlugs",
				presetUser: "preset/getPresetUser"
			}),
		},
		methods: {
			//  к дефолтам
			toDefault(){

				if(this.presetMode){
					this.activePreset.forEach(item =>{
						if(item.calculated){
							item.subsItems.forEach(sub => {
								sub.fields.forEach(field =>{
									if(field.type === 'Boolean'){
										field.value = false
									}
									if(field.type === 'SimpleRange'){
										field.value = false
									}
									if(field.type === 'SingleSlider'){
										field.value = false
									}
									if(field.type === 'Acter'){
										field.value = false
									}
									if(field.type === 'Montazh'){
										field.value = false
									}
								})
							})
						}
					})
					// очиска оборудования
					this.activePreset[3].products.cat.forEach(item =>{
						if(item.subsItems){
							item.subsItems.forEach(sub =>{
								sub.items.forEach(product =>{
									product.count = 0
								})
							})
						}
					})
					// очистка вводных
					this.activePreset[0].fields.forEach(item =>{
						if(item.type === 'Radio' || item.type === 'Datepicker' || item.type === 'Text' ){
							item.value = ''
						}
						if(item.type === 'Checkbox'){
							item.value = []
						}
						if(item.id == 439 || item.id == 440){
							item.value = 0
						}
						if(item.id == 424){
							item.value = 5
						}
					})
					this.activePreset[1].subsItems.forEach(sub =>{
						console.log(sub)
						sub.fields.forEach(field =>{
							if(field.type === 'Radio' || field.type === 'Text'){
								field.value = ''
							}
							if(field.type === 'Checkbox'){
								field.value = []
							}
							if(field.type === 'Range'){
								field.value = [14, 60]
							}
						})
					})

					// очистка хрона
					this.activePreset[2].subsItems[0].fields[0].value = 1
					this.activePreset[2].subsItems[0].fields[1].value = 0

				}else{
					this.calc.forEach(item =>{
						if(item.calculated){
							item.subsItems.forEach(sub => {
								sub.fields.forEach(field =>{
									if(field.type === 'Boolean'){
										field.value = false
									}
									if(field.type === 'SimpleRange'){
										field.value = false
									}
									if(field.type === 'SingleSlider'){
										field.value = false
									}
									if(field.type === 'Acter'){
										field.value = false
									}
									if(field.type === 'Montazh'){
										field.value = false
									}
								})
							})
						}
					})


					// очиска оборудования
					this.calc[3].products.cat.forEach(item =>{
						if(item.subsItems){
							item.subsItems.forEach(sub =>{
								sub.items.forEach(product =>{
									product.count = 0
								})
							})
						}
					})

					// очистка вводных
					this.calc[0].fields.forEach(item =>{
						if(item.type === 'Radio' || item.type === 'Datepicker' || item.type === 'Text' ){
							item.value = ''
						}
						if(item.type === 'Checkbox'){
							item.value = []
						}
						if(item.id == 439 || item.id == 440){
							item.value = 0
						}
						if(item.id == 424){
							item.value = 5
						}
					})
					this.calc[1].subsItems.forEach(sub =>{
						console.log(sub)
						sub.fields.forEach(field =>{
							if(field.type === 'Radio' || field.type === 'Text'){
								field.value = ''
							}
							if(field.type === 'Checkbox'){
								field.value = []
							}
							if(field.type === 'Range'){
								field.value = [14, 60]
							}
						})
					})

					// очистка хрона
					this.calc[2].subsItems[0].fields[0].value = 1
					this.calc[2].subsItems[0].fields[1].value = 0


				}
				this.$emit('closeConfirm')

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