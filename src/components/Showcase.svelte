<script>
	import IntersectionObserver from 'svelte-intersection-observer';
	import { createEventDispatcher } from 'svelte';
	import { Reload } from 'radix-icons-svelte';
	import { fade, fly } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	import { showcaseText } from '../text.json';

	const showcaseSizes = [];
	const squareSizes = [];
	let showcaseSize = 50;
	let squareSize = 45;
	$: showProblem = false;
	$: showReloadButton = false;

	const resetAnimation = () => {
		showProblem = false;
		showReloadButton = false;
	};
	const animate = () => {
		setTimeout(() => {
			showProblem = true;
			setTimeout(() => {
				showReloadButton = true;
			}, 300);
		}, 750);
	};

	let squareElement;
	export let lang;
</script>

<div class="showcase-container">
	<div class="showcase" style="width: {showcaseSize}vh">
		<IntersectionObserver
			class="square-intersectionObserver"
			element={squareElement}
			on:intersect={animate}>
			<div
				class="square-image"
				style="width: {squareSize}vh; height: {squareSize}vh"
				bind:this={squareElement}>
				{#if showProblem}
					<img
						src="/assets/problem.webp"
						class="math-problem"
						alt="math problem"
						in:fly={{ y: -100, duration: 1000 }}
						out:fade />
				{/if}
			</div>
		</IntersectionObserver>
	</div>
	{#if showReloadButton}
		<button
			on:click={resetAnimation}
			transition:fade={{ delay: 500, duration: 250 }}
			class="replay-button">
			<span>מחדש</span>
			<Reload class="reload-icon" />
		</button>
	{/if}
</div>

<style lang="scss">
	* {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		-o-box-sizing: border-box;
		box-sizing: border-box;
	}
	@mixin flex-center {
		display: flex;
		justify-content: center;
	}
	.showcase-container {
		@include flex-center;
		height: 100vh;
		width: 99vw;
		background-color: rgb(15, 15, 15);
	}
	.showcase {
		@include flex-center;
		height: 50vh;
		align-self: center;
		margin: 50px;
		padding: 20px;
		background-color: #252526;
		border-radius: 30px;
		color: white;
	}
	.square-image {
		@include flex-center;
		margin: auto;
		background-image: url('/assets/square-margin-fully-transparent.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		transition: height 0.3s, width 0.3s, background-image 0.3s;
	}
	.math-problem {
		height: 48%;
		width: 48%;
		margin: auto;
		border: 1px solid dimgrey;
		border-radius: 15px;
		transform: translateY(-2px);
	}
	.replay-button {
		@include flex-center;
		position: absolute;
		transform: translateY(80vh);
		background: none;
		border: 1px solid dimgrey;
		border-radius: 10px;
		color: #2075c7;
		align-items: center;
		transition: color 0.3s, background-color 0.3s, border 0.3s;
		& > * {
			margin: 10px 0px 10px 7.5px;
		}
		&:hover {
			color: white;
			background-color: #2075c7;
			border: 1px solid rgb(15, 15, 15);
			cursor: pointer;
		}
	}
</style>
