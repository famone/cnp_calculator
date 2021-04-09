<template>
	<section id="login" class="container">
		<div class="col-lg-12 text-center">
			<img src="../assets/img/logo.svg" alt="" class="logo">
			<h3>Регистрация</h3>
			<form class="text-center"  @submit.prevent="login">
				<div class="form-box">
					<input type="text" v-model="name" placeholder="Почта" :class="{errorInp : ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.email)}">
				</div>
				<div class="form-box">
					<input type="password" v-model="pass1" placeholder="Пароль" :class="{errorInp : ($v.pass1.$dirty && !$v.pass1.required) || ($v.pass1.$dirty && !$v.pass1.minLength)}">
				</div>
				<div class="form-box">
					<input type="password" v-model="pass2" placeholder="Подтверждение пароля" :class="{errorInp : $v.pass1.$dirty && !$v.pass1.required || pass1 !== pass2}">
				</div>

				<p style="color: red;" v-if="passError">Пароли разные!</p>

				<div class="form-box">
					<loading v-if="loadingLog" /> 
					<button class="blue-btn" v-else>Зарегистрироваться</button>
				</div>

				<div class="sign-links">
					<router-link tag="a" to="/enter">Войти</router-link>
				</div>

			</form>
		</div>

		<v-snackbar v-model="getNew"> Пользователь с таким логином уже существует
		      <template v-slot:action="{ attrs }">
		        <v-btn color="#2E97E6" text v-bind="attrs" @click="getNew = false">
		          Закрыть 
		        </v-btn>
		      </template>
		    </v-snackbar>


	</section>
</template>

<script>
import loading from '../components/loading.vue'
import { required, email, minLength } from "vuelidate/lib/validators";
import {mapActions, mapState, mapGetters} from 'vuex'

export default{
	components: {loading},
	data(){
		return{
			name: '',
			pass1: '',
			pass2: '',
			loadingLog: false
		}
	},
	validations: {
		pass1: {
			required,
		},
		pass2: {
			required
		},	
		name: {
			required, 
			email
		}
	},
	computed: 
		{...mapGetters('signup', ['getNew']),
		passError(){
			if(this.pass1 !== this.pass2){
				return true
			}else{
				return false
			}
		}

	},
	methods: {
		...mapActions({
	      SIGN_UP: "signup/SIGN_UP",
	    }),
		login(){
			if(this.$v.$invalid) {
					this.$v.$touch();
					return;
			}

			this.loadingLog = true

			if(this.pass1 !== this.pass2){
	     		this.loadingLog = false
	     		return
	     	}

	     	let form = {
	        	username: this.name,
	        	password: this.pass1,
	     	}

	     	this.SIGN_UP(form).then(() => {
	     		this.loadingLog = false
	     		if(!this.getNew){
	     			this.$router.replace("/enter");
	     			return
	     		}
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
.errorInp{
	border: 1px red solid;
}
</style>