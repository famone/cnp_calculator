<template>
	<div v-if="calc">


		<editDirector v-if="edit_director" 
					@closeEditDirector="closeEditDirector" 
					:editing="editing_director" />

		<editFilmer v-if="edit_filmer"  
					@closeEditFilmer="closeEditFilmer"
					:editing="editing_filmer"/>

		<editSingle v-if="edit_single"  
					@closeEditSingle="closeEditSingle"
					:editing="editing_single"/>



		<div v-for="subsl in getCalcPage.subsItems">
			<Inner :innerTxt="subsl.name"/>



			<div class="container">
				<div class="col-lg-8">
					<div class="data-row" v-for="item in subsl.fields">


						
						
				<!-- простой рэнж-->

				<div v-if="item.type === 'Number' ">
					<h3>{{item.name}}</h3>
					<p class="white-txt">
						<span v-if="item.options.edinicza === 'number' ">Кол-во дней </span>
						<span v-else-if="item.options.edinicza === 'smen' ">Кол-во дней </span>
						<span v-else="item.options.edinicza === 'smen' ">Кол-во часов </span>
						 
						<span class="blue-txt">{{item.value}} 
							<span v-if="item.options.edinicza === 'number' ">смен</span>
							<span v-else-if="item.options.edinicza === 'smen' ">дней</span>
							<span v-else>часов</span>
						</span>
					</p>
					<v-slider step="1" :min="item.options.rminimalnoe" :max="item.options.rmaksimalnoe" v-model="item.value" @input="allSmens(item)"></v-slider>
				</div>




				<!-- Свитчер с проектом и сменой -->


				<div v-if="item.type === 'Boolean' && checEye(item.visible)" :class="{lessOpacity : !item.visible}">
					<div class="editable">
						<v-switch inset :label="item.name" v-model="item.value" :disabled="!item.visible"></v-switch>
						<div class="editable-btns">
							<button class="edit-mode-btn" @click="openEditDirector(item, subsl.id)"
						v-if="editorMode">
							<span class="mdi mdi-lead-pencil"> <span class="hidden-xs">Настроить</span></span>
						</button>
						<button class="edit-mode-btn" @click="controlVisibility(item)"
						v-if="editorMode" :class="{showme : !item.visible}">
							<span class="mdi mdi-eye-off" v-if="item.visible"> <span class="hidden-xs"> Скрыть</span></span>
							<span class="mdi mdi-eye" v-else> <span class="hidden-xs"> Показать</span></span>
						</button>
						</div>
					</div>

				
					<p class="white-txt" v-if="!item.value">
						<span class="blue-txt op-5">от {{getPriceFrom(item.options.varianty).toLocaleString()}} ₽</span>
					</p> 

					<div class="variants" v-if="item.value">
						<v-radio-group v-model="item.radio_value">

			      			<v-radio v-for="variant in item.options.varianty" 
			      			:label="variant.nazvanie + ' ' + variant.stoimost.toLocaleString() + ' ₽' " 
			      			:value="variant.tip" @click="showValRadio(variant, item)"></v-radio>
			      		

			      			
			      			<div v-if="item.radio_value === 'range' ">
			      				<p class="white-txt">Кол-во дней 
			  					<span class="blue-txt">от {{(item.radio_itog.add_value * item.radio_itog.stoimost).toLocaleString()}} ₽ / {{item.radio_itog.add_value}} cмен</span>
			      				</p>
			      				<v-slider step="1" min="1" max="30" v-model="item.radio_itog.add_value"></v-slider>
			      			</div>

			    		</v-radio-group>
					</div>
				</div>	



				<!-- Свитчер с переработкой -->

				<div v-if="item.type === 'SimpleRange' && checEye(item.visible)" :class="{lessOpacity : !item.visible}">
					<!-- <pre>{{item}}</pre> -->
					<div class="editable">
						<v-switch inset :label="item.name" v-model="item.value" :disabled="!item.visible"></v-switch>
						<div class="editable-btns">
						<button class="edit-mode-btn" @click="openFilmer(item, subsl.id)" v-if="editorMode">
							<span class="mdi mdi-lead-pencil"> <span class="hidden-xs">Настроить</span></span>
						</button>
						<button class="edit-mode-btn" @click="controlVisibility(item)"
						v-if="editorMode" :class="{showme : !item.visible}">
							<span class="mdi mdi-eye-off" v-if="item.visible"> <span class="hidden-xs"> Скрыть</span></span>
							<span class="mdi mdi-eye" v-else> <span class="hidden-xs"> Показать</span></span>
						</button>
						</div>
					</div>

					<p class="white-txt" v-if="!item.value">
						<span class="blue-txt op-5">от {{(item.options.kol_vo_dnej.stoimost).toLocaleString()}} ₽</span>
					</p> 


					<div v-if="item.value">
			      		<p class="white-txt">Кол-во дней 
			      			<span class="blue-txt">от {{(item.options.kol_vo_dnej.stoimost * item.options.kol_vo_dnej.add_value).toLocaleString()}}  ₽ / {{item.options.kol_vo_dnej.add_value}} cмен</span>
			      		</p>
			      		<v-slider step="1" min="1" max="30" v-model="item.options.kol_vo_dnej.add_value"></v-slider>

			      		<p class="white-txt">Переработка
			      			<span class="blue-txt">от {{(item.options.pererabtka.stoimost * item.options.pererabtka.add_value).toLocaleString()}}  ₽ / {{item.options.pererabtka.add_value}} час</span>
			      		</p>
			      		<v-slider step="1" min="0" max="12" v-model="item.options.pererabtka.add_value"></v-slider>
			      	</div>



				</div>



				<!-- раскадровка -->

				<div v-if="item.type === 'SingleSlider' && checEye(item.visible)">
					<div class="editable">
						<v-switch inset :label="item.name" v-model="item.value" :disabled="!item.visible"></v-switch>
						
						<div class="editable-btns">
							<button class="edit-mode-btn" @click="openSingle(item, subsl.id)" v-if="editorMode">
								<span class="mdi mdi-lead-pencil"> <span class="hidden-xs">Настроить</span></span>
							</button>
							<button class="edit-mode-btn" @click="controlVisibility(item)"
						v-if="editorMode" :class="{showme : !item.visible}">
							<span class="mdi mdi-eye-off" v-if="item.visible"> <span class="hidden-xs"> Скрыть</span></span>
							<span class="mdi mdi-eye" v-else> <span class="hidden-xs"> Показать</span></span>
						</button>
						</div>
					</div>

					<p class="white-txt" v-if="!item.value">
						<span class="blue-txt op-5">от {{(item.options.stoimost).toLocaleString()}} ₽</span>
					</p> 


					<div v-if="item.value">
			      		<p class="white-txt">
			      			<span class="blue-txt">от {{(item.options.stoimost * item.options.kol_vo).toLocaleString()}} ₽ / {{item.options.kol_vo}} кадров</span>
			      		</p>
			      		<v-slider step="1" min="0" max="80" v-model="item.options.kol_vo"></v-slider>
			      	</div>



				</div>




					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="col-lg-6">
				<nextstep />
			</div>
		</div>


	</div>
</template>

<script>
import Inner from '../components/Inner.vue'
import nextstep from '../components/nextstep.vue'
import editDirector from '../components/edit/editDirector.vue'
import editFilmer from '../components/edit/editFilmer.vue'
import editSingle from '../components/edit/editSingle.vue'
import {mapState, mapGetters} from 'vuex'

	export default{
		components: {Inner, nextstep, editDirector, editFilmer, editSingle},
		data(){
			return{
				editorMode: false,
				presetMode: false,
				edit_director: false,
				editing_director: [],
				editing_category: null,
				edit_filmer: false,
				editing_filmer: [],
				edit_filmer_cat: null,
				edit_single: false,
				editing_single: []
			}
		},
		computed: {
			...mapGetters({ 
				user: "auth/getAuthenticated",
				calc: "smeta/getCalc",
				activePreset: "preset/getActivePreset",
				presetSlugs: "preset/getPresetSlugs"
			}),
			getCalcPage(){
				let page = ''

				if(this.presetMode){
					page = this.activePreset.find(item => {
						return item.id == 31
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 31
					})
				}
				

				return page
			}
		},
		methods: {
			checEye(vis){
				if(this.presetMode){
					
					if(this.user){
						if(!vis && this.presetSlugs.login !== this.user.user_nicename){
							return false
						}else{
							return true
						}
					}else{
						if(vis){
							return true
						}else{
							return false
						}
					}
				}else{
					return true
				}
			},
			controlVisibility(item){
				item.visible = !item.visible 
				item.value = false
			},
			openEditDirector(param, subsl_id){
				this.edit_director = true
				this.editing_director = param
				this.editing_category = subsl_id
			},
			closeEditDirector(){
				this.edit_director = false
				this.editing_director = []
			},
			openFilmer(param){
				this.edit_filmer = true
				this.editing_filmer = param
			},
			closeEditFilmer(){
				this.edit_filmer = false
				this.editing_filmer = []
			},
			openSingle(param){
				this.edit_single = true
				this.editing_single = param
			},
			closeEditSingle(){
				this.edit_single = false
				this.editing_single = []
			},
			getPriceFrom(variks){
				let compare1 = variks[0].stoimost
				let compare2 = variks[1].stoimost


				if(compare1 < compare2){
					return compare1
				}else{
					return compare2
				}
			},
			showValRadio(variant, item){

				let page = ''

				if(this.presetMode){
					page = this.activePreset.find(item => {
						return item.id == 28
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 28
					})
				}
				
				item.radio_itog = variant
			},
			showVal(e, inp, subsl_id){

				let page = ''

				if(this.presetMode){
					console.log(this.activePreset)
					page = this.activePreset.find(item => {
						return item.id == 31
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 31
					})
				}


				let category = page.subsItems.find(item =>{
					return item.id == subsl_id
				})

				let pageObj = category.fields.find(item =>{
					return item.id == inp.id
				})

				pageObj.value = e.target.value
			},
			allSmens(item){
				// приводим оборудование к общему кол-ву смен

				

			if(item.id == 420){
				// для оборудования
				if(this.presetMode){
					
					let page = this.activePreset.find(item => {
									return item.id == 23
								})
					let smenAmount = this.activePreset[2].subsItems[0].fields[0].value
						page.products.cat.forEach(category =>{
						if(category.subsItems){
							category.subsItems.forEach(sub =>{
								sub.items.forEach(item =>{
									item.smen = smenAmount
								})
							})
						}				
					})

				}else{
					let page = this.calc.find(item => {
									return item.id == 23
								})
					let smenAmount = this.calc[2].subsItems[0].fields[0].value
				page.products.cat.forEach(category =>{
						if(category.subsItems){
							category.subsItems.forEach(sub =>{
								sub.items.forEach(item =>{
									item.smen = smenAmount
								})
							})
						}	
					})
				}

				// для спецов всех

				if(this.presetMode){
					let smenAmount = this.activePreset[2].subsItems[0].fields[0].value
					this.activePreset.forEach(page => {
						if(page.calculated == true){
							page.subsItems.forEach(sub => {
								sub.fields.forEach(field =>{
									if(field.type === 'Boolean'){
										field.options.varianty[1].add_value = smenAmount
									}
									if(field.type === 'SimpleRange'){
										field.options.kol_vo_dnej.add_value = smenAmount
									}
									if(field.type === 'Acter'){
										field.options[0].kol_vo_smen = smenAmount
									}
									if(field.type === 'SingleSlider'){
										field.options.kol_vo = smenAmount
									}
								})
							})
						}
					})
				}else{
					let smenAmount = this.calc[2].subsItems[0].fields[0].value
					this.calc.forEach(page => {
						if(page.calculated == true){
							page.subsItems.forEach(sub => {
								sub.fields.forEach(field =>{
									if(field.type === 'Boolean'){
										field.options.varianty[1].add_value = smenAmount
									}
									if(field.type === 'SimpleRange'){
										field.options.kol_vo_dnej.add_value = smenAmount
									}
									if(field.type === 'Acter'){
										field.options[0].kol_vo_smen = smenAmount
									}
									if(field.type === 'SingleSlider' && field.id !== 595){
										field.options.kol_vo = smenAmount
									}

								})
							})
						}
					})
				}
			}


			if(item.id == 422){
				// для всех переработок

				if(this.presetMode){
					let overAmount = this.activePreset[2].subsItems[0].fields[1].value
					this.activePreset.forEach(page => {
						if(page.calculated == true){
							page.subsItems.forEach(sub => {
								sub.fields.forEach(field =>{
									if(field.type === 'SimpleRange'){
										field.options.pererabtka.add_value = overAmount
									}
								})
							})
						}
					})
				}else{
					let overAmount = this.calc[2].subsItems[0].fields[1].value
					this.calc.forEach(page => {
						if(page.calculated == true){
							page.subsItems.forEach(sub => {
								sub.fields.forEach(field =>{
									if(field.type === 'SimpleRange'){
										field.options.pererabtka.add_value = overAmount
									}

								})
							})
						}
					})
				}
			}

			
			}
		},
		created(){
			if(this.$route.params.id !== undefined){
				this.presetMode = true
				if(this.$route.params.name === this.user.user_nicename){
					this.editorMode = true
				}else{
					this.editorMode = false
				}
			}else{
				this.presetMode = false
				this.editorMode = true
			}

			console.log(this.calc)
		},
		// beforeRouteLeave(to, from, next){
		// 	if(this.activePreset){
		// 		let pres = {
		// 			user_id: this.user.id,
		// 			json: this.activePreset,
		// 			name: this.presetSlugs.preset
		// 		}
		// 		this.$store.dispatch('preset/updatePreset', pres)
		// 	}
		// 	next()
		// }
	}
</script>