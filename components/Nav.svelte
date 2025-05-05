<script module lang="ts">
	export interface NavLink {
		label: string;
		icon: string;
		href: string;
		index?: boolean;
	}
	export interface NavProps {
		links: NavLink[];
	}
</script>

<script lang="ts">
	import { page } from '$app/state';
	import Icon from './Icon.svelte';
	import { ui } from './Oneui.svelte';
	let { links }: NavProps = $props();
</script>

<nav class:hidden-only-mobile={ui.scrollDirection === 'down'} data-sveltekit-preload-data="off">
	{#each links as { label, icon, href, index }}
		{@const active = index ? page.url.pathname === href : page.url.pathname.includes(href)}
		<a {href} class:active>
			<Icon {icon} />
			{label}
		</a>
	{/each}
</nav>

<style>
	nav {
		width: 100%;
		height: 100%;
		display: flex;
	}
	a {
		font: var(--label-medium);
		color: rgba(var(--on), 0.64);
		width: 100%;
		display: grid;
		gap: 4px;
		justify-items: center;
		align-content: center;
	}

	a :global(.icon) {
		padding: 4px 16px;
		border-radius: 16px;
	}

	a.active :global(.icon) {
		background-color: rgba(var(--primary));
		color: rgba(var(--on-primary));
		font-variation-settings:
			'FILL' 1,
			'wght' 400,
			'GRAD' 0,
			'opsz' 48;
	}
	@media screen and (orientation: landscape) {
		nav {
			flex-direction: column;
			grid-area: nav;
			gap: 32px;
			padding: 16px 0;
		}
	}

	@media screen and (orientation: portrait) {
		nav {
			height: 64px;
			flex-direction: row;
			grid-area: nav;
			position: fixed;
			bottom: 0px;
			z-index: 2;
			background: rgba(var(--background), 0.98);
			transition: 90ms ease-out;
		}
		/* .hidden-only-mobile {
			bottom: -64px;
			transition: 90ms ease-in;
		} */
	}
</style>
