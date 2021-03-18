<template>
	<div v-if="calc">


		<div v-for="subsl in getCalcPage.subsItems">
			<Inner :innerTxt="subsl.name"/>


			<div class="container">
				<div class="col-lg-6">
					<div class="data-row" v-for="item in subsl.fields">

						<!-- от и до -->

						<div v-if="item.type === 'Range' ">
							<h3>{{item.name}}</h3>
							<p class="white-txt">
					<span class="blue-txt">от {{item.value[0]}} до {{item.value[1]}} лет</span>
				</p>
							<v-range-slider class="my-double" v-model="item.value" min="14" max="60" thumb-size="64"></v-range-slider>	
						</div>
						
						<!-- текстареа -->

						<div v-if="item.type === 'Text' ">
							<h3>{{item.name}}</h3>
							<textarea :placeholder="item.options.placeholder" :value="item.value" @input="showVal($event, item, subsl.id)"></textarea>
						</div>

						<!-- радио-->

						<div v-if="item.type === 'Radio'">
							<h3>{{item.name}}</h3>
							<v-radio-group @change="showValRadio($event, item, subsl.id)" v-model="item.value">
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
import {mapState, mapGetters} from 'vuex'

	export default{
		components: {Inner, nextstep},
		data(){
			return{
				presetMode: false
			}
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
						return item.id == 28
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 28
					})
				}
				

				return page
			}
		},
		methods: {
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
					return item.id == 28
				})


				let category = page.subsItems.find(item =>{
					return item.id == subsl_id
				})

				let pageObj = category.fields.find(item =>{
					return item.id == inp.id
				})

				pageObj.value = e.target.value
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