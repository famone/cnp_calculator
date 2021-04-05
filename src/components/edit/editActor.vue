<template>
	<div class="edit-pop" @click="closeEditActor($emit)">
		<div class="edit-pop-box text-center" @click.stop>
			<h3 class="text-left">{{editing.name}}</h3>


			<div class="ed-inp-row text-left">
				<label for="">Интернет / ₽:</label>
				<input type="number" :value="editing.options[0].oblast[0].stoimst" 
				@input="changePrice($event, editing.options, 0, 'Интернет')">
			</div>
			<div class="ed-inp-row text-left">
				<label for="">Кино / ₽:</label>
				<input type="number" :value="editing.options[0].oblast[1].stoimst"
				@input="changePrice($event, editing.options, 1)">
			</div>
			<div class="ed-inp-row text-left">
				<label for="">Телевидиние / ₽:</label>
				<input type="number" :value="editing.options[0].oblast[2].stoimst"
				@input="changePrice($event, editing.options, 2)">
			</div>
			<button class="blue-btn" @click="closeEditActor($emit)">Сохранить</button>
		</div>
	</div>
</template>


<script>
	export default{
		props: {
			editing: {
				type: Object,
				required: true
			}
		},
		methods: {
			closeEditActor(){
				this.$emit('closeEditActor')
			},
			changePrice(event, optArr, obl, keyName){
				// console.log(event.target.value)
				// console.log(optArr)
				// console.log(obl)

				optArr.forEach(item =>{
					let izmenObl = item.vybrannaya_oblast.find(oblast => {
						return	oblast.nazvanie === keyName
					})
					if(izmenObl){
						izmenObl.stoimst = event.target.value
					}
					
				})



				optArr.forEach(item =>{
					item.oblast[obl].stoimst = event.target.value
				})


			}
		}
	}
</script>