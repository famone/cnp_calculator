<template>
	<div class="tabs" v-if="$route.path !== '/' && this.$route.path !== '/login' ">
			<div class="container-fluid">
				<div class="tabs-row">
					<router-link tag="button" to="/page-1">Вводные</router-link>
					<router-link tag="button" to="/page-2">Описание</router-link>
					<router-link tag="button" to="/page-3">Специалисты</router-link>
					<router-link tag="button" to="/page-4">Оборудование</router-link>
					<router-link tag="button" to="/page-5">Свет</router-link>
					<router-link tag="button" to="/page-6">Локация</router-link>
					<router-link tag="button" to="/page-7">Актеры</router-link>
					<router-link tag="button" to="/page-8">Постпродакшн</router-link>
					<router-link tag="button" to="/page-9">Остальное</router-link>
					<router-link tag="button" to="/page-10">Итого</router-link>
				</div>
			</div>
		</div>
</template>