<script setup>
	const projects = [
		{
			"name": "straif two",
			"url": "https://store.steampowered.com/app/3850480/Straif/",
		},
		{
			"name": "pace",
			"url": "https://munost.itch.io/pace",
		},
		{
			"name": "straif",
			"url": "https://munost.itch.io/straif",
		},
		{
			"name": "winter vendetta",
			"url": "https://munost.itch.io/winter-vendetta"
		}
	];
</script>

<template>
	<div class="hero">
		<h1 class="title"> video games</h1>
		<a href="#/"> back </a>

		<div class="project" v-for="project in projects">
			<a :href="project.url" target="_blank"> {{project.name}} </a>
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
