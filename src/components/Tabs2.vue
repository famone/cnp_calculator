<template>
	<div class="tabs" 
	v-if="$route.path !== '/' && this.$route.path !== '/login' && this.$route.path !== '/enter' && this.$route.path !== '/profile' ">
			<div class="container-fluid">
				<div class="tabs-row">
					<router-link tag="button" 
					:to="'/page-1/' + presetSlugs.login + '/' + presetSlugs.preset ">Вводные</router-link>
					<router-link tag="button" 
					:to="'/page-2/' + presetSlugs.login + '/' + presetSlugs.preset ">Описание</router-link>
					<router-link tag="button" 
					:to="'/page-3/' + presetSlugs.login + '/' + presetSlugs.preset ">Специалисты</router-link>
					<router-link tag="button" 
					:to="'/page-4/' + presetSlugs.login + '/' + presetSlugs.preset ">Оборудование</router-link>
					<router-link tag="button" 
					:to="'/page-5/' + presetSlugs.login + '/' + presetSlugs.preset ">Локация</router-link>
					<router-link tag="button" 
					:to="'/page-6/' + presetSlugs.login + '/' + presetSlugs.preset ">Актеры</router-link>
					<router-link tag="button" 
					:to="'/page-7/' + presetSlugs.login + '/' + presetSlugs.preset ">Постпродакшн</router-link>
					<router-link tag="button" 
					:to="'/page-8/' + presetSlugs.login + '/' + presetSlugs.preset ">Остальное</router-link>
					<router-link tag="button" 
					:to="'/page-9/' + presetSlugs.login + '/' + presetSlugs.preset ">Итого</router-link>
				</div>
			</div>
		</div>
</template>


<script>
import {mapGetters} from 'vuex'

export default{
	computed: {
		...mapGetters({
			presetSlugs: "preset/getPresetSlugs"
		})
	}
}
</script>