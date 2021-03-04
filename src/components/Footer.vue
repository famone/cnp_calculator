<template>
	<div>
		<div class="bottom-bar"  v-if="this.$route.path !== '/' && this.$route.path !== '/enter' && this.$route.path !== '/profile' && this.$route.name !== 'calc-route' ">
		<!-- <div class="progress" :style="{width: prgrss * 10 + '%'}"></div> -->

		<div class="progress" :style="{width: (100/9) * prgrss + '%'}"></div>


		<div class="container-fluid">
			


				<div class="col-lg-4" v-if="calc">
					<div class="totals">
						<p class="white-txt">Всего: 
{{Math.round((calcPrice + getOborudItog) + (calcPrice + getOborudItog)/100 * nalog + ((calcPrice + getOborudItog) + (calcPrice + getOborudItog)/100 * nalog)/100 * markUp ).toLocaleString()}}
						 ₽</p>
						<p class="small-grey">Включая налоги {{nalog}}% : 
						{{  Math.round((calcPrice + getOborudItog)/100 * nalog).toLocaleString() }} ₽</p>
						<!-- <p class="white-txt">С налогом: {{calcPrice + (calcPrice/100 * calc[0].fields[7].value)}}</p> -->
					</div>
				</div>

				<div class="col-lg-6" v-if="calc">

					<div class="additions">
						<p class="white-txt" v-if="videoType">
							<img src="../assets/img/addition.svg" alt="">
							{{videoType}}
						</p>
						<p class="white-txt" v-if="getMontaj">
							<img src="../assets/img/monticon.svg" alt="">
							<span v-for="(timer, index) in getMontaj">{{timer}}
								<span v-if="index+1 !== getMontaj.length">, </span>
							</span>
							сек
						</p>
						<p class="white-txt"><img src="../assets/img/date.svg" alt="">
							{{todayIs.toLocaleDateString()}}
						</p>
						<p class="white-txt"><img src="../assets/img/smen.svg" alt="">
							{{smens}} смены
						</p>
					</div>
				</div>

				<div class="col-lg-2">
					<div class="downloads">
						<!-- <p class="white-txt">XLS</p>
						<p class="white-txt">PDF</p> -->
						<p class="white-txt pointer clearAll" @click="openConfirm = !openConfirm">
							<img src="../assets/img/trash.svg" alt="">Очистить
						</p>
					</div>
				</div>

		</div>
	</div>
	<Confirm v-if="openConfirm" @closeConfirm="openConfirm = !openConfirm" />
	</div>
</template>


<script>
import {mapGetters} from 'vuex'
import Confirm from '../components/Confirm.vue'

	export default{
		components: {Confirm},
		data(){
			return{
				todayIs: new Date(),
				presetMode: false,
				openConfirm: false
			}
		},
		props: {
			prgrss: {
				required: true,
				type: Number
			}
		},
		computed: {
			...mapGetters({ 
				calc: "smeta/getCalc",
				activePreset: "preset/getActivePreset"
			}),

			calcPrice(){

				let pages = []

				if(this.checkIfPreset){
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

						if(item.type === 'SimpleRange'){
							polya.push(item)
						}

						if(item.type === 'SingleSlider'){
							polya.push(item)
						}

						if(item.type === 'Acter'){
							polya.push(item)
						}

						if(item.type === 'Montazh'){
							polya.push(item)
						}

						
						
					})

				})

				let priceArr = []

				polya.forEach(item =>{
					if(item.value){
						if(item.type === 'SimpleRange'){
							priceArr.push(item.options.kol_vo_dnej.stoimost * item.options.kol_vo_dnej.add_value + item.options.pererabtka.stoimost * item.options.pererabtka.add_value)
						}else if(item.type === 'SingleSlider'){
							priceArr.push(item.options.stoimost * item.options.add_value)
						}else if(item.type === 'Acter'){

							// let prices = [] 
							item.options.forEach(actor =>{
								let prices = []
								actor.vybrannaya_oblast.forEach(obl =>{
									prices.push(parseInt(obl.stoimst * actor.kol_vo_smen))	
								})
								let result = Math.max.apply(Math, prices)
								priceArr.push(result)
							})

						}else if(item.type === 'Montazh'){
							item.options.forEach(rolik =>{
								let prices = []
								priceArr.push(rolik.stoimost * rolik.vremya)
							})
						}else if(item.radio_value === 'range' && item.type !== 'SimpleRange'){
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

			},
			videoType(){
					
				if(this.checkIfPreset){
					return this.activePreset[0].fields[0].value
				}else{
					return this.calc[0].fields[0].value
				}
			},
			nalog(){
				if(this.checkIfPreset){
					return this.activePreset[0].fields[7].value
				}else{
					return this.calc[0].fields[7].value
				}
			},
			markUp(){
				if(this.presetMode){
					return this.activePreset[0].fields[8].value
				}else{
					return this.calc[0].fields[8].value
				}
			},
			getMontaj(){
				if(this.presetMode){
					if(this.activePreset[7].subsItems[0].fields[0].value){
						let motajes = []
						this.activePreset[7].subsItems[0].fields[0].options.forEach(item =>{
							motajes.push(item.vremya)
						})
						return motajes
					}else{
						return false
					}
				}else{
					if(this.calc[7].subsItems[0].fields[0].value){
						let motajes = []
						this.calc[7].subsItems[0].fields[0].options.forEach(item =>{
							motajes.push(item.vremya)
						})
						return motajes
					}else{
						return false
					}
				}
			},
			smens(){
				

				
				if(this.checkIfPreset){
					return this.activePreset[2].subsItems[0].fields[0].value
				}else{
					return this.calc[2].subsItems[0].fields[0].value
				}
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
						if(item.subsItems){
							item.subsItems.forEach(sub =>{
							categories.push(sub)
						})
					}
					
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
			checkIfPreset(){
				if(this.$route.params.id !== undefined){
					this.presetMode = true
					return true
				}else{
					this.presetMode = false
					return false
				}
			}
		},
		created() {
			if(this.$route.params.id !== undefined){
				this.presetMode = true
			}else{
				this.presetMode = false
			}
		}
	}
</script>