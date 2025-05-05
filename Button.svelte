<script module lang="ts">
	import type { Snippet } from 'svelte';

	export interface ButtonProps {
		variant?: 'fill' | 'outline';
		icon?: string;
		type?: 'button' | 'submit' | 'reset' | null | undefined;
		children: Snippet;
		onclick?: (e: any) => void;
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import Icon from './Icon.svelte';
	import { useFormChild } from './Form.svelte';
	let { variant = 'fill', icon, type, children, onclick, disabled }: ButtonProps = $props();
	const { form } = useFormChild();
	let loading = $state(false);
</script>

<button
	{type}
	class="btn {variant}"
	class:icon
	class:loading
	onclick={async (e) => {
		loading = true;
		await onclick?.(e);
		loading = false;
	}}
	disabled={disabled || loading || (type === 'submit' && form?.submitting)}
>
	{#if icon}
		<Icon {icon} />
	{/if}
	{@render children()}
	{#if loading || (type === 'submit' && form?.submitting)}
		<Icon icon="progress_activity" rotate />
	{/if}
</button>

<style>
	button {
		font: var(--label-large);
		padding: 10px 24px;
		border-radius: 22px;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		cursor: pointer;
	}
	button.fill {
		background: rgb(var(--primary));
		color: rgb(var(--on-primary));
	}

	button.outline {
		background: none;
		outline: 1px solid rgb(var(--primary));
		color: rgb(var(--primary));
	}
	button.icon {
		padding: 10px 24px 10px 16px;
	}
	button.loading {
		padding: 10px 16px 10px 24px;
	}
	button.icon.loading {
		padding: 10px 16px 10px 16px;
	}
	button :global(.icon) {
		font-size: 18px;
	}
	button[disabled] {
		opacity: 0.64;
	}
	button[disabled].outline {
		background: #dadada;
	}
</style>
