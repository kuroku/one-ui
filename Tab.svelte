<script lang="ts">
	let { tabs, tab = $bindable() }: { tabs: string[]; tab: string } = $props();
</script>

<nav class="tab">
	{#each tabs as value}
		{@const active = tab === value}
		<button class:active onclick={() => (tab = value)}>{value}</button>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		gap: 8px;
		padding: 4px 8px;
	}

	button {
		font-size: 14px;
		line-height: 20px;
		font-weight: 500;
		border: none;
		width: 100%;
		border-radius: 30px;
		padding: 14px 16px;
		background: none;
	}

	button:hover {
		background: rgba(0, 0, 0, 0.15);
	}

	button.active {
		background: rgb(var(--light-primary));
		color: rgb(var(--light-on-primary));
	}
</style>
