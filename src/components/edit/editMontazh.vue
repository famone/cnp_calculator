<template>
	<div class="edit-pop" @click="closeEditMontazh($emit)">
		<div class="edit-pop-box text-center" @click.stop>
			<h3 class="text-left">{{editing.name}}</h3>

			 <div class="ed-inp-row text-left">
				<label for="">Стоимость секунды монтажа / ₽:</label>
				<input type="number" :value="editing.options[0].stoimost" @input="changePrice($event, editing.options)">
			</div>

			<button class="blue-btn" @click="closeEditMontazh($emit)">Сохранить</button>
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
			closeEditMontazh(){
				this.$emit('closeEditMontazh')
			},
			changePrice(event, optArr){
				console.log(event.target.value)
				console.log(optArr)

				optArr.forEach(item =>{
					item.stoimost = event.target.value
				})

			}
		}
	}
</script>