<script setup>
	import { computed } from 'vue';
	import IconLink from '@/components/IconLink.vue';
	import { icon_data } from '@/icons.js';
	import { readmeCache, findPinBySlug } from '@/lib/readmeCache.js';

	const props = defineProps({
		slug: { type: String, required: true },
	});

	const pin = computed(() => findPinBySlug(props.slug));

	const entry = computed(() => readmeCache.entries[props.slug]);

	const githubHref = computed(() => entry.value?.githubUrl);

	const body = computed(() => {
		if (readmeCache.status === 'loading') return null;
		if (readmeCache.status === 'error')
			return { kind: 'error', text: readmeCache.error || 'unknown error' };
		if (!pin.value) return { kind: 'missing', text: 'project not found.' };
		if (!entry.value) return { kind: 'missing', text: 'readme not loaded yet.' };
		return { kind: 'html', html: entry.value.html };
	});
</script>

<template>
	<div class="page">
		<header class="top">
			<h1 class="title">{{ entry?.title ?? pin?.title ?? pin?.repo ?? slug }}</h1>
			<div class="row">
				<a href="#/projects"> back </a>
				<IconLink
					v-if="githubHref"
					:href="githubHref"
					:path="icon_data.github.svg"
				/>
			</div>
		</header>

		<div v-if="body?.kind === 'error' || body?.kind === 'missing'" class="message">
			<p>{{ body.text }}</p>
			<a href="#/projects">return to projects</a>
		</div>

		<article v-else-if="body?.kind === 'html'" class="readme" v-html="body.html"></article>

		<p v-else class="message">loading…</p>
	</div>
</template>

<style scoped>
	.page {
		min-height: 100vh;
		box-sizing: border-box;
		padding: 32px 24px 48px;
		max-width: 44rem;
		margin: 0 auto;
	}

	.top {
		text-align: center;
		margin-bottom: 28px;
	}

	.top .title {
		font-size: 42px;
		font-weight: 400;
		margin: 0 0 10px;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 14px;
	}

	.row > a {
		font-size: 20px;
	}

	.message {
		text-align: center;
		font-size: 18px;
		color: var(--text-color);
	}

	.message a {
		font-size: 18px;
	}

	.readme {
		font-family: 'Times New Roman', serif;
		color: var(--text-color);
		font-size: 17px;
		line-height: 1.45;
		text-align: left;
	}

	.readme :deep(h1),
	.readme :deep(h2),
	.readme :deep(h3) {
		font-weight: 400;
		margin: 1.1em 0 0.4em;
		line-height: 1.25;
	}

	.readme :deep(h1) {
		font-size: 1.45em;
	}

	.readme :deep(h2) {
		font-size: 1.25em;
	}

	.readme :deep(h3) {
		font-size: 1.1em;
	}

	.readme :deep(p) {
		margin: 0.55em 0;
	}

	.readme :deep(a) {
		font-size: inherit;
	}

	.readme :deep(ul),
	.readme :deep(ol) {
		margin: 0.5em 0;
		padding-left: 1.35em;
	}

	.readme :deep(li) {
		margin: 0.2em 0;
	}

	.readme :deep(pre) {
		background: rgba(0, 0, 0, 0.06);
		padding: 10px 12px;
		overflow-x: auto;
		font-size: 0.9em;
	}

	.readme :deep(code) {
		font-family: ui-monospace, monospace;
		font-size: 0.88em;
	}

	.readme :deep(pre code) {
		font-size: 0.95em;
	}

	.readme :deep(blockquote) {
		margin: 0.6em 0;
		padding-left: 0.9em;
		border-left: 2px solid rgba(75, 69, 68, 0.35);
	}

	.readme :deep(img) {
		max-width: 100%;
		height: auto;
		display: block;
		margin: 0.75em auto;
	}

	.readme :deep(table) {
		border-collapse: collapse;
		width: 100%;
		margin: 0.75em 0;
		font-size: 0.95em;
	}

	.readme :deep(th),
	.readme :deep(td) {
		border: 1px solid rgba(75, 69, 68, 0.25);
		padding: 6px 8px;
	}
</style>
