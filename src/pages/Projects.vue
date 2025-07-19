<script setup>
	const base_url = "https://github.com/vasiltop/"
	const projects = [
		{
			"name": "compiler",
			"github": "jolt",
		},
		{
			"name": "chip-8 emulator",
			"github": "chip-8",
		},
		{
			"name": "renderer",
			"github": "miye",
		},
		{
			"name": "raycaster",
			"github": "raywolf",
		},
		{
			"name": "text editor",
			"github": "shark",
		}
	];
</script>

<template>
	<div class="hero">
		<h1 class="title"> projects </h1>
		<a href="#/"> back </a>

		<div class="project" v-for="project in projects">
			<a :href="base_url + project.github" target="_blank"> {{project.name}} </a>
		</div>
	</div>
</template>

<style scoped>
	.project {
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 2px;
		margin: 0px;
	}

	.project > a {
		margin: 0px;
		font-weight: 400;
		font-size: 18px;
	}

	.project > p {
		margin: 0px;
	}

	.hero > a {
		margin-bottom: 5px;
	}
</style>
