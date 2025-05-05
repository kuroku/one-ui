<script module lang="ts">
	type ToastButton = Pick<ButtonProps, 'icon' | 'onclick'> & { text: string };
	class Toast {
		private timeout: NodeJS.Timeout | null = null;
		public title = $state<string | null>();
		public button = $state<ToastButton | null>();
		add(title: string, button?: ToastButton) {
			this.title = title;
			this.button = button ? { ...button } : null;
			this.ontimeExp();
		}
		ontimeExp() {
			this.timeout = setTimeout(() => {
				clearTimeout(this.timeout!);
				this.onclose();
			}, 3000);
		}
		onclose() {
			this.title = null;
			this.button = null;
		}
	}
	export const toast = new Toast();
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';

	import Button, { type ButtonProps } from './Button.svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
</script>

{#if toast.title}
	<dialog
		class="toast"
		open
		in:fly={{ duration: 180, easing: cubicOut, y: 16 }}
		out:fly={{ duration: 180, easing: cubicIn, y: 16 }}
	>
		<p>{toast.title}</p>
		{#if toast.button}
			{@const { icon, onclick, text } = toast.button}
			<Button
				{icon}
				onclick={(e) => {
					onclick?.(e);
					toast.onclose();
				}}>{text}</Button
			>
		{/if}
	</dialog>
{/if}

<style>
	.toast {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		width: calc(100% - 32px);
		max-width: 640px;
		background: #212121;
		color: white;
		position: fixed;
		left: 0px;
		right: 0px;
		margin: auto;
		z-index: 12;
		padding: 8px;
		border-radius: 12px;
		border: none;
	}
	p {
		font: var(--body-large);
		padding: 8px;
	}
	.toast :global(.btn) {
		background: white;
		color: black;
		border-radius: 12px;
	}

	@media screen and (orientation: landscape) {
		.toast {
			bottom: 16px;
		}
	}

	@media screen and (orientation: portrait) {
		.toast {
			bottom: calc(16px + 64px);
		}
	}
</style>
