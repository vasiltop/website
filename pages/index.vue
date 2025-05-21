<script setup lang="ts">
import init, { execute } from '../wasm/ember';

type Project = {
	name: string;
	description: string;
	github: string;
	website?: string;
	image: string;
};

const projects: Project[] = [
	{
		name: 'Compiler',
		description:
			'A statically typed programming language designed to be efficient and easy to use. Provides extremely fast compile times and matches the performance of all modern compilers with an LLVM backend.',
		github: 'https://github.com/vasiltop/compiler',
		image: 'compiler.png',
	},
	{
		name: 'Online Multiplayer Video Game',
		description: 'Straif is a fast-paced time trial game inspired by the movement mechanics of the Source Engine games like Counter-Strike: Source.',
		github: 'https://github.com/vasiltop/straif',
		website: 'https://munost.itch.io/straif',
		image: 'straif.png',
	},
	{
		name: '3D Renderer',
		description:
			"Miye is a simple, lightweight .obj model renderer.",
		github: 'https://github.com/vasiltop/miye',
		website: 'https://crates.io/crates/miye',
		image: 'miye.png',
	},
	{
		name: 'Interpreter',
		description:
			'Ember is a simple interpreted programming language that follows the fundamental syntax of many popular languages. ',
		github: 'https://github.com/vasiltop/ember',
		image: 'ember.png',
	},
	{
		name: 'Moonqwake',
		description:
			'A 3-dimensional moonquake viewer with timeline scrubbing and visual insights. ',
		github: 'https://github.com/spacemoonkeys/moonqwake',
		website: 'https://moonqwake.pages.dev/',
		image: 'moonqwake.png',
	},
	{
		name: 'Metrics Site',
		description:
			'A Slice of Pi is a web application created for the OutStem Coding Challenge, where users can view metrics about a fictional pizza store.',
		github: 'https://github.com/vasiltop/metrics',
		website: 'https://a-slice-of-pi.vasiltopalovic.com/',
		image: 'metrics.png',
	},
	{
		name: 'Text Editor',
		description:
			'A lightweight, cross-platform, terminal based text editor.',
		github: 'https://github.com/vasiltop/shark',
		image: 'shark.png',
	},
	{
		name: 'Raycasting Engine',
		description:
			'An implementation of a raycasting engine that displays any array of cells into a 3d environment using the SDL2 library to draw pixels on the screen.',
		github: 'https://github.com/vasiltop/raycasting-engine',
		image: 'raywolf.png',
	},
];

onMounted(async () => {
	await init();
	ready.value = true;
});

const code = ref('print! "Write some code here!";');

watch(code, () => {
	const encoder = new TextEncoder();
	const bytes = encoder.encode(code.value);

	try {
		output.value = execute(bytes);
		error.value = '';
	} catch (e) {
		error.value = e as string;
	}
});

const output = ref('Write some code here!');
const error = ref('');
const ready = ref(false);
</script>

<template>
	<div
		class="fixed bg-black w-screen h-screen intro grid place-items-center z-50"
	>
		<h2 class="text-white text-3xl fade-intro">Vasil Topalovic</h2>
	</div>

	<Navbar></Navbar>

	<section class="flex flex-col items-center fade-intro-delay opacity-0">
		<div
			class="basis-4/5 flex flex-col justify-center px-24 max-w-5xl my-5 overflow-y-hidden"
		>
			<h1 class="lg:text-6xl md:text-5xl text-3xl text-center my-8">Welcome!</h1>
			<p
				class="border-gradient lg:leading-8 md:leading-6 leading-5 min-w-[10em] text-xl text-center"
			>
				I’m a third-year Computer Science student at the University of Ottawa passionate about backend development and low-level software engineering. 
				I love building efficient, scalable systems and diving deep into how things work under the hood. Check out my projects below!
			</p>
		</div>

		<div class="flex-grow">
			<h3 class="text-center text-2xl">Scroll down to view my projects!</h3>

			<div class="w-full flex justify-center">
				<svg
					width="24"
					fill="#3c3939"
					height="24"
					xmlns="http://www.w3.org/2000/svg"
					fill-rule="evenodd"
					clip-rule="evenodd"
				>
					<path
						d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"
					/>
				</svg>
			</div>
		</div>
	</section>

	<section
		v-for="project in projects"
		class="flex flex-col items-center justify-center"
	>
		<h1 class="text-6xl p-4">{{ project.name }}</h1>
		<div class="flex gap-2 p-4">
			<SvgLink :link="project.github">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="#3c3939"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					></path>
				</svg>
			</SvgLink>
			<SvgLink v-if="project.website" :link="project.website">
				<svg
					width="24"
					height="24"
					class="hover:scale-110 duration-300 transition-all"
					fill="#3c3939"
					xmlns="http://www.w3.org/2000/svg"
					fill-rule="evenodd"
					clip-rule="evenodd"
				>
					<path
						d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12m2.557 16h-5.115c.546 2.46 1.441 4.114 2.558 5.744 1.194-1.741 2.041-3.41 2.557-5.744m-7.157 0h-4.567c1.236 2.825 3.704 4.972 6.755 5.716-1.048-1.733-1.783-3.658-2.188-5.716m13.767 0h-4.567c-.391 1.988-1.095 3.887-2.175 5.694 3.012-.763 5.517-2.895 6.742-5.694m-14.005-6h-4.962c-.267 1.313-.267 2.685 0 4h4.915c-.119-1.329-.101-2.672.047-4m7.661 0h-5.647c-.165 1.326-.185 2.672-.053 4h5.753c.133-1.328.111-2.673-.053-4m6.977 0h-4.963c.148 1.328.166 2.671.048 4h4.915c.26-1.285.273-2.648 0-4m-12.156-7.729c-3.077.732-5.567 2.886-6.811 5.729h4.653c.435-2.042 1.178-3.985 2.158-5.729m2.355-.048c-1.089 1.77-1.91 3.453-2.463 5.777h4.927c-.534-2.246-1.337-3.948-2.464-5.777m2.368.069c1.013 1.812 1.733 3.76 2.146 5.708h4.654c-1.232-2.816-3.762-4.958-6.8-5.708"
					/>
				</svg>
			</SvgLink>
		</div>

		<div
			v-if="project.name !== 'Interpreter'"
			class="w-4/6 h-4/6 flex flex-col rounded-lg overflow-hidden background-card"
			:style="'background-image: url(' + project.image + ')'"
		>
			<p class="text-[#3c3939] mt-auto bg-[#bbb6b2] bg-opacity-95 p-4">
				{{ project.description }}
			</p>
		</div>

		<div v-else class="grid grid-cols-2 place-items-center h-4/6 w-full p-16">
			<div
				class="w-full h-full flex flex-col rounded-lg overflow-hidden background-card"
				:style="'background-image: url(' + project.image + ')'"
			>
				<p class="text-[#3c3939] mt-auto bg-[#bbb6b2] bg-opacity-95 p-4">
					{{ project.description }}
				</p>
			</div>

			<div class="flex flex-col gap-4 w-4/6 h-4/6 overflow-hidden">
				<h3 class="text-2xl">Try the demo out!</h3>
				<textarea
					v-model="code"
					class="w-full h-full resize-none font-mono border-black border-2 rounded-lg p-4"
				>
				</textarea>
				<h3 class="text-xl">Output:</h3>
				<p v-if="!error" class="">{{ output }}</p>
				<p v-else class="text-red-500">{{ error }}</p>
			</div>
		</div>
	</section>
</template>

<style>
@import './index.css';
</style>
