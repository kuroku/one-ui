<script module lang="ts">
	import type { Snippet } from 'svelte';

	export interface WrapperProps {
		hgroup?: Snippet;
		menu?: Snippet;
		children?: Snippet;
	}
</script>

<script lang="ts">
	let { hgroup, menu, children }: WrapperProps = $props();
</script>

<main>
	<header>
		<hgroup>
			{@render hgroup?.()}
		</hgroup>
		<menu>
			{@render menu?.()}
		</menu>
	</header>
	<section class="container">
		{@render children?.()}
	</section>
</main>

<style>
	main {
		display: grid;
		background: rgba(var(--background));
	}
	main :global(.fixed) {
		background: rgba(var(--surface));
	}
	header {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		grid-area: header;
		position: sticky;
		top: 0px;
		z-index: 3;
	}
	menu {
		display: flex;
		gap: 4px;
	}
	@media screen and (orientation: landscape) {
		main {
			grid-area: main;
			width: 100%;
			height: 100vh;
			display: grid;
			grid-template-columns: 1fr 420px;
			grid-template-rows: auto 1fr;
			grid-template-areas: 'flex header' 'flex fixed';
			padding: 8px;
			column-gap: 8px;
			overflow: hidden;
		}
		section {
			display: contents;
		}
		header {
			background: rgba(var(--surface));
			border-radius: 16px 16px 0px 0px;
			border-bottom: 1px solid var(--border);
			padding: 16px 8px 16px 16px;
		}
		main :global(.flex) {
			grid-area: flex;
			border-radius: 16px;
		}
		main :global(.fixed) {
			grid-area: fixed;
			overflow: auto;
			border-radius: 0px 0px 16px 16px;
		}
	}
	@media screen and (orientation: portrait) {
		main {
			display: contents;
		}
		section {
			min-height: 100vh;
			grid-area: section;
			display: grid;
			grid-template-rows: auto auto;
			align-content: flex-start;
		}
		header {
			background: rgba(var(--background), 0.98);
			height: 64px;
			padding: 0 8px 0 16px;
		}
	}
</style>
