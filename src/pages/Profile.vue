<template>
	<div>
		<section id="inner">
	  		<div class="container">
				<div class="col-lg-7">
					<h1>Личный кабинет</h1>
				</div>
			</div>
		</section>


		<section id="profile" v-if="user">
			<div class="container">
				<div class="col-lg-7">
					<div class="data-row">
						<h3>Основное</h3>
						<div class="avatar-box">
							<div class="avatar" :style="{'background-image': 'url(' + user.avatar + ')'}">
								<img src="../assets/img/verified.svg" class="verified" 
								v-if="user.roles.includes('administrator')">
							</div>
								<div>
									<p class="small-grey">Вы можете загрузить изображение в формате JPG, GIF или PNG. 
									<br>600px на 600px JPG/GIF/PNG Подходят лучше всего</p>
									<div class="new-avatar" >
										<input type="file" id="myfile" name="upload" ref="file" @change="changeAvatar"/>
										<img src="../assets/img/reboot.svg" alt="">
										Обновить изображение
									</div>
									<!-- <input type="file" ref="file" @change="changeAvatar"> -->
									
								</div>
						</div>
					</div>

					<div class="data-row">
						<h2>{{user.user_display_name}}</h2>
						<p class="white-txt">Присоединился: <span class="blue-txt">{{user.registred}}</span></p>
						<!-- <p class="white-txt">Тип профиля: <span class="blue-txt">{{user.status}}</span></p>
						<button class="blue-btn">Оплатить подписку</button> -->
					</div>


					<div class="data-row profile-fields">
						<label for="">Никнейм</label>
						<input type="text" :value="user.user_nicename" data-field="nick">

						<label for="">Имя и фамилия</label>
						<input type="text" :value="user.user_display_name" data-field="name">

						<!-- <label for="">Телефон</label>
						<input type="text" :value="user.tel" data-field="tel"> -->

						<label for="">E-mail</label>
						<input type="text" :value="user.user_email" data-field="mail">
					</div>

					<!-- <button class="blue-btn">Сохранить</button> -->


				</div>

				<div class="col-lg-5">
					<div class="data-row">
						<h3>Мой калькулятор</h3>
						<div class="presets" v-if="presets">
							<router-link tag="div" to="/page-1" class="preset-btn add-preset" v-if="!presets.data">
								<div class="plus"></div>
								Создать калькулятор
							</router-link>
							<div class="preset-btn" v-for="item in presets.data">
								<div class="preset-actions">
									<div class="take-preset" @click="setActivePreset(item.json, item.slug)">
										<span class="mdi mdi-lead-pencil"></span>
									</div>
									<div class="take-preset" v-clipboard:copy="linkConstructor(item)" 
									@click="snackbar = true">
										<span class="mdi mdi-link-variant"></span>
									</div>
									<div class="take-preset" @click="openConfirmPop(item.slug)"> 
										<img src="../assets/img/trash.svg" alt="">
									</div>
								</div>
								{{item.nazvanie}}	
							</div>
						</div>
						<loading v-else /> 
					</div>
				</div>
				
			</div>

			<v-snackbar v-model="snackbar"> Ссылка скопирована в буфер обена
		      <template v-slot:action="{ attrs }">
		        <v-btn color="#2E97E6" text v-bind="attrs" @click="snackbar = false">
		          Закрыть 
		        </v-btn>
		      </template>
		    </v-snackbar>

		</section>	

		<confirmDelite :delitingPreset="delitingPreset" v-if="delitingPreset !== '' " 
		@closeConfirm="delitingPreset = '' " />


	</div>
	
</template>



<script>
import loading from '../components/loading.vue'
import {mapGetters} from 'vuex'
import axios from 'axios'
import confirmDelite from '../components/confirmDelite.vue'

	export default{
		components: {loading, confirmDelite},
		data(){
			return{
				file: null,
				snackbar: false,
				delitingPreset: ''
			}
		},
		created(){
			this.$store.dispatch('preset/GET_PRESETS', this.user)
		},
		computed: {
			...mapGetters({ 
				user: "auth/getAuthenticated",
				presets: "preset/getPresets"
			}),
		},
		methods: {
			openConfirmPop(slug){
				this.delitingPreset = slug
			},
			linkConstructor(item){
				let newLink = window.location.origin + '/calc/' + this.user.user_nicename + '/' + item.slug

				return newLink
			},
			copyLink(item){
				let newLink = window.location.origin + '/calc/' + this.user.user_nicename + '/' + item.slug

				// newLink.select()
				document.execCommand("newLink");
				
			},
			changeAvatar(){
				this.file = this.$refs.file.files[0];

				let userData = {
					avatar: this.file,
					id: this.user.id
				}
				var form2 = new FormData();

				for (var field in userData){
					form2.append(field, userData[field]);
				};

				 axios
				 .post('https://nikitapugachev.ru/wp-json/np/v1/add/avatar', form2)
				 .then(res =>{
				 	console.log(res)
				 })
			},
			setActivePreset(preset, slug){
				let clientPres = {
					login: this.user.user_nicename,
					preset: slug
				}
				this.$store.dispatch('preset/loadActivePreset', preset).then(() => {
					this.$store.dispatch('preset/setPresetSlugs', clientPres)
        			this.$router.replace(`/page-1/${this.user.user_nicename}/${slug}`);
        			
				});
				
			}
		}
	}
</script>


<style>
#myfile {
  height: 100%;
  cursor: pointer;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
}
#myfile:focus{
    outline: none!important;
    outline-offset:none!important;
}
</style>