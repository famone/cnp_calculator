<template>
	<section id="p404">
		<div class="container text-center">
			<h1>🤐 Раздел в разработке</h1>
			<p class="white-txt">Скоро поиграемся и тут )</p>
			<button @click="$router.go(-1)" class="blue-btn">Назад</button>
		</div>
	</section>
</template>

<style scoped>
#p404{
	height: calc(100vh - 110px);
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>