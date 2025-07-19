<script setup>
	import { ref, computed } from 'vue';
	import Home from './pages/Home.vue';
	import Projects from './pages/Projects.vue';
	import Experience from './pages/Experience.vue';
	import Games from './pages/Games.vue';

	const routes = {
		'/': Home,
		'/projects': Projects,
		'/experience': Experience,
		'/games': Games,
	};

	const current_path = ref(window.location.hash);
	
	window.addEventListener('hashchange', () => {
		current_path.value = window.location.hash;
	});

	const current_view = computed(() => {
		return routes[current_path.value.slice(1) || '/'];
	});
	
</script>

<template>
	<component :is="current_view" />
</template>

<style>
	#app {
		width: 100vw;
		height: 100vh;
		background-color: #dbd4ca;
	}

	body {
		margin: 0px;
	}

	.hero {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		flex-direction: column;
		gap: 4px;
	}

	:root {
		--link-color: #4b4544;
		--text-color: #383433;
	}

	a, h1, h2, h3, h4, p {
		font-family: 'Times New Roman', serif;
	}

	h1, h2, h3, h4, p {
		color: var(--text-color);
	}

	.title {
		font-size: 60px;
		font-weight: 400;
		margin: 5px;
	}

	a {
		text-decoration: none;
		color: var(--link-color);
		font-size: 20px;
	}
	
	a:hover {
		text-decoration: underline;
	}
</style>
