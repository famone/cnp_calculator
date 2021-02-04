<template>
	<section id="login" class="container">
		<div class="col-lg-12 text-center">
			<img src="../assets/img/logo.svg" alt="" class="logo">
			<h3>Авторизация</h3>
			<form class="text-center"  @submit.prevent="login">
				<div class="form-box">
					<input type="text" v-model="user.login" placeholder="Логин">
				</div>
				<div class="form-box">
					<input type="password" v-model="user.password" placeholder="Пароль">
				</div>

				<div class="form-box">
					<loading v-if="loadingLog" /> 
					<button class="blue-btn" v-else>Войти</button>
				</div>

			</form>
		</div>
	</section>
</template>

<script>
import loading from '../components/loading.vue'

export default{
	components: {loading},
	data(){
		return{
			user: {
				login: '',
				password: ''
			},
			loadingLog: false
		}
	},
	methods: {
		login(){
			this.loadingLog = true
			// const newUser = {
			// 	avatar: 'https://www.kinonews.ru/insimgs/2019/newsimg/newsimg87089.jpg',
			// 	name: 'Константин',
			// 	surname: 'Тимофеев',
			// 	date: '29.12.2020',
			// 	status: 'Без подписки',
			// 	nick: 'famzayka',
			// 	tel: '+7 964 384-34-54',
			// 	mail: 'kt@webink.site',
			// 	presets: []
			// }
			const form = {
				username: this.user.login,
	        	password: this.user.password,
			}
			

			// console.log(newUser)
			this.$store.dispatch("auth/AUTH_REQUEST", form).then(() => {
				this.loadingLog = false
        		this.$router.replace("/profile");
			});
		}
	}
}
</script>

<style scoped>
form{
	width: 335px;
	margin: 0 auto;
}
.logo{
	height: 36px;
    margin-bottom: 20px;
}
input{
	background-color: #fff;
	font-size: 14px;
	font-weight: 600;
    color: #111;
    line-height: 140%;
    height: 50px;
    max-width: 335px;
    width: 100%;
    padding: 15px 16px;
    border: none;
    margin-bottom: 20px;
    border-radius: 5px;
}
.blue-btn{
	width: 100%;
}
</style>