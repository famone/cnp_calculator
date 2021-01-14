<template>
			<div class="data-row">
				<router-link tag="button" :to=" '/page-' + step " class="blue-btn">
					Дальше
				</router-link>
			</div>
</template>

<script>
	export default{
		data(){
			return{
				step: ''
			}
		},
		created(){
			this.step = parseInt(this.$route.path.match(/\d+/)) + 1
		}
	}
</script>