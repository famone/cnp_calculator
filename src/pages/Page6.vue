<template>
	<div v-if="calc">


		<editActor v-if="edit_actor"  
					@closeEditActor="closeEditActor"
					:editing="editing_actor"/>

		<editFilmer v-if="edit_filmer"  
					@closeEditFilmer="closeEditFilmer"
					:editing="editing_filmer"/>



		<div v-for="subsl in getCalcPage.subsItems">
			<Inner :innerTxt="subsl.name"/>


			<div class="container">
				<div class="col-lg-8">
					<div class="data-row" v-for="item in subsl.fields">


	

				<!-- Свитчер с актером -->

				<div v-if="item.type === 'Acter' && checEye(item.visible) " :class="{lessOpacity : !item.visible}">
					<div class="editable">
						<v-switch inset :label="item.name" v-model="item.value" :disabled="!item.visible"></v-switch>
						<div class="editable-btns">
							<button class="edit-mode-btn" @click="openActor(item)" v-if="editorMode">
								<span class="mdi mdi-lead-pencil"> <span class="hidden-xs">Настроить</span></span>
							</button>
							<button class="edit-mode-btn" @click="controlVisibility(item)"
						v-if="editorMode" :class="{showme : !item.visible}">
							<span class="mdi mdi-eye-off" v-if="item.visible"> <span class="hidden-xs"> Скрыть</span></span>
							<span class="mdi mdi-eye" v-else> <span class="hidden-xs"> Показать</span></span>
						</button>
						</div>
					</div>

					<div v-for="(actor, index) in item.options" v-if="item.value" 
					class="actor-box">
						<div class="delite-actor" v-if="item.options.length > 1" @click="deliteActor(item.options, index)">✕</div>

						<v-radio-group v-model="actor.pol" >
			      			<v-radio v-for="variant in sex" 
			      			:label="variant" :value="variant" ></v-radio>
			    		</v-radio-group>

			    		<p class="white-txt">
			      			<span class="blue-txt">от 
			      			{{(getLargest(actor.vybrannaya_oblast) * actor.kol_vo_smen).toLocaleString()}} ₽ / {{actor.kol_vo_smen}}  смен</span>
			      		</p>
			      		<v-slider step="1" min="1" max="30" v-model="actor.kol_vo_smen"></v-slider>

			      		<v-checkbox v-for="check in actor.oblast" v-model="actor.vybrannaya_oblast"
							:label="check.nazvanie + ' от ' + check.stoimst.toLocaleString() + ' ₽' " :value="check"
							@click="preventEmpty(actor, check, index)"></v-checkbox>

						<textarea placeholder="Описание внешности" v-model="actor.opisanie"></textarea>

					</div>

					<button class="blue-btn" @click="addActor(item)" v-if="item.value && item.options.length < 3">Добавить актера</button>
				</div>


				<!-- Свитчер с переработкой -->

				<div v-if="item.type === 'SimpleRange' && checEye(item.visible) " :class="{lessOpacity : !item.visible}">
					<div class="editable">
						<v-switch inset :label="item.name" v-model="item.value" :disabled="!item.visible"></v-switch>
						<div class="editable-btns">
							<button class="edit-mode-btn" @click="openFilmer(item)" v-if="editorMode">
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
			      		<p class="white-txt">
							<span v-if="item.id == 2459">Кол-во сек</span>
							<span v-else>Кол-во дней</span>
			      			<span class="blue-txt">от {{(item.options.kol_vo_dnej.stoimost * item.options.kol_vo_dnej.add_value).toLocaleString()}} ₽ / {{item.options.kol_vo_dnej.add_value}} 
								  <span v-if="item.id == 2459">сек</span>
								  <span v-else>cмен</span>
							  </span>
			      		</p>
						<v-slider v-if="item.id == 2459" step="5" min="5" max="240" v-model="item.options.kol_vo_dnej.add_value"></v-slider>
			      		<v-slider v-else step="1" min="1" max="30" v-model="item.options.kol_vo_dnej.add_value"></v-slider>

			      		<p class="white-txt">Переработка
			      			<span class="blue-txt">от {{(item.options.pererabtka.stoimost * item.options.pererabtka.add_value).toLocaleString()}} ₽ / {{item.options.pererabtka.add_value}} час</span>
			      		</p>
			      		<v-slider step="1" min="0" max="12" v-model="item.options.pererabtka.add_value"></v-slider>
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
import editActor from '../components/edit/editActor.vue'
import editFilmer from '../components/edit/editFilmer.vue'
import {mapState, mapGetters} from 'vuex'

	export default{
		components: {Inner, nextstep, editActor, editFilmer},
		data(){
			return{
				editorMode: false,
				sex: ['Мужчина', 'Женщина'],
				presetMode: false,
				edit_actor: false,
				editing_actor: {},
				edit_filmer: false,
				editing_filmer: {},
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
						return item.id == 25
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 25
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
			addActor(item){
				// console.log(item)
				// return
				let newActor =  { 
					pol: "Мужчина", 
					kol_vo_smen: 1, 
					oblast: [ 
						{ nazvanie: "Интернет", stoimst: item.options[0].oblast[0].stoimst },
						{ nazvanie: "Кино", stoimst: item.options[0].oblast[1].stoimst }, 
						{ nazvanie: "Телевидиние", stoimst: item.options[0].oblast[2].stoimst } 
					], 
					"vybrannaya_oblast": [ 
						{ nazvanie: "Интернет", stoimst: item.options[0].oblast[0].stoimst }
					], 
					opisanie: "" 
				}

				item.options.push(newActor)
			},
			deliteActor(item, index){
				item.splice(index, 1)
			},
			getLargest(oblast){
				let prices = []
				oblast.forEach(item =>{
					prices.push(parseInt(item.stoimst))	
				})

				let result = Math.max.apply(Math, prices)

				return result
			},
			openActor(param){
				this.edit_actor = true
				this.editing_actor = param
			},
			closeEditActor(){
				this.edit_actor = false
				this.editing_actor = {}
			},
			openFilmer(param){
				this.edit_filmer = true
				this.editing_filmer = param
			},
			closeEditFilmer(){
				this.edit_filmer = false
				this.editing_filmer = []
			},
			preventEmpty(actor, check, index){

				if(actor.vybrannaya_oblast.length){
					return
				}

				setTimeout(()=>{
					// actor.vybrannaya_oblast = check
					console.log(this.getCalcPage)
					this.getCalcPage.subsItems[1].fields[0].options[index].vybrannaya_oblast.push(check)


				}, 50)
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

