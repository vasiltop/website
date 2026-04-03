<script setup>
	const pdfHref = '/resume.pdf';
</script>

<template>
	<div class="resume-page">
		<header class="top">
			<h1 class="title"> resume </h1>
			<div class="row">
				<a href="#/"> back </a>
				<a :href="pdfHref" target="_blank" rel="noopener noreferrer"> open in new tab </a>
			</div>
		</header>
		<iframe
			class="pdf-frame"
			:src="pdfHref"
			title="Resume"
		/>
	</div>
</template>

<style scoped>
	.resume-page {
		box-sizing: border-box;
		min-height: 100vh;
		width: 100%;
		padding: 24px 16px 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	.top {
		text-align: center;
		flex-shrink: 0;
	}

	.top .title {
		font-size: 42px;
		font-weight: 400;
		margin: 0 0 10px;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 14px 20px;
	}

	.row a {
		font-size: 20px;
	}

	.pdf-frame {
		width: 100%;
		max-width: 52rem;
		height: min(78vh, 900px);
		min-height: 480px;
		border: none;
		background: rgba(255, 255, 255, 0.35);
	}
</style>
