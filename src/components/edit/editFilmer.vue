<template>
	<div class="edit-pop" @click="closeEditFilmer($emit)">
		<div class="edit-pop-box text-center" @click.stop>
			<h3 class="text-left">{{editing.name}}</h3>

			<div class="ed-inp-row text-left">
				<label for="">{{editing.options.kol_vo_dnej.nazvanie}}:</label>
				<input type="number" v-model="editing.options.kol_vo_dnej.stoimost">
			</div>
			<div class="ed-inp-row text-left">
				<label for="">{{editing.options.pererabtka.nazvanie}}:</label>
				<input type="number" v-model="editing.options.pererabtka.stoimost">
			</div>
			<button class="blue-btn" @click="closeEditFilmer($emit)">Сохранить</button>
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
			closeEditFilmer(){
				this.$emit('closeEditFilmer')
			}
		}
	}
</script>