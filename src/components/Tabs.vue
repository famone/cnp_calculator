<template>
	<div class="tabs" 
	v-if="$route.path !== '/' && this.$route.path !== '/login' && this.$route.path !== '/recovery' && this.$route.path !== '/signup' && this.$route.path !== '/enter' && this.$route.path !== '/profile'  && this.$route.name !== 'calc-route' ">
			<div class="container-fluid">
				<div class="tabs-row">
					<router-link tag="button" to="/page-1">Вводные</router-link>
					<router-link tag="button" to="/page-2">Описание</router-link>
					<router-link tag="button" to="/page-3">Специалисты</router-link>
					<router-link tag="button" to="/page-4">Оборудование</router-link>
					<router-link tag="button" to="/page-5">Локация</router-link>
					<router-link tag="button" to="/page-6">Актеры</router-link>
					<router-link tag="button" to="/page-7">Постпродакшн</router-link>
					<router-link tag="button" to="/page-8">Остальное</router-link>
					<router-link tag="button" to="/page-9">Итого</router-link>
				</div>
			</div>
		</div>
</template>