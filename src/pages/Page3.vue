<template>
	<div v-if="calc">


		<editDirector v-if="edit_director" 
					@closeEditDirector="closeEditDirector" 
					:editing="editing_director" />



		<div v-for="subsl in getCalcPage.subsItems">
			<Inner :innerTxt="subsl.name"/>


			<div class="container">
				<div class="col-lg-6">
					<div class="data-row" v-for="item in subsl.fields">


						
						
				<!-- простой рэнж-->

				<div v-if="item.type === 'Number' ">
					<h3>{{item.name}}</h3>
					<p class="white-txt">
						<span v-html="item.desc"></span>
						<span class="blue-txt">{{item.value}} 
							<span v-if="item.options.edinicza === 'number' ">смен</span>
							<span v-else>часов</span>
						</span>
					</p>
					<v-slider step="1" :min="item.options.rminimalnoe" :max="item.options.rmaksimalnoe" v-model="item.value" ></v-slider>
				</div>




				<!-- Свитчер с проектом и сменой -->

				<div v-if="item.type === 'Boolean' ">
					
					<div class="editable">
						<v-switch inset :label="item.name" v-model="item.value"></v-switch>
						<button class="edit-mode-btn" @click="openEditDirector(item, subsl.id)">
							<span class="mdi mdi-lead-pencil"> <span class="hidden-xs">Настроть</span></span>
						</button>
					</div>

				
					<p class="white-txt" v-if="!item.value">
						<span class="blue-txt op-5">от {{getPriceFrom(item.options.varianty)}} ₽</span>
					</p> 

					<div class="variants" v-if="item.value">
						<v-radio-group v-model="item.radio_value">
			      		<v-radio v-for="variant in item.options.varianty" 
			      		:label="variant.nazvanie + ' ' + variant.stoimost + ' ₽' " 
			      		:value="variant"></v-radio>

			      			
			      			<div v-if="item.radio_value.tip === 'range' ">
			      				<p class="white-txt">Кол-во дней 
			      					<span class="blue-txt">{{item.radio_value.add_value}} cмен / от {{item.radio_value.add_value * item.radio_value.stoimost}} ₽</span>
			      				</p>
			      				<v-slider step="1" min="1" max="30" v-model="item.radio_value.add_value"></v-slider>
			      			</div>

			    		</v-radio-group>
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

		


		<!-- <div class="container">
			<div class="col-lg-6">


			<div class="data-row">
				<h3>Возраст целевой аудитории</h3>
				<p class="white-txt">
					<span class="blue-txt">от {{vozrast[0]}} до {{vozrast[1]}} лет</span>
				</p>
				<v-range-slider class="my-double" v-model="vozrast" min="0" max="100" thumb-size="64"></v-range-slider>	
			</div>



			<div class="data-row">
				<h1 style="font-size: 64px;line-height: 60px;">Описание продукта
				или услуги</h1>
			</div>





  
				

<nextstep />


			</div>
		</div> -->
	</div>
</template>

<script>
import Inner from '../components/Inner.vue'
import nextstep from '../components/nextstep.vue'
import editDirector from '../components/edit/editDirector.vue'
import {mapState, mapGetters} from 'vuex'

	export default{
		components: {Inner, nextstep, editDirector},
		data(){
			return{
				vozrast: [18, 55],
				edit_director: false,
				editing_director: [],
				editing_category: null
			}
		},
		computed: {
			...mapGetters({ calc: "smeta/getCalc"}),
			getCalcPage(){
				let page = this.calc.find(item => {
					return item.id == 31
				})

				return page
			}
		},
		methods: {
			openEditDirector(param, subsl_id){
				this.edit_director = true
				this.editing_director = param
				this.editing_category = subsl_id

				console.log(this.editing_category)
			},
			closeEditDirector(){
				this.edit_director = false
				this.editing_director = []
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
			showValRadio(val, obj, subsl_id){

				let page = this.calc.find(item => {
					return item.id == 28
				})

				let category = page.subsItems.find(item =>{
					return item.id == subsl_id
				})

				let pageObj = category.fields.find(item =>{
					return item.id == obj.id
				})

				pageObj.value = val
			},
			showVal(e, inp, subsl_id){


				let page = this.calc.find(item => {
					return item.id == 31
				})


				let category = page.subsItems.find(item =>{
					return item.id == subsl_id
				})

				let pageObj = category.fields.find(item =>{
					return item.id == inp.id
				})

				pageObj.value = e.target.value
			}
		}
	}
</script>