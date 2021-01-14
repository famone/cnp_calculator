<template>
	<div>
		<Inner :innerTxt="innerTxt"/>

		<div class="container-fluid">
			<div class="row data-row">
				<div class="col-lg-2 col-sm-4 col-md-3" v-for="(cam, index) in cameras" :key="index">
				<div class="rent-box">
					<img :src="cam.img" alt="">
					<p class="black-txt">{{cam.name}}</p>
					<p class="price-cam">{{cam.price}} ₽ / смена</p>
				
					<div class="quantity" v-if="cam.quantity > 0">
						<div class="minus" @click="minCam(index)"></div>
						<span>{{cam.quantity}}</span>
						<div class="plus" @click="addCam(index)"></div>
					</div>
					<button class="add-to-cart-btn" @click="addCam(index)" v-else>Добавить</button>
				</div>
			</div>
			</div>


			<nextstep />
		</div>
	</div>
</template>

<script>
import Inner from '../components/Inner.vue'
import nextstep from '../components/nextstep.vue'

	export default{
		components: {Inner, nextstep},
		methods: {
			addCam(index){
				this.cameras[index].quantity++
			},
			minCam(index){
				this.cameras[index].quantity--
			},
		},
		data(){
			return{
				innerTxt: 'Камеры',
				cameras: [
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam1.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam2.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam3.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam1.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam2.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam3.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam1.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam2.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam3.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam1.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam2.png'),
						quantity: 0
					},
					{
						name: 'Комплект RED GEMINI 5K EF',
						price: 12000,
						img: require('../assets/img/cam3.png'),
						quantity: 0
					},
				]
			}
		}
	}
</script>