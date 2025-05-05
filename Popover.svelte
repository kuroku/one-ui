<script module lang="ts">
	import type { Snippet } from 'svelte';
	export interface PopoverProps {
		class?: string;
		children?: Snippet;
		onclose?: () => void;
	}
</script>

<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Backdrop from './Backdrop.svelte';

	let { class: className, children, onclose }: PopoverProps = $props();
</script>

<dialog
	in:scale={{ duration: 180, easing: cubicOut, start: 0.95 }}
	out:scale={{ duration: 180, easing: cubicIn, start: 0.95 }}
	class="popover {className}"
	open
>
	{@render children?.()}
</dialog>
<Backdrop onclick={() => onclose?.()} />

<style>
	.popover {
		max-width: calc(100% - 32px);
		background: inherit;
		top: 56px;
		position: absolute;
		left: inherit;
		right: 8px;
		z-index: 11;
		border: none;
		background: white;
	}
</style>
