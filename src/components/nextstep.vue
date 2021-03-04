<template>
			<div class="data-row">
				<router-link tag="button" :to=" '/page-' + step " class="blue-btn" v-if="!presetMode">
					Дальше
				</router-link>
				<router-link tag="button" 
				:to="'/page-' + step + '/' + this.$route.params.name + '/' + this.$route.params.id" class="blue-btn" v-else>
					Дальше
				</router-link>
			</div>
</template>

<script>
import {mapGetters} from 'vuex'
	export default{
		data(){
			return{
				step: '',
				presetMode: false
			}
		},
		created(){

			if(this.$route.params.id !== undefined){
				this.presetMode = true
			}else{
				this.presetMode = false
			}

			this.step = parseInt(this.$route.path.match(/\d+/)) + 1

		}
	}
</script>