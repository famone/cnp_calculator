<template>
	<div v-if="calc">


		<editSingle v-if="edit_single"  
					@closeEditSingle="closeEditSingle"
					:editing="editing_single"/>

		<editMontazh v-if="edit_montazh"  
					@closeEditMontazh="closeEditMontazh"
					:editing="editing_montazh"/>



		<div v-for="subsl in getCalcPage.subsItems">
			<Inner :innerTxt="subsl.name"/>


			<div class="container">
				<div class="col-lg-8">
					<div class="data-row" v-for="item in subsl.fields">


	

				<!-- Свитчер с секундами -->

				<div v-if="item.type === 'SingleSlider' && checEye(item.visible)" :class="{lessOpacity : !item.visible}">
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
						<span class="blue-txt op-5">от {{(item.options.stoimost).toLocaleString()}} ₽</span>
					</p> 
					

					<div v-if="item.value">
			      		<p class="white-txt">
			      			<span class="blue-txt">от {{(item.options.stoimost * item.options.kol_vo).toLocaleString()}} ₽ / {{item.options.kol_vo}} 
								<span v-if="item.id == 594 || item.id == 596">шт</span>
								<span v-else>сек</span>
			      			</span>
			      		</p>
			      		<v-slider v-if="item.id == 595 || item.id == 2337" step="5" min="5" max="240" 
						  v-model="item.options.kol_vo"></v-slider>
			      		<v-slider v-else step="1" min="1" max="30" v-model="item.options.kol_vo"></v-slider>
			      	</div>
				</div>


				<!-- Свитчер с монтажем -->

				<div v-if="item.type === 'Montazh' && checEye(item.visible)" :class="{lessOpacity : !item.visible}">
					<div class="editable">
						<v-switch inset :label="item.name" v-model="item.value" :disabled="!item.visible"></v-switch>
						<div class="editable-btns">
							<button class="edit-mode-btn" @click="openMontazh(item)" v-if="editorMode">
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
						<span class="blue-txt op-5">от {{parseInt(item.options[0].stoimost).toLocaleString()}} ₽</span>
					</p> 

				
					<div v-if="item.value">
			      		<div v-for="(rolik, index) in item.options" class="actor-box">
			      			<div class="delite-actor" v-if="item.options.length > 1" 
			      				@click="deliteRolik(item.options, index)">✕</div>


			      			<p class="white-txt">
			      			{{index+1}}-й ролик	<span class="blue-txt">от {{(rolik.vremya * rolik.stoimost).toLocaleString()}}  ₽ / {{rolik.vremya}} сек</span>
			      			</p>
			      			<v-slider step="5" min="5" max="240" v-model="rolik.vremya"></v-slider>
			      			<textarea placeholder="Пример описания" v-model="rolik.opisanie"></textarea>
			      		</div>
			      		<button class="blue-btn" v-if="item.value && item.options.length < 3"
			      		@click="addRolik(item)">Добавить ролик</button>
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
import editSingle from '../components/edit/editSingle.vue'
import editMontazh from '../components/edit/editMontazh.vue'
import {mapState, mapGetters} from 'vuex'

	export default{
		components: {Inner, nextstep, editSingle, editMontazh},
		data(){
			return{
				editorMode: false,
				presetMode: false,
				edit_single: false,
				editing_single: [],
				edit_montazh: false,
				editing_montazh: {}
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
						return item.id == 26
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 26
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
			openFilmer(param){
				this.edit_single = true
				this.editing_single = param
			},
			closeEditSingle(){
				this.edit_single = false
				this.editing_single = []
			},
			addRolik(item){
				let newRolik = {
					opisanie: "",
					stoimost: item.options[0].stoimost,
					vremya: 1
				}
				item.options.push(newRolik)
			},
			deliteRolik(item, index){
				item.splice(index, 1)
			},
			openMontazh(param){
				this.edit_montazh = true
				this.editing_montazh = param
			},
			closeEditMontazh(){
				this.edit_montazh = false
				this.editing_montazh = {}
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
		},
		// beforeRouteLeave(to, from, next){
		// 		let pres = {
		// 			user_id: this.user.id,
		// 			json: this.activePreset,
		// 			name: this.presetSlugs.preset
		// 		}
		// 		this.$store.dispatch('preset/updatePreset', pres)
		// 		next()
		// }
	}
</script>