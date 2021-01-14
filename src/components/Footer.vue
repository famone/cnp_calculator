<template>
	<div class="bottom-bar"  v-if="this.$route.path !== '/' && this.$route.path !== '/login' ">
		<div class="progress" :style="{width: prgrss * 10 + '%'}"></div>
		<div class="container-fluid">
			
				

				<div class="col-lg-3">
					<div class="totals">
						<p class="white-txt">Всего: 454 234 ₽</p>
						<p class="white-txt">Налог {{getNalog}}% : 32 345 ₽</p>
					</div>
				</div>

				<div class="col-lg-6">
					<div class="additions">
						<p class="white-txt"><img src="../assets/img/addition.svg" alt="">Музыка</p>
						<p class="white-txt"><img src="../assets/img/time.svg" alt="">{{getRoliks}} сек</p>
						<p class="white-txt"><img src="../assets/img/date.svg" alt="">14.03.2020</p>
						<p class="white-txt"><img src="../assets/img/smen.svg" alt="">3 смены</p>
					</div>
				</div>

				<div class="col-lg-3">
					<div class="downloads">
						<p class="white-txt">XLS</p>
						<p class="white-txt">PDF</p>
						<p class="white-txt"><img src="../assets/img/trash.svg" alt="">Очистить</p>
					</div>
				</div>

		</div>
	</div>
</template>


<script>
import {mapGetters} from 'vuex'

	export default{
		props: {
			prgrss: {
				required: true,
				type: Number
			}
		},
		computed: {
			...mapGetters('smeta', ['getRoliks', 'getNalog'])
		}
	}
</script>