<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	let { onclick }: { onclick: () => void } = $props();
</script>

<dialog
	in:fade={{ duration: 180, easing: cubicOut }}
	out:fade={{ duration: 180, easing: cubicIn }}
	class="backdrop"
	open
	{onclick}
></dialog>

<style>
	.backdrop {
		width: 100%;
		height: 100%;
		background: rgb(238, 238, 238, 0.25);
		backdrop-filter: blur(10px);
		border: none;
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 4;
	}

	@media screen and (orientation: portrait) {
		:global(body:has(.backdrop[open])) {
			overflow: hidden;
		}
	}
</style>
