<script module lang="ts">
	import type { Snippet } from 'svelte';
	export interface AsideProps {
		axis: 'left' | 'right';
		class?: string;
		children?: Snippet;
		onclose?: () => void;
	}
</script>

<script lang="ts">
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import Backdrop from './Backdrop.svelte';

	let { axis, class: className, children, onclose }: AsideProps = $props();
</script>

<dialog
	in:fly={{ duration: 180, easing: cubicOut, x: axis === 'left' ? -120 : 120 }}
	out:fly={{ duration: 180, easing: cubicIn, x: axis === 'left' ? -120 : 120 }}
	class="drawer {className}"
	open
	style="{axis}: 0px"
>
	{@render children?.()}
</dialog>
<Backdrop onclick={() => onclose?.()} />

<style>
	.drawer {
		max-width: 420px;
		height: 100%;
		width: calc(100% - 64px);
		background: #fff;
		top: 0px;
		position: fixed;
		left: inherit;
		z-index: 5;
		border: none;
	}
</style>
