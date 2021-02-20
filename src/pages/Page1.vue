<template>
	<div>
		
		<Inner v-if="calc" :innerTxt="getCalcPage.name"/>

		

	<div class="container">
			<div class="col-lg-6">


		<div v-if="calc">
			<div class="data-row"  v-for="item in getCalcPage.fields">

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
					<v-slider step="1" :min="item.options.rminimalnoe" :max="item.options.rmaksimalnoe" v-model="item.value" ></v-slider>
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
				</div>
				
			</div>
		</div>
		<!-- <button class="blue-btn" @click="calcPrice()">ПОСЧИТАТЬ</button> -->


			<!-- <nextstep /> -->





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
				presetMode: false
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
		},
		computed: {
			...mapGetters({ 
				calc: "smeta/getCalc",
				activePreset: "preset/getActivePreset"
			}),
			getCalcPage(){
				let page = ''

				if(this.presetMode){
					console.log(this.activePreset)
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
		}
	}
</script>