<script module lang="ts">
	class Ui {
		public innerWidth = $state<number | null>(null);
		public innerHeight = $state<number | null>(null);
		public scrollY = $state(0);
		public scrollDirection = $state<'initial' | 'down' | 'up'>('initial');
		orientation() {
			if (!this.innerWidth || !this.innerHeight) return 'initial';
			return this.innerWidth > this.innerHeight ? 'landscape' : 'portrait';
		}
	}
	export const ui = new Ui();
</script>

<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';
	import ProgressLinear from './ProgressLinear.svelte';
	import Dialog from './Dialog.svelte';
	import Toast from './Toast.svelte';
	let isLoading: boolean = $state(false);

	let { children }: { children: Snippet } = $props();

	afterNavigate(() => {
		isLoading = false;
	});

	beforeNavigate(() => {
		isLoading = true;
	});
</script>

<svelte:window
	bind:innerWidth={ui.innerWidth}
	bind:innerHeight={ui.innerHeight}
	onscroll={() => {
		const beforeScrollY = ui.scrollY;
		ui.scrollY = window.scrollY;
		if (window.scrollY === 0) ui.scrollDirection = 'initial';
		else ui.scrollDirection = ui.scrollY > beforeScrollY ? 'down' : 'up';
	}}
/>
{#if isLoading}
	<ProgressLinear />
{/if}

<div class="one-ui">
	{@render children()}
</div>

<Dialog />
<Toast />

<style>
	:global(:root) {
		--display-large: normal 400 57px/64px 'Roboto';
		--display-medium: normal 400 45px/52px 'Roboto';
		--display-small: normal 400 36px/44px 'Roboto';

		--headline-large: normal 400 32px/40px 'Roboto';
		--headline-medium: normal 400 28px/36px 'Roboto';
		--headline-small: normal 400 24px/32px 'Roboto';

		--title-large: normal 400 22px/28px 'Roboto';
		--title-medium: normal 500 16px/24px 'Roboto';
		--title-small: normal 500 14px/20px 'Roboto';

		--label-large: normal 500 14px/20px 'Roboto';
		--label-medium: normal 700 12px/16px 'Roboto';
		--label-small: normal 500 11px/16px 'Roboto';

		--body-large: normal 400 16px/24px 'Roboto';
		--body-medium: normal 400 14px/20px 'Roboto';
		--body-small: normal 400 12px/16px 'Roboto';
	}

	:global(*) {
		margin: 0px;
		padding: 0px;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Roboto';
		background: rgb(var(--background));
	}

	:global(a) {
		text-decoration: none;
		color: inherit;
		appearance: none;
	}

	:global(hr) {
		background: none;
		border: 1px solid var(--border);
	}

	:global(ul) {
		list-style: none;
	}

	.one-ui {
		display: grid;
		background: rgba(var(--background));
		color: rgb(var(--on));
	}

	@media screen and (orientation: landscape) {
		.one-ui {
			height: 100vh;
			grid-template-columns: 80px 1fr;
			grid-template-rows: auto auto 1fr;
			grid-template-areas:
				'navigate main'
				'fab main'
				'nav main';
		}
	}

	@media screen and (orientation: portrait) {
		.one-ui {
			min-height: 100vh;
			grid-template-columns: auto 1fr;
			grid-template-rows: auto auto 64px;
			grid-template-areas:
				'navigate header'
				'section section'
				'nav nav';
		}
	}
</style>
