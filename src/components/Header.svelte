<script>
	import { isDark } from '../stores/darkmode';
	import {
		Globe,
		DividerVertical,
		TwitterLogo,
		InstagramLogo,
		DiscordLogo,
		GithubLogo,
	} from 'radix-icons-svelte';
	export let lang = 'he';

	const socialMediaLinks = [
		{
			href: 'https://twitter.com/ReverseProofDev',
			Icon: TwitterLogo,
			color: '#00acee',
		},
		{
			href: 'https://www.instagram.com/reverseproof/',
			Icon: InstagramLogo,
			color: '#E4405F',
		},
		{ href: '', Icon: DiscordLogo, color: '#5865F2' },
		{
			href: 'https://github.com/orenghe988/ReverseProof-front',
			Icon: GithubLogo,
			color: 'black',
		},
	];
	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<div class="header-wrapper" style={$isDark ? 'color: white' : ''}>
	<div
		class="header"
		style="--header-border-color: {$isDark
			? 'rgba(204, 204, 204, 0.25)'
			: 'rgba(15, 15, 15, 0.25)'};">
		<div class="logo-wrapper">
			<a href="/" class="logo-link">
				<img
					src={$isDark
						? '/assets/square-margin-fully-transparent.webp'
						: '/assets/square-margin.webp'}
					alt="header logo"
					class="header-logo" />
			</a>
			<a href="/" class="logo-link">
				<span class="logo-text">ReverseProof.cc</span>
			</a>
		</div>
		{#if innerWidth > 768}
			<div class="icons-container">
				{#each socialMediaLinks as { href, Icon, color }}
					<div
						style="--icon-container-color: {$isDark
							? 'transparent'
							: color};">
						<a {href}>
							<Icon />
						</a>
					</div>
				{/each}
				<DividerVertical
					color="dimgrey"
					size="40"
					style="margin: 0px -15px;" />
				<div
					style="--icon-container-color: {$isDark
						? 'transparent'
						: 'rgb(57,62,70)'};">
					<a
						href={lang === 'he' ? '/en' : '/he'}
						style="--icon-color: white;">
						<Globe />
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@mixin centerFlexBox {
		display: flex;
		justify-content: center;
	}
	.header-wrapper {
		position: fixed;
		width: 80vw;
		height: 50px;
		top: 20px;
		z-index: 100;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
	}
	.header {
		position: sticky;
		width: 100%;
		height: 100%;
		background: rgba(81, 81, 81, 0.1);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		border: 1px solid var(--header-border-color);
		border-radius: 10px;
		display: flex;
		justify-content: space-between;
	}
	.logo-wrapper {
		display: inline-flex;
	}
	.logo-wrapper > a {
		margin: auto;
		padding: 5px;
		font-family: 'Miriam Libre', sans-serif;
		font-size: 20px;
		text-decoration: none;
		color: inherit;
		display: inline-flex;
		justify-content: center;
		flex-basis: auto;
	}
	.logo-text {
		display: inline-flex;
		flex-direction: column;
		vertical-align: middle;
		line-height: normal;
		transition: color 0.5s;
		&:hover {
			color: grey;
		}
	}
	.header-logo {
		height: 40px;
		border-radius: 7px;
		transition: color 0.5s;
		transform: translateY(-1px);
		&:hover {
			color: grey;
		}
	}
	.icons-container {
		height: 100%;
		width: auto;
		padding: 0px 5px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	.icons-container div {
		@include centerFlexBox;
		height: 25px;
		width: 25px;
		align-items: center;
		margin: auto 10px;
		-webkit-transition: color 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
		transition: color 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
		background-color: var(--icon-container-color);
		border-radius: 25%;
	}
	.icons-container div a {
		@include centerFlexBox;
		align-items: center;
		-webkit-transition: color 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
		transition: color 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
		color: white;
		&:hover {
			color: lightgrey !important;
		}
	}
	@media (max-width: 768px) {
		//TODO temporaty!!
		.header {
			justify-content: center;
		}
	}
</style>
