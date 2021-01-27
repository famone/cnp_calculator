<template>
	<div v-if="calc">

		<section id="itogoInner">
			<div class="container">
				<div class="col-lg-7">
					<h3>Бюджет проекта</h3>
					<h1>{{(calcPrice + getOborudItog).toLocaleString()}} ₽</h1>
					<p class="grey-txt">Налог {{calc[0].fields[7].value}}% : 
						{{ Math.round((calcPrice + getOborudItog)/100 * calc[0].fields[7].value).toLocaleString() }} ₽</p>
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

        					<td v-if="item.type === 'Number' "></td>
        					<td v-else-if="item.radio_value.tip === 'range'">{{item.radio_value.add_value}} смен</td>
        					<td v-else>За проект</td>

        					<td class="text-right" v-if="item.type === 'Number' ">
        						{{item.value}} 
        						<span v-if="item.id == 420"> смен</span>
        						<span v-if="item.id == 422"> часов</span>
        					</td>
        					<td class="text-right" v-else-if="item.radio_value.tip === 'range'">
        						{{(item.radio_value.stoimost * item.radio_value.add_value).toLocaleString()}} ₽
        					</td>
        					<td class="text-right" v-else>{{item.radio_value.stoimost.toLocaleString()}} ₽</td>
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
						<h2>Оборудование</h2>
						<h3>{{getOborudItog.toLocaleString()}} ₽</h3>
					</div>
				
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



		<div class="section">
			<div class="container">
				<div class="col-lg-12">
					<button class="blue-btn" @click="addToPreset()">Добавить в пресет</button>
				</div>
			</div>
		</div>



	</div>
</template>

<script>
import Inner from '../components/Inner.vue'
import {mapState, mapGetters} from 'vuex'

	export default{
		components: {Inner},
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
			addToPreset(){
				this.$store.dispatch('auth/addToPreset', this.calc)
			}
		},
		computed: {
			...mapGetters({ calc: "smeta/getCalc"}),

			getVvodnie(){
				let page = this.calc.find(item => {
					return item.id == 22
				})

				return page
			},
			getSpecial(){
				let page = this.calc.find(item => {
					return item.id == 31
				})

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
							if(item.radio_value.tip === 'fix' ){
								withPrice.push(item.radio_value.stoimost)
							}else{
								withPrice.push(item.radio_value.stoimost * item.radio_value.add_value )
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
				let page = this.calc.find(item => {
					return item.id == 23
				})

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



			// ИТОГОВЫЕ ЦИФРЫ ВСЕГО

			calcPrice(){
				let pages = []
				this.calc.forEach(page => {

					if(page.calculated == true){
						pages.push(page)
					}
				})
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
						if(item.radio_value.tip === 'range'){
							priceArr.push(item.radio_value.stoimost * item.radio_value.add_value)
						}else{
							priceArr.push(item.radio_value.stoimost)
						}
						
					}
				})

				let FINAL_PRICE = 0

				priceArr.forEach(item =>{
					FINAL_PRICE += item
				})

				return FINAL_PRICE

			}
		}
	}
</script>