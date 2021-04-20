<template>
	<section id="main" class="container">
		
			<div class="col-lg-6 wow fadeInUp">
				<h3>CNP Калькулятор 2.0</h3>
				<h1>Добро пожаловать <br>
					в калькулятор <br>
 					для составления сметы</h1>
 				<router-link tag="a" to="/profile">
 					<button class="blue-btn">Начать</button>
 				</router-link>
			</div>
			<div class="col-lg-6 hidden-xs">
				<iframe title="vimeo-player" src="https://player.vimeo.com/video/538604185" frameborder="0" allowfullscreen></iframe>
			</div>
	</section>
</template>

<style scoped>
iframe{
	width: 100%;
	height: 400px;
}
</style>