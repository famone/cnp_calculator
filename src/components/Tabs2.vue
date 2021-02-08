<template>
	<div class="tabs" 
	v-if="$route.path !== '/' && this.$route.path !== '/login' && this.$route.path !== '/enter' && this.$route.path !== '/profile' ">
			<div class="container-fluid">
				<div class="tabs-row">
					<router-link tag="button" to="/page-1/kt/12">Вводные</router-link>
					<router-link tag="button" to="/page-2/kt/12">Описание</router-link>
					<router-link tag="button" to="/page-3/kt/12">Специалисты</router-link>
					<router-link tag="button" to="/page-4/kt/12">Оборудование</router-link>
					<router-link tag="button" to="/page-5/kt/12">Локация</router-link>
					<router-link tag="button" to="/page-6/kt/12">Актеры</router-link>
					<router-link tag="button" to="/page-7/kt/12">Постпродакшн</router-link>
					<router-link tag="button" to="/page-8/kt/12">Остальное</router-link>
					<router-link tag="button" to="/page-9/kt/12">Итого</router-link>
				</div>
			</div>
		</div>
</template>