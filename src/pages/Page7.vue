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


	

				<!-- Свитчер с переработкой -->

				<div v-if="item.type === 'SingleSlider' ">
					<div class="editable">
						<v-switch inset :label="item.name" v-model="item.value"></v-switch>
						<div>
							<button class="edit-mode-btn" @click="openFilmer(item, subsl.id)" v-if="editorMode">
								<span class="mdi mdi-lead-pencil"> <span class="hidden-xs">Настроть</span></span>
							</button>
							<button class="edit-mode-btn" @click="controlVisibility(item)"
						v-if="editorMode">
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
			      			<span class="blue-txt">от {{(item.options.stoimost * item.options.kol_vo).toLocaleString()}} ₽ / {{item.options.kol_vo}} шт</span>
			      		</p>
			      		<v-slider v-if="item.id == 595" step="5" min="5" max="240" v-model="item.options.kol_vo"></v-slider>
			      		<v-slider v-else step="1" min="1" max="30" v-model="item.options.kol_vo"></v-slider>
			      	</div>
				</div>


				<!-- Свитчер с монтажем -->

				<div v-if="item.type === 'Montazh' ">
					<div class="editable">
						<v-switch inset :label="item.name" v-model="item.value"></v-switch>
						<div>
							<button class="edit-mode-btn" @click="openMontazh(item)" v-if="editorMode">
								<span class="mdi mdi-lead-pencil"> <span class="hidden-xs">Настроть</span></span>
							</button>
							<button class="edit-mode-btn" @click="controlVisibility(item)"
						v-if="editorMode">
							<span class="mdi mdi-eye-off" v-if="item.visible"> <span class="hidden-xs"> Скрыть</span></span>
							<span class="mdi mdi-eye" v-else> <span class="hidden-xs"> Показать</span></span>
						</button>
						</div>
					</div>
					<!-- <p class="red">{{}}</p> -->
					<p class="white-txt" v-if="!item.value">
						<span class="blue-txt op-5">от {{item.options[0].stoimost}} ₽</span>
					</p> 

				
					<div v-if="item.value">
			      		<div v-for="(rolik, index) in item.options" class="actor-box">
			      			<div class="delite-actor" v-if="item.options.length > 1" 
			      				@click="deliteRolik(item.options, index)">✕</div>


			      			<p class="white-txt">
			      			{{index+1}}-й ролик	<span class="blue-txt">от {{rolik.vremya * rolik.stoimost}}  ₽ / {{rolik.vremya}} сек</span>
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
				activePreset: "preset/getActivePreset"
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
			controlVisibility(item){
				item.visible = !item.visible 
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
		}
	}
</script>