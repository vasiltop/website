<script setup>
	const props = defineProps([
		'href',
		'path',
	])
</script>

<template>
	<a :href="props.href" target="_blank">
		<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path :d="props.path"/>
		</svg>
	</a>
</template>

<style scoped>
	a {
		width: 1.5em;
		height: 1.5em;
	}

	svg {
		fill: var(--link-color);
	}

	svg:hover {
		opacity: 80%;
	}
</style>

