<template>
	<header>
		<div class="container-fluid">
			<div class="shapka">
				<router-link tag="div" to="/" class="logo">
					COST<br>	
 					NIKITA<br>	
					PUGACHEV	
				</router-link>

				<div class="navigation">
					<button class="circle-btn">Попробуй бесплатно</button>
					<button class="servers"><img src="../assets/img/servers.svg" alt="">Сервисы</button>
					<div v-if="user" class="avatar" :style="{'background-image': 'url(' + avatar + ')'}"></div>
					<p v-if="user" class="white-txt" style="margin: 0 0 0 10px;">Привет, {{user}}!</p>
				</div>

			</div>
		</div>
	</header>
</template>	


<script>
import {mapState} from 'vuex'
	export default{
		data(){
			return{
				avatar: require('../assets/img/avatar.png'),
				tabLinks:[]
			}
		},
		computed: {
			...mapState('smeta', ['user'])
		}
	}
</script>