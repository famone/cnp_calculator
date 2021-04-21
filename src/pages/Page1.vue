<template>
	<div>
		
		<Inner v-if="calc" :innerTxt="getCalcPage.name"/>

		

	<div class="container">
			<div class="col-lg-6">


		<div v-if="calc">
			<div class="data-row"  v-for="item in getCalcPage.fields">

				<!-- datepicker -->
			
				<div v-if="item.type === 'Datepicker' " style="width: 50%;">
					<h3>{{item.name}}</h3>
					<v-date-picker :min-date='new Date()' is-expanded  v-model="item.value" color="blue" :model-config="modelConfig" />
					<br><br>
				</div>

				<!-- текстареа -->

				<div v-if="item.type === 'Text' ">
					<h3>{{item.name}}</h3>
					<textarea :placeholder="item.name" :value="item.value" @input="showVal($event, item)"></textarea>
				</div>
				
				<!-- простой рэнж -->

				<div v-if="item.type === 'Number' ">
					<h3>{{item.name}}</h3>
					<p class="white-txt">
						<span class="blue-txt">{{item.value}} 
							<span v-if="item.options.edinicza === 'number' ">сек</span>
							<span v-else>%</span>
						</span>
					</p>
					<v-slider v-if="item.id == 424" step="5" min="5" max="240" v-model="item.value" @change="allChrono"></v-slider>

					<v-slider v-else step="1" :min="item.options.rminimalnoe" :max="item.options.rmaksimalnoe" v-model="item.value"></v-slider>
				</div>

				<!-- радио-->

				<div v-if="item.type === 'Radio'">
					<h3>{{item.name}}</h3>
					<v-radio-group @change="showValRadio($event, item)" v-model="item.value">
			      		<v-radio v-for="variant in item.options.variants" :label="variant.tekst" :value="variant.tekst"></v-radio>
			    	</v-radio-group>
				</div>

				<!-- чекбокс-->

				<div v-if="item.type === 'Checkbox'">

					<h3>{{item.name}}</h3>
					<v-checkbox v-for="check in item.options.variants" v-model="item.value"
					:label="check.tekst" :value="check.tekst"></v-checkbox>
					<!-- <div v-if="item.id == 437 && item.value.includes('Другой')">
						<label for="">Укажите город :</label>
						<input type="text" placeholder="Название города" 
						@input="changeCity(item, $event)" >
					</div> -->
				</div>
				
			</div>
		</div>
		<!-- <button class="blue-btn" @click="calcPrice()">ПОСЧИТАТЬ</button> -->


			<nextstep />





			</div>
		</div>
	</div>
</template>

<script>
import Inner from '../components/Inner.vue'
import nextstep from '../components/nextstep.vue'
import {mapState, mapGetters} from 'vuex'
	export default{
		components: {Inner, nextstep},
		data(){
			return{
				ex2: 5,
				presetMode: false,
				checkDate: '',
				modelConfig: {
					type: 'string',
					mask: 'DD-MM-YYYY', 
				},
			}
		},
		methods: {
			showValRadio(val, obj){

				let page = this.calc.find(item => {
					return item.id == 22
				})

				let pageObj = page.fields.find(item =>{
					return item.id == obj.id
				})

				pageObj.value = val
			},
			showVal(e, inp){

				let page = this.calc.find(item => {
					return item.id == 22
				})

				let pageObj = page.fields.find(item =>{
					return item.id == inp.id
				})

				pageObj.value = e.target.value
			},
			allChrono(){
				let chronoAmount = this.calc[0].fields[1].value


				
				if(this.presetMode){
					this.activePreset[7].subsItems[0].fields[2].options.kol_vo = chronoAmount
					this.activePreset[7].subsItems[0].fields[0].options[0].vremya = chronoAmount
					this.activePreset[2].subsItems[6].fields[0].options.kol_vo = Math.round(chronoAmount/3)
				}else{
					this.calc[7].subsItems[0].fields[2].options.kol_vo = chronoAmount
					this.calc[7].subsItems[0].fields[0].options[0].vremya = chronoAmount
					this.calc[2].subsItems[6].fields[0].options.kol_vo = Math.round(chronoAmount/3)
				}
			},
		},
		computed: {
			...mapGetters({ 
				calc: "smeta/getCalc",
				activePreset: "preset/getActivePreset",
				user: "auth/getAuthenticated",
				presetSlugs: "preset/getPresetSlugs"
			}),
			getCalcPage(){
				let page = ''

				if(this.presetMode){
					page = this.activePreset.find(item => {
						return item.id == 22
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 22
					})
				}
				

				return page
			}
		},
		created(){
			if(this.$route.params.id !== undefined){
				this.presetMode = true
			}else{
				this.presetMode = false
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

<style scoped>
input[type="text"]{
	display:block;
	width: 100%;
	padding: 15px;
	border:none;
	border-radius: 5px;
	background-color: #fff!important;
	color: #000;
	font-weight: 600!important;
}
label{
	color: #2E97E6;
    font-weight: 400;
    font-size: 14px;
}
</style>