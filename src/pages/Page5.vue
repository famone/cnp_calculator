<template>
	<div v-if="calc">


		<editSingle v-if="edit_single"  
					@closeEditSingle="closeEditSingle"
					:editing="editing_single"/>



		<div v-for="subsl in getCalcPage.subsItems">
			<Inner :innerTxt="subsl.name"/>


			<div class="container">
				<div class="col-lg-6">
					<div class="data-row" v-for="item in subsl.fields">


	

				<!-- Свитчер с переработкой -->

				<div v-if="item.type === 'SingleSlider' ">
					<div class="editable">
						<v-switch inset :label="item.name" v-model="item.value"></v-switch>
						<button class="edit-mode-btn" @click="openFilmer(item, subsl.id)" v-if="editorMode">
							<span class="mdi mdi-lead-pencil"> <span class="hidden-xs">Настроть</span></span>
						</button>
					</div>

					<p class="white-txt" v-if="!item.value">
						<span class="blue-txt op-5">от {{(item.options.stoimost).toLocaleString()}} ₽</span>
					</p> 


					<div v-if="item.value">
			      		<p class="white-txt">
			      			<span class="blue-txt">{{item.options.add_value}} шт / от {{(item.options.stoimost * item.options.add_value).toLocaleString()}}  ₽</span>
			      		</p>
			      		<v-slider step="1" min="1" max="30" v-model="item.options.add_value"></v-slider>
			      	</div>



				</div>




					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="col-lg-6">
				<nextstep />
			</div>
		</div>


	</div>
</template>

<script>
import Inner from '../components/Inner.vue'
import nextstep from '../components/nextstep.vue'
import editSingle from '../components/edit/editSingle.vue'
import {mapState, mapGetters} from 'vuex'

	export default{
		components: {Inner, nextstep, editSingle},
		data(){
			return{
				editorMode: false,
				presetMode: false,
				edit_single: false,
				editing_single: []
			}
		},
		computed: {
			...mapGetters({ 
				user: "auth/getAuthenticated",
				calc: "smeta/getCalc",
				activePreset: "preset/getActivePreset"
			}),
			getCalcPage(){
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
				

				return page
			}
		},
		methods: {
			openFilmer(param){
				this.edit_single = true
				this.editing_single = param
			},
			closeEditSingle(){
				this.edit_single = false
				this.editing_single = []
			},
			
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
		}
	}
</script>