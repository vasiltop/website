<script setup>
	const experiences = [
		{
			"company": "ciena",
			"title": "software engineer",
			"tenure": "starting september 2025",
		},
		{
			"company": "general dynamics mission systems",
			"title": "software engineer",
			"tenure": "january 2025 - april 2025",
		},
		{
			"company": "canada border services agency",
			"title": "data engineer",
			"tenure": "may 2024 - december 2024",
		},
	];
</script>

<template>
	<div class="hero">
		<h1 class="title"> experience </h1>
		<a href="#/"> back </a>

		<div class="experience" v-for="experience in experiences">
			<h3> {{experience.company}} :: {{experience.title}}</h3>
			<h3> {{experience.tenure}} </h3>
		</div>
	</div>
</template>

<style scoped>
	.experience {
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 2px;
		margin: 5px;
	}

	.experience > h3 {
		margin: 0px;
		font-weight: 400;
		font-size: 18px;
		color: var(--text-color);
	}
</style>
