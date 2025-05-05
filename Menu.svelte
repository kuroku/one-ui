<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, open = $bindable() }: { open: boolean; children: Snippet } = $props();
</script>

{#if open}
	<dialog class="menu" onclick={() => (open = false)}>
		{@render children()}
	</dialog>
	<dialog open class="backdrop" onclick={() => (open = false)}></dialog>
{/if}

<style>
	.menu {
		width: fit-content;
		display: grid;
		position: absolute;
		left: inherit;
		right: 0px;
		top: 0px;
		list-style: none;
		background: #ffffff;
		border-radius: 8px;
		z-index: 5;
		border: none;
		padding: 4px;
		box-shadow:
			0px 1px 2px rgba(0, 0, 0, 0.3),
			0px 1px 3px 1px rgba(0, 0, 0, 0.15);
	}
	.menu :global(button) {
		padding: 10px 16px;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 8px;
		font-size: 16px;
		line-height: 24px;
		font-weight: 600;
		background: none;
		border: none;
		border-radius: 8px;
		font-family: 'Roboto';
	}
	.menu :global(button:hover) {
		background: rgba(0, 0, 0, 0.25);
	}
	.backdrop {
		width: 100%;
		height: 100%;
		content: '';
		background: transparent;
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 4;
		border: none;
	}
</style>
