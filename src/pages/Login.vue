<template>
	<section id="login" class="container">
		<div class="col-lg-12 text-center">
			<img src="../assets/img/logo.svg" alt="" class="logo">
			<h3>Авторизация</h3>
			<form @submit.prevent="login()" class="text-center">
				<div class="form-box">
					<input type="text" v-model="user.login" placeholder="Логин">
				</div>
				<div class="form-box">
					<input type="password" v-model="user.password" placeholder="Пароль">
				</div>

				<div class="form-box">
					<button class="blue-btn">Войти</button>
				</div>

			</form>
		</div>
	</section>
</template>

<script>
export default{
	data(){
		return{
			user: {
				login: '',
				password: ''
			}
		}
	},
	methods: {
		login(){
			this.$store.dispatch("smeta/LOGIN", this.user).then(() => {
        		this.$router.replace("/");
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