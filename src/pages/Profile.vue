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
							<div class="avatar" :style="{'background-image': 'url(' + user.avatar + ')'}"></div>
								<div>
									<p class="small-grey">Вы можете загрузить изображение в формате JPG, GIF или PNG. 
									<br>600px на 600px JPG/GIF/PNG Подходят лучше всего</p>
									<button class="new-avatar"><img src="../assets/img/reboot.svg" alt="">Обновить изображение</button>
								</div>
						</div>
					</div>

					<div class="data-row">
						<h2>{{user.name}} {{user.surname}}</h2>
						<p class="white-txt">Присоединился: <span class="blue-txt">{{user.date}}</span></p>
						<p class="white-txt">Тип профиля: <span class="blue-txt">{{user.status}}</span></p>
						<button class="blue-btn">Оплатить подписку</button>
					</div>

					<div class="data-row profile-fields">
						<label for="">Никнейм</label>
						<input type="text" :value="user.nick" data-field="nick" @input="changeProf($event)">

						<label for="">Имя</label>
						<input type="text" :value="user.name" data-field="name" @input="changeProf($event)">

						<label for="">Фамилия</label>
						<input type="text" :value="user.surname" data-field="surname" @input="changeProf($event)">

						<label for="">Телефон</label>
						<input type="text" :value="user.tel" data-field="tel" @input="changeProf($event)">

						<label for="">E-mail</label>
						<input type="text" :value="user.mail" data-field="mail" @input="changeProf($event)">
					</div>

					<button class="blue-btn">Сохранить</button>


				</div>

				<div class="col-lg-5">
					<div class="data-row">
						<h3>Пресеты</h3>
						<div class="presets">
							<div class="preset-btn add-preset">
								<div class="plus"></div>
								Добавить <br> пресет
							</div>
							<div class="preset-btn" v-for="item in user.presets">
								<div class="take-preset"><span class="mdi mdi-lead-pencil"></span></div>
								Пресет 1
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>	



	</div>
	
</template>



<script>
	import {mapGetters} from 'vuex'

	export default{
		computed: {
			...mapGetters({ user: "auth/getAuthenticated"})
		},
		methods: {
			changeProf(e){
				console.log(e.target.getAttribute('data-field'))

				let fieldName = e.target.getAttribute('data-field')

				this.user[fieldName] = e.target.value
			}
		}
	}
</script>