<script setup>
	import { ref, computed, onMounted } from 'vue';
	import Home from './pages/Home.vue';
	import Projects from './pages/Projects.vue';
	import Experience from './pages/Experience.vue';
	import Resume from './pages/Resume.vue';
	import ProjectReadme from './pages/ProjectReadme.vue';
	import { ensureReadmesLoaded } from '@/lib/readmeCache.js';

	function normalizeHash(hash) {
		let p = (hash.startsWith('#') ? hash.slice(1) : hash) || '/';
		if (p.length > 1 && p.endsWith('/')) p = p.replace(/\/+$/, '');
		return p || '/';
	}

	const current_path = ref(normalizeHash(window.location.hash));

	window.addEventListener('hashchange', () => {
		current_path.value = normalizeHash(window.location.hash);
	});

	onMounted(() => {
		ensureReadmesLoaded();
	});

	const route = computed(() => {
		const p = current_path.value;
		if (p === '/' || p === '') return { view: 'home' };
		if (p === '/projects') return { view: 'projects' };
		if (p.startsWith('/projects/')) {
			const slug = p.slice('/projects/'.length);
			if (slug) return { view: 'project', slug: decodeURIComponent(slug) };
		}
		if (p === '/experience') return { view: 'experience' };
		if (p === '/resume') return { view: 'resume' };
		return { view: 'home' };
	});
</script>

<template>
	<Home v-if="route.view === 'home'" />
	<Projects v-else-if="route.view === 'projects'" />
	<ProjectReadme v-else-if="route.view === 'project'" :slug="route.slug" />
	<Experience v-else-if="route.view === 'experience'" />
	<Resume v-else-if="route.view === 'resume'" />
	<Home v-else />
</template>

<style>
	html,
	body {
		margin: 0;
		min-height: 100%;
		background-color: #dbd4ca;
	}

	#app {
		width: 100%;
		min-height: 100vh;
		background-color: #dbd4ca;
	}

	.hero {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		min-height: 100vh;
		flex-direction: column;
		gap: 4px;
		box-sizing: border-box;
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
