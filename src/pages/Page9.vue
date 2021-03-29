<template>
	<div v-if="calc">

		<section id="itogoInner">
			<div class="container">
				<div class="col-lg-7">
					<h3>Бюджет проекта</h3>
<h1>
{{Math.round((calcPrice + getOborudItog) + (calcPrice + getOborudItog)/100 * nalog + ((calcPrice + getOborudItog) + (calcPrice + getOborudItog)/100 * nalog)/100 * markUp ).toLocaleString()}} ₽
</h1>
					<p class="grey-txt">Налог включен {{nalog}}% : 
						{{ Math.round((calcPrice + getOborudItog)/100 * nalog).toLocaleString() }} ₽</p>
					<!-- <p class="grey-txt">MarkUp {{markUp}}% : 
					{{
						Math.round(((calcPrice + getOborudItog) + (calcPrice + getOborudItog)/100 * nalog)/100 * markUp).toLocaleString() 
					}} ₽
						</p> -->
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
        					<td class="text-right" v-else-if="item.type === 'Datepicker'">
        						<span v-if="item.value !== '' ">
        							{{item.value}}
        							<!-- {{String(item.value.getDate())}} 
        							 {{mounths[item.value.getMonth()]}} 
        							 {{item.value.getFullYear()}} -->
        						</span>
        					</td>
        					<td class="text-right" v-else>{{item.value}}
        						<span v-if="item.id == 424"> сек</span>
        						<span v-if="item.id == 439 || item.id == 440 "> % : {{
						Math.round(((calcPrice + getOborudItog) + (calcPrice + getOborudItog)/100 * nalog)/100 * markUp).toLocaleString() 
					}} ₽</span>
        					</td>
    					</tr>
					</table>
				</div>
			</div>
		</section>

			<!-- Специалисты -->

		<section id="itogTable" v-if="getSpecialItog !== 0">
			<div class="container">
				<div class="col-lg-12">
					<div class="flex-row">
						<h2>Специалисты</h2>
						<h3>{{getSpecialItog.toLocaleString()}} ₽</h3>
					</div>
					

					<table>
						<tr v-for="item in getSpecial" v-if="item.value && item.radio_value !== '' && item.type !== 'SimpleRange' && item.type !== 'SingleSlider' ">
        					<td><p class="wh-table">{{item.name}}</p></td>

        					<td class="text-center" v-if="item.type === 'Number' "></td>
        					<td class="text-center" v-else-if="item.radio_value === 'range'">{{item.radio_itog.add_value}} смен</td>
        					<td class="text-center" v-else>За проект</td>


        					<td></td>

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

    					<tr v-if="item.value && item.type === 'SimpleRange' " v-for="item in getSpecial">
    						<td><p class="wh-table">{{item.name}}</p></td>
    						<td class="text-center">{{item.options.kol_vo_dnej.add_value}} смен</td>
    						<td class="text-center">
    							<span v-if="item.options.pererabtka.add_value !== 0">Переработка - {{item.options.pererabtka.add_value}} час.</span>
    						</td>
    						<td class="text-right">
    							{{(item.options.kol_vo_dnej.stoimost * item.options.kol_vo_dnej.add_value + item.options.pererabtka.stoimost * item.options.pererabtka.add_value).toLocaleString()}}
    						 ₽</td>
    					</tr>

    					<tr v-if="item.type === 'SingleSlider' " v-for="item in getSpecial">
    						<td><p class="wh-table">{{item.name}}</p></td>
    						<td class="text-center">{{item.options.kol_vo}} кадров</td>
    						<td class="text-center">
    						</td>
    						<td class="text-right">
    							{{(item.options.kol_vo * item.options.stoimost).toLocaleString()}}
    						 ₽</td>
    					</tr>
    					
					</table>




				</div>
			</div>
		</section>

		<!-- Оборудование -->


		<section id="itogTable" v-if="getOborudItog !== 0">
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


		<!-- Локация -->

		<section id="itogTable" v-if="getLocationItog !== 0">
			<div class="container">
				<div class="col-lg-12">
					<div class="flex-row">
						<h2>Локация</h2>
						<h3>{{getLocationItog.toLocaleString()}} ₽</h3>
					</div>

				
					<table>
						<tr v-for="item in getLocation" v-if="item.value && item.type === 'SingleSlider'">
        					<td><p class="wh-table">{{item.name}}</p></td>
        					<td class="text-center">{{item.options.kol_vo}} шт</td>
        					<td class="text-right">
        						{{(item.options.stoimost * item.options.kol_vo).toLocaleString()}} ₽
        					</td>
    					</tr>
					</table>
				</div>
			</div>
		</section>


		<!-- Актеры -->

		<section id="itogTable" v-if="getActorsItog !== 0">
			<div class="container">
				<div class="col-lg-12">
					<div class="flex-row">
						<h2>Актеры</h2>
						<h3>{{getActorsItog.toLocaleString()}} ₽</h3>
					</div>

					<table v-for="item in getActors" v-if="item.value && item.type === 'Acter'">
						<tr v-for="(actor, index) in item.options">
							<td><p class="wh-table">Актер {{index + 1}} - {{actor.pol}}</p></td>
							<td class="text-center">{{actor.kol_vo_smen}} смен</td>
							<td></td>
							<td class="text-right">
								{{(getLargest(actor.vybrannaya_oblast) * actor.kol_vo_smen).toLocaleString()}} ₽
							</td>
    					</tr>
					</table>

					<table>
						<tr v-if="item.value && item.type === 'SimpleRange'" v-for="item in getActors">
    						<td><p class="wh-table">{{item.name}}</p></td>
    						<td class="text-center">{{item.options.kol_vo_dnej.add_value}} смен</td>
    						<td class="text-center">Переработка - {{item.options.pererabtka.add_value}} час.</td>
    						<td class="text-right">
    							{{(item.options.kol_vo_dnej.stoimost * item.options.kol_vo_dnej.add_value + item.options.pererabtka.stoimost * item.options.pererabtka.add_value).toLocaleString()}}
    						 ₽</td>
    							
    					</tr>
					</table>
				</div>
			</div>
		</section>


		<!-- Постпродакшн -->

		<section id="itogTable"  v-if="getPostItog !== 0">
			<div class="container">
				<div class="col-lg-12">
					<div class="flex-row">
						<h2>Постпродакшн</h2>
						<h3>{{getPostItog.toLocaleString()}} ₽</h3>
					</div>

					<table v-for="item in getPost" v-if="item.value && item.type === 'Montazh'">
						<tr v-for="(rolik, index) in item.options">
							<td><p class="wh-table">{{index + 1}}-й ролик</p></td>
							<td class="text-center">{{rolik.vremya}} сек</td>
							<td class="text-right">
								{{(rolik.vremya * rolik.stoimost).toLocaleString()}} ₽
							</td>
    					</tr>
					</table>

					<table>
						<tr v-if="item.value && item.type === 'SingleSlider'" v-for="item in getPost">
    						<td><p class="wh-table">{{item.name}}</p></td>
    						 <td class="text-center">{{item.options.kol_vo}} шт</td>
    						<td class="text-right">{{(item.options.kol_vo * item.options.stoimost).toLocaleString()}} ₽</td> 
    							
    					</tr>
					</table>
				</div>
			</div>
		</section>


		<!-- Остальное -->

		<section id="itogTable" v-if="getOstalnoeItog !== 0">
			<div class="container">
				<div class="col-lg-12">
					<div class="flex-row">
						<h2>Остальное</h2>
						<h3>{{getOstalnoeItog.toLocaleString()}} ₽</h3>
					</div>

				
					<table>
						<tr v-for="item in getOstalnoe" v-if="item.value && item.type === 'SingleSlider'">
        					<td><p class="wh-table">{{item.name}}</p></td>
        					<td class="text-center">{{item.options.kol_vo}} шт</td>
        					<td class="text-right">
        						{{(item.options.stoimost * item.options.kol_vo).toLocaleString()}} ₽
        					</td>
    					</tr>
					</table>
				</div>
			</div>
		</section>



		<div class="section" >
			<div class="container">
				<div class="data-row" style="margin-bottom: 100px;">
					<button class="blue-btn" v-if="!presetMode" @click="presPop = !presPop">Сохранить калькулятор</button>
					<button class="blue-btn" v-if="presetMode && editorMode" @click="updatePreset()">
					Обновить калькулятор</button>
				</div>
			</div>
		</div>


		<presetPop v-if="presPop" @closePop="closePop" />


		<v-snackbar v-model="snackbar"> Калькулятор успешно обновлен
		      <template v-slot:action="{ attrs }">
		        <v-btn color="#2E97E6" text v-bind="attrs" @click="snackbar = false">
		          Закрыть 
		        </v-btn>
		      </template>
		    </v-snackbar>



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
				editorMode: false,
				presetMode: false,
				presPop: false,
				snackbar: false,
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
			},
			updatePreset(){

				let pres = {
					user_id: this.user.id,
					json: this.activePreset,
					name: this.presetSlugs.preset
				}
				this.$store.dispatch('preset/updatePreset', pres).then(()=>{
					this.snackbar = true
				})
			},
			getLargest(oblast){
				let prices = []
				oblast.forEach(item =>{
					prices.push(parseInt(item.stoimst))	
				})

				let result = Math.max.apply(Math, prices)

				return result
			}
		},
		computed: {
			...mapGetters({ 
				calc: "smeta/getCalc",
				user: "auth/getAuthenticated",
				activePreset: "preset/getActivePreset",
				presetSlugs: "preset/getPresetSlugs"
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

						if(item.value && item.radio_value !== '' && item.type !== 'SimpleRange' && item.type !== 'SingleSlider'){
							if(item.radio_itog.tip === 'fix' ){
								withPrice.push(item.radio_itog.stoimost)
							}else{
								withPrice.push(item.radio_itog.stoimost * item.radio_itog.add_value )
							}
						}
						if(item.value && item.type === 'SimpleRange'){
							withPrice.push(item.options.kol_vo_dnej.stoimost * item.options.kol_vo_dnej.add_value + item.options.pererabtka.stoimost * item.options.pererabtka.add_value)
						}

						if(item.value && item.type === 'SingleSlider'){
							withPrice.push(item.options.kol_vo * item.options.stoimost)
						}
					}
				})
				let total = 0
				withPrice.forEach(item =>{
					total += item
				})
				return total
			},
			getActors(){
				let page = ''
				
				if(this.presetMode){
					page = this.activePreset.find(item => {
						return item.id == 25
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 25
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
			getActorsItog(){
				let prices = []
				this.getActors.forEach(item =>{
					if(item.value){
						if(item.type === 'SimpleRange'){
								prices.push(item.options.kol_vo_dnej.stoimost * item.options.kol_vo_dnej.add_value + item.options.pererabtka.stoimost * item.options.pererabtka.add_value)
							
						}else{
							item.options.forEach(actor =>{
								let itogs = []
								actor.vybrannaya_oblast.forEach(obl =>{
									itogs.push(parseInt(obl.stoimst * actor.kol_vo_smen))	
								})
								let result = Math.max.apply(Math, itogs)

								prices.push(result)
							})
						}
					}
				})
				let final = 0

				prices.forEach(item =>{
					final += item
				})

				return final
			},
			getPost(){
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
			getPostItog(){
				let prices = []
				this.getPost.forEach(item =>{
					if(item.value){
						if(item.type === 'Montazh'){
							item.options.forEach(rolik =>{
								prices.push(rolik.vremya * parseInt(rolik.stoimost))
							})
						}
						else{
							prices.push(item.options.stoimost * item.options.kol_vo)
						}
					}
				})
				let final = 0

				prices.forEach(item =>{
					final += item
				})

				return final
			},
			getOstalnoe(){
				let page = ''
				
				if(this.presetMode){
					page = this.activePreset.find(item => {
						return item.id == 21
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 21
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
			getOstalnoeItog(){
				let prices = []
				this.getOstalnoe.forEach(item =>{
					if(item.value){
						prices.push(item.options.stoimost * item.options.kol_vo)
					}
				})
				let final = 0

				prices.forEach(item =>{
					final += item
				})

				return final
			},
			getLocation(){
				let page = ''
				
				if(this.presetMode){
					page = this.activePreset.find(item => {
						return item.id == 24
					})
				}else{
					page = this.calc.find(item => {
						return item.id == 24
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
			getLocationItog(){
				let prices = []
				this.getLocation.forEach(item =>{
					if(item.value){
						prices.push(item.options.stoimost * item.options.kol_vo)
					}
				})
				let final = 0

				prices.forEach(item =>{
					final += item
				})

				return final
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
			nalog(){
				if(this.presetMode){
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
							priceArr.push(item.options.stoimost * item.options.kol_vo)
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