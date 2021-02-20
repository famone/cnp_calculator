<template>
	<div class="edit-pop" @click="closeEditSingle($emit)">
		<div class="edit-pop-box text-center" @click.stop>
			<h3 class="text-left">{{editing.name}}</h3>

			<div class="ed-inp-row text-left">
				<label for="">Цена:</label>
				<input type="number" v-model="editing.options.stoimost">
			</div>
			<button class="blue-btn" @click="closeEditSingle($emit)">Сохранить</button>
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
			closeEditSingle(){
				this.$emit('closeEditSingle')
			}
		}
	}
</script>