<template>
	<section id="login" class="container">
		<div class="col-lg-12 text-center">
			<img src="../assets/img/logo.svg" alt="" class="logo">
			<h3>Восстановление пароля</h3>
			<form class="text-center"  @submit.prevent="login">
				<div class="form-box">
					<input type="text" v-model="email" placeholder="E-mail" :class="{errorInp : $v.email.$dirty && !$v.email.required}">
				</div>
				<div class="form-box">
					<loading v-if="loadingLog" /> 
					<button class="blue-btn" v-else>Восстановить</button>
				</div>

				<div class="sign-links">
					<router-link tag="a" to="/enter">Войти</router-link>
				</div>

			</form>
		</div>
	</section>
</template>

<script>
import loading from '../components/loading.vue'
import {mapActions, mapState} from 'vuex'
import { required } from "vuelidate/lib/validators";

export default{
	components: {loading},
	data(){
		return{
			email: '',    
			loadingLog: false
		}
	},
	validations: {	
		email: {
			required
		}
	},
	methods: {
		...mapActions({
	      REMEMBER_PASS: "forgot/REMEMBER_PASS",
	    }),
		login(){
			if(this.$v.$invalid) {
					this.$v.$touch();
					return;
			}

			this.loadingLog = true
			let email = this.email

			this.REMEMBER_PASS(email).then(() => {
	     		this.loadingLog = false
		      });
			

		}
	}
}
</script>

<style scoped>
.errorInp{
	border: 1px red solid;
}
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