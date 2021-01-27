<template>
	<div class="edit-pop" @click="closeEditDirector($emit)">
		<div class="edit-pop-box text-center" @click.stop>
			<h3 class="text-left">{{editing.name}}</h3>

			<div v-for="(ed, index) in editing.options.varianty" class="ed-inp-row text-left">
				<label for="">{{ed.nazvanie}}:</label>
				<input type="number" :value="ed.stoimost"  @input="showVal($event, index)">
			</div>
			<button class="blue-btn" @click="closeEditDirector($emit)">Сохранить</button>
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
			closeEditDirector(){
				this.$emit('closeEditDirector')
			},
			saveDirector(editing){
				console.log(editing)
				this.$emit('saveEdit', )
			},
			showVal(e, index){
	
				parseInt(e.target.value)

				this.editing.options.varianty[index].stoimost = parseInt(e.target.value)
				
				// let page = this.calc.find(item => {
				// 	return item.id == 22
				// })

				// let pageObj = page.fields.find(item =>{
				// 	return item.id == inp.id
				// })

				// pageObj.value = e.target.value
			}
		}
	}
</script>