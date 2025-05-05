<script module lang="ts">
	import type { Snippet } from 'svelte';

	export interface MainProps {
		class?: string;
		children: Snippet;
		hgroup?: Snippet;
		menu?: Snippet;
	}
</script>

<script lang="ts">
	let { class: className, children, hgroup, menu }: MainProps = $props();
</script>

<main class={className}>
	<header>
		<hgroup>
			{@render hgroup?.()}
		</hgroup>
		<menu>
			{@render menu?.()}
		</menu>
	</header>
	<section>
		{@render children()}
	</section>
</main>

<style>
	main {
		background: inherit;
	}
	header {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		grid-area: header;
		height: 64px;
		padding: 0 8px 0 16px;
		background: rgba(var(--background), 0.98);
		position: sticky;
		top: 0px;
		z-index: 3;
	}
	menu {
		display: flex;
		gap: 4px;
	}
	section {
		grid-area: section;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(var(--grid-column-min, 174px), 1fr));
		gap: 8px;
		padding: 0 8px 8px;
		align-content: flex-start;
		background: inherit;
	}
	@media screen and (orientation: landscape) {
		main {
			display: grid;
			grid-template-rows: auto 1fr;
			height: 100vh;
			width: 100%;
			grid-area: main;
			overflow: auto;
			scrollbar-color: #747474 #eee;
			align-items: flex-start;
			grid-template-areas: 'header' 'section';
		}
	}
	@media screen and (orientation: portrait) {
		main {
			display: contents;
		}
		section {
			min-height: 100vh;
		}
	}
</style>
