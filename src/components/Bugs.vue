<template>
	<div class="edit-pop" @click="hideBugs($emit)">
		<div class="edit-pop-box text-center" @click.stop>
			<h3 class="text-left">Сообщить о баге</h3>


			<div class="ed-inp-row text-left">
				<label for="">E-mail:</label>
				<input type="text" v-model="email">
			</div>
			<div class="ed-inp-row text-left">
				<label for="">Описание бага:</label>
				<textarea v-model="bug"></textarea>
			</div>
			<br>
			<loading v-if="load" />
			<p class="blue-txt" v-else-if="sended">Ваше сообщение отправлено</p>
			<button v-else class="blue-btn" @click="submitBugs()">Отправить</button>


		</div>
	</div>
</template>


<script>
import loading from '../components/loading.vue'
import axios from 'axios'

	export default{
		components: {loading},
		data(){
			return{
				load: false,
				email: '',
				bug: '',
				sended: false
			}
		},
		methods: {
			hideBugs(){
				this.$emit('hideBugs')
			},
			submitBugs(){

				// if(this.$v.$invalid) {
				// 	this.$v.$touch();
				// 	return;
				// }

				this.load = true

				let emailBody = {
				email: this.email,
				bug: this.bug
			}

			var form = new FormData();

			for (var field in emailBody){
				form.append(field, emailBody[field]);
			};

			axios
            	.post('https://nikitapugachev.ru/wp-json/contact-form-7/v1/contact-forms/2372/feedback', form)
                .then((response) => {
					this.load = false
					this.sended = true
					this.email = ''
					this.bug = ''
                })
                .catch((error) => {
                	this.load = false
                    alert('Произошла ошибка!')
                });
		}
		}
	}
</script>