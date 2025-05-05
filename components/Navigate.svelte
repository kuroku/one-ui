<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import type { FadeParams, SlideParams } from 'svelte/transition';
	import { slide } from 'svelte/transition';
	import { ui } from './Oneui.svelte';

	function fadeSlide(node: Element, params?: FadeParams | SlideParams | undefined) {
		if (ui.orientation() === 'landscape') {
			return slide(node, params);
		}
		return slide(node, {
			...params,
			axis: 'x'
		});
	}
</script>

<nav class="navigate">
	<slot />
</nav>

<style>
	nav {
		height: 64px;
		display: flex;
		align-items: center;
		background: rgba(var(--background), 0.98);
	}
	@media screen and (orientation: landscape) {
		nav {
			justify-content: center;
		}
	}

	@media screen and (orientation: portrait) {
		nav {
			height: 64px;
			padding-left: 8px;
			padding-right: 0px;
			position: sticky;
			top: 0px;
			z-index: 3;
		}
	}
</style>
