<script setup>
	import { computed } from 'vue';
	import { pinnedRepos, slugForPin } from '@/config/pinnedRepos.js';
	import { readmeCache } from '@/lib/readmeCache.js';

	const pins = pinnedRepos;

	const statusMessage = computed(() => {
		if (readmeCache.status === 'loading') return 'loading readmes…';
		if (readmeCache.status === 'error') return readmeCache.error || 'failed to load readmes';
		return null;
	});
</script>

<template>
	<div class="hero">
		<h1 class="title"> projects </h1>
		<a href="#/"> back </a>

		<p v-if="statusMessage" class="status">{{ statusMessage }}</p>

		<div class="project" v-for="pin in pins" :key="slugForPin(pin)">
			<a :href="'#/projects/' + encodeURIComponent(slugForPin(pin))">
				{{ readmeCache.entries[slugForPin(pin)]?.title ?? pin.title ?? pin.repo }}
			</a>
		</div>
	</div>
</template>

<style scoped>
	.status {
		margin: 4px 0 8px;
		font-size: 16px;
		color: var(--text-color);
		opacity: 0.85;
	}

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

	.hero > a {
		margin-bottom: 5px;
	}
</style>
