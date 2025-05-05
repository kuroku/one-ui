<script lang="ts">
	import type { Snippet } from 'svelte';
	import Backdrop from './Backdrop.svelte';
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	let {
		class: className,
		children,
		onclose
	}: { class?: string; children: Snippet; onclose: () => void } = $props();
</script>

<dialog
	class="modal {className}"
	open
	in:fly={{ duration: 180, easing: cubicOut, y: 100 }}
	out:fly={{ duration: 180, easing: cubicIn, y: 100 }}
>
	{@render children()}
</dialog>
<Backdrop onclick={onclose} />

<style>
	.modal {
		width: calc(100% - 32px);
		background: rgba(var(--surface));
		z-index: 5;
		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: auto;
		border-radius: 16px;
		border: none;
	}
	@media screen and (orientation: landscape) {
		.modal {
			max-width: 640px;
		}
	}

	@media screen and (orientation: portrait) {
		.modal {
			max-width: 640px;
		}
	}
</style>
