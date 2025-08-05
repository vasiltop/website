<script setup>
import IconLink from '@/components/IconLink.vue';
import { icon_data } from "@/icons.js";

</script>

<template>
	<div class="hero">
		<h1 class="title"> vasil topalovic</h1>
		<a href="#/experience"> experience </a>
		<a href="#/projects"> projects </a>
		<a href="#/games"> video games </a>
		<!-- <a href="/resume.pdf" target="_blank"> resume </a> -->
		<a href="mailto:vasiltopalovic@outlook.com"> contact me </a>

		<div id="icon-row" >
			<IconLink v-for="icon in icon_data" :href="icon.href" :path="icon.svg" />
		</div>
	</div>
</template>

<style scoped>	

	#icon-row {
		display: flex;
		gap: 10px;
		width: 4em;
		height: 3em;
		align-items: center;
		justify-content: center;
	}
</style>
