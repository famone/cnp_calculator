<template>
	<div class="bottom-bar"  v-if="this.$route.path !== '/' && this.$route.path !== '/enter' && this.$route.path !== '/profile'  ">
		<!-- <div class="progress" :style="{width: prgrss * 10 + '%'}"></div> -->

		<div class="progress" :style="{width: (100/9) * prgrss + '%'}"></div>


		<div class="container-fluid">
			


				<div class="col-lg-3" v-if="calc">
					<div class="totals">
						<p class="white-txt">Всего: {{calcPrice.toLocaleString()}} ₽</p>
						<p class="white-txt">Налог {{calc[0].fields[7].value}}% : 
						{{ (calcPrice/100 * calc[0].fields[7].value).toLocaleString() }} ₽</p>
						<!-- <p class="white-txt">С налогом: {{calcPrice + (calcPrice/100 * calc[0].fields[7].value)}}</p> -->
					</div>
				</div>

				<div class="col-lg-6" v-if="calc">

					<div class="additions">
						<p class="white-txt" v-if="calc[0].fields[0].value">
							<img src="../assets/img/addition.svg" alt="">
							{{calc[0].fields[0].value}}
						</p>
						<!-- <p class="white-txt"><img src="../assets/img/time.svg" alt="">{{getRoliks}} сек</p> -->
						<p class="white-txt"><img src="../assets/img/date.svg" alt="">
							{{todayIs.toLocaleDateString()}}
						</p>
						<p class="white-txt"><img src="../assets/img/smen.svg" alt="">
							{{calc[2].subsItems[0].fields[0].value}} смены
						</p>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="downloads">
						<p class="white-txt">XLS</p>
						<p class="white-txt">PDF</p>
						<p class="white-txt pointer" @click="clearCalc">
							<img src="../assets/img/trash.svg" alt="">Очистить
						</p>
					</div>
				</div>

		</div>
	</div>
</template>


<script>
import {mapGetters} from 'vuex'

	export default{
		data(){
			return{
				todayIs: new Date()
			}
		},
		methods: {
			clearCalc(){
				this.$store.dispatch('smeta/getCalc')
			}
		},
		props: {
			prgrss: {
				required: true,
				type: Number
			}
		},
		computed: {
			...mapGetters({ calc: "smeta/getCalc"}),

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