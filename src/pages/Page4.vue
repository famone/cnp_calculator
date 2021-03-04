<template>
	<div v-if="calc">

		


		<section id="switchSec">
			<div class="container-fluid">
				<div class="col-lg-12 text-center">
					<div class="switch-cat">
						<button v-for="(filter, index) in getCategories"
						@click="changeFilter(index, filter.txt)" 
						:class="{acFiletr : filter.active}">{{filter.txt}}</button>
					</div>
				</div>
			</div>
		</section>	
		

	<section v-for="cat in getCalcPage.products.cat">


		<div v-for="category in cat.subsItems" v-if="cat.name === filtered "> <!-- v-if="category.items.length !== 0" -->
			<Inner :innerTxt="category.name"/>

			<div class="container-fluid">
			<div class="row data-row">
				<div class="col-lg-2 col-sm-4 col-md-3" v-for="(cam, index) in category.items" :key="index">
					<div class="rent-box">
						<img :src="cam.image" alt="">
						<p class="black-txt">{{cam.name}}</p>
						<p class="price-cam" v-if="cam.count < 1">{{cam.price.toLocaleString()}} ₽ / смена</p>
						<p class="price-cam" v-else>{{(cam.price * cam.count * cam.smen).toLocaleString()}} ₽ / {{cam.smen}} смен</p>

				
						<div class="quantity" v-if="cam.count > 0">
							<div class="minus" @click="minCam(cam)"></div>
							<span>{{cam.count}} шт</span>
							<div class="plus" @click="addCam(cam)"></div>
						</div>
						<button class="add-to-cart-btn" @click="addCam(cam)" v-else>Добавить</button>
					</div>
				</div>
				</div>
			</div>


		</div>
		

		

	</section>


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
		computed: {
			...mapGetters({ 
				calc: "smeta/getCalc",
				activePreset: "preset/getActivePreset"
			}),
			getCalcPage(){
				let page = ''

				if(this.presetMode){
					page = this.activePreset.find(item => {
						return item.id == 23
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 23
					})
				}
				

				return page
			},
			getCategories(){
				let arr = []
				this.getCalcPage.products.cat.forEach(item =>{
					arr.push({txt: item.name, active: false})
				})
				arr[0].active = true

				return arr 
			}
		},
		methods: {
			addCam(cam){
				cam.count++
			},
			minCam(cam){
				cam.count--
			},
			changeFilter(index, txt){

				this.getCategories.forEach(item =>{
					item.active = false
				})

				this.getCategories[index].active = true
				this.filtered = txt
			}
		},
		data(){
			return{
				presetMode: false,
				filtered: 'Видео оборудование',
				filters: []	
			}
		},
		created(){
			if(this.$route.params.id !== undefined){
				this.presetMode = true
			}else{
				this.presetMode = false
			}
		},
	}
</script>