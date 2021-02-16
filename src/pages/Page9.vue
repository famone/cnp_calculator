<template>
	<div v-if="calc">

		<section id="itogoInner">
			<div class="container">
				<div class="col-lg-7">
					<h3>Бюджет проекта</h3>
					<h1>{{(calcPrice + getOborudItog).toLocaleString()}} ₽</h1>
					<p class="grey-txt">Налог {{nalog}}% : 
						{{ Math.round((calcPrice + getOborudItog)/100 * nalog).toLocaleString() }} ₽</p>
				</div>
			</div>
		</section>


		<!-- вводные -->


		<section id="itogTable">
			<div class="container">
				<div class="col-lg-12">
					<h2>Вводные данные</h2>



					<table>
						<tr v-for="item in getVvodnie.fields" v-if="item.value && item.value.length !== 0 ">
        					<td><p class="wh-table">{{item.name}}</p></td>
        					<td class="text-right" v-if="Array.isArray(item.value)">
        						<span v-for="mass in item.value">{{mass}},</span>
        					</td>
        					<td class="text-right" v-else>{{item.value}}
        						<span v-if="item.id == 424"> сек</span>
        						<span v-if="item.id == 439 || item.id == 440 "> %</span>
        					</td>
    					</tr>
					</table>
				</div>
			</div>
		</section>

			<!-- Специалисты -->

		<section id="itogTable">
			<div class="container">
				<div class="col-lg-12">
					<div class="flex-row">
						<h2>Специалисты</h2>
						<h3>{{getSpecialItog.toLocaleString()}} ₽</h3>
					</div>
					

					<table>
						<tr v-for="item in getSpecial" v-if="item.value && item.radio_value !== '' ">
        					<td><p class="wh-table">{{item.name}}</p></td>

        					<td class="text-center" v-if="item.type === 'Number' "></td>
        					<td class="text-center" v-else-if="item.radio_value === 'range'">{{item.radio_itog.add_value}} смен</td>
        					<td class="text-center" v-else>За проект</td>


        					<td class="text-right" v-if="item.type === 'Number' ">
        						{{item.value}} 
        						<span v-if="item.id == 420"> смен</span>
        						<span v-if="item.id == 422"> часов</span>
        					</td>


        					<td class="text-right" v-else-if="item.radio_value === 'range'">
        						{{(item.radio_itog.stoimost * item.radio_itog.add_value).toLocaleString()}} ₽
        					</td>
        					<td class="text-right" v-else>{{item.radio_itog.stoimost.toLocaleString()}} ₽</td>


    					</tr>
					</table>




				</div>
			</div>
		</section>

		<!-- Оборудование -->


		<section id="itogTable">
			<div class="container">
				<div class="col-lg-12">
					<!-- <div class="flex-row">
						<h2>Оборудование</h2>
						<h3>{{getOborudItog.toLocaleString()}} ₽</h3>
					</div> -->
				
					<table>
						<tr v-for="item in getOborudovanie" v-if="item.count !== 0">
        					<td><p class="wh-table">{{item.name}}</p></td>
        					<td>
        						<div class="calc-td">
        							<div class="minus" @click="minCount(item)"></div> 
        							{{item.count }} шт. 
        							<div class="plus" @click="addCount(item)" ></div>
        						</div>
        					</td>
        					<td>
        						<div class="calc-td">
        							<div class="minus" @click="minSmen(item)"></div> 
        							{{item.smen }} смен
        							<div class="plus" @click="addSmen(item)"></div>
        						</div>
        					</td>
        					<td class="text-right">{{(item.price * item.count * item.smen).toLocaleString()}} ₽</td>
    					</tr>
					</table>
				</div>
			</div>
		</section>



		<div class="section" >
			<div class="container">
				<div class="data-row">
					<button class="blue-btn" v-if="!presetMode" @click="presPop = !presPop">Добавить в пресет</button>
				</div>
			</div>
		</div>


		<presetPop v-if="presPop" @closePop="closePop" />



	</div>
</template>

<script>
import Inner from '../components/Inner.vue'
import {mapState, mapGetters} from 'vuex'
import presetPop from '../components/presetPop.vue'

	export default{
		components: {Inner, presetPop},
		data(){
			return{
				presetMode: false,
				presPop: false
			}
		},
		methods: {
			minCount(item){
				item.count--
			},
			addCount(item){
				item.count++
			},
			minSmen(item){
				if(item.smen == 1){
					return
				}
				item.smen--
			},
			addSmen(item){
				item.smen++
			},
			closePop(){
				this.presPop = false
			}
		},
		computed: {
			...mapGetters({ 
				calc: "smeta/getCalc",
				user: "auth/getAuthenticated",
				activePreset: "preset/getActivePreset"
			}),

			getVvodnie(){
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
			},
			getSpecial(){
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

				let allSubs = []


				page.subsItems.forEach(item =>{
					allSubs.push(item)
				})

				let allFields = []

				allSubs.forEach(item => {
					item.fields.forEach(field => {
						allFields.push(field)
					})
				})

				

				return allFields
			},
			getSpecialItog(){
				let withPrice = []
				this.getSpecial.forEach(item =>{
					if(item.id !== 420 && item.id !== 422 ){
						if(item.value && item.radio_value !== ''){
							if(item.radio_itog.tip === 'fix' ){
								withPrice.push(item.radio_itog.stoimost)
							}else{
								withPrice.push(item.radio_itog.stoimost * item.radio_itog.add_value )
							}
						}
					}
				})
				let total = 0
				withPrice.forEach(item =>{
					total += item
				})
				return total
			},
			getOborudovanie(){
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

				let categories = []

				page.products.cat.forEach(item =>{
					item.subsItems.forEach(sub =>{
						categories.push(sub)
					})
				})

				let products = []

				categories.forEach(item =>{
					item.items.forEach(prod =>{
						products.push(prod)
					})
				})

				return products
			},
			getOborudItog(){
				let prices = []
				this.getOborudovanie.forEach(item =>{
					if(item.count !== 0){
						prices.push(item.price * item.count * item.smen)
					}
				})
				let final = 0

				prices.forEach(item =>{
					final += item
				})

				return final
			},
			nalog(){
				if(this.presetMode){
					return this.activePreset[0].fields[7].value
				}else{
					return this.calc[0].fields[7].value
				}
			},



			// ИТОГОВЫЕ ЦИФРЫ ВСЕГО

			calcPrice(){


				let pages = []

				if(this.presetMode){
					this.activePreset.forEach(page => {
						if(page.calculated == true){
							pages.push(page)
						}
					})
				}else{
					this.calc.forEach(page => {
						if(page.calculated == true){
							pages.push(page)
						}
					})
				}

				

				let categories = []

				pages.forEach(page =>{
					let onePole = page.subsItems

					onePole.forEach(item =>{
						categories.push(item)
					})
				})
				let polya = []

				categories.forEach(cat =>{
					let oneFields = cat.fields

					oneFields.forEach(item =>{

						if(item.radio_value){
							polya.push(item)
						}
					})
				})
				let priceArr = []
				polya.forEach(item =>{
					if(item.value){
						if(item.radio_value === 'range'){
							priceArr.push(item.radio_itog.stoimost * item.radio_itog.add_value)
						}else{
							priceArr.push(item.radio_itog.stoimost)
						}
						
					}
				})

				let FINAL_PRICE = 0

				priceArr.forEach(item =>{
					FINAL_PRICE += item
				})

				return FINAL_PRICE

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