<template>
	<section id="main" class="container">
			<div class="col-lg-6 wow fadeInUp">
				<h3>CNP Калькулятор 2.0</h3>
				<h1>Добро пожаловать <br>
					в калькулятор <br>
 					для составления сметы</h1>
				<div class="copyright d-flex justify-start align-center">
					<a href="https://www.instagram.com/nikitapugachev/" class="mr-10">
						<p class="white-txt">Идея - <img src="../assets/img/logo.svg" style="height:15px;"></p>
					</a>
					<a href="https://webink.site/">
						<p class="white-txt">Разработка - <img src="../assets/img/webinklogo.svg" style="height:18px;"></p>
					</a>
				</div>
				<br>
				
 				<router-link tag="a" to="/profile">
 					<button class="blue-btn">Начать</button>
 				</router-link>
			</div>
			<div class="col-lg-6">
				<iframe title="vimeo-player" src="https://player.vimeo.com/video/538604185" frameborder="0" allowfullscreen ></iframe>
				<!-- <iframe title="vimeo-player" src="https://player.vimeo.com/video/362562070" width="640" height="360" frameborder="0" allowfullscreen></iframe> -->
			</div>
	</section>
</template>


<style scoped>
.copyright a{
	transition: all .3s ease;
}
.copyright a:hover{
	opacity: .5;
}
</style>