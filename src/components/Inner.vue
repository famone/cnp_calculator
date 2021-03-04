<template>
	<section id="inner">
		<div :class="this.$route.path.includes('page-4') ? 'container-fluid' : 'container' ">
			<div class="col-lg-7">
				<h1>{{innerTxt}}</h1>
				<!-- <h3>{{innerTxt.subtitle}}</h3> -->
			</div>
		</div>
	</section>
</template>


<script>
	export default{
		props: {
			innerTxt: {
				type: String,
				required: true
			}
		}
	}
</script>