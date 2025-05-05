<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		label = 'Label',
		value = $bindable(),
		children
	}: { label?: string; value?: any; children: Snippet } = $props();
	let focus = $state(false);
	let active = $derived(focus || !!value);
</script>

<label class="field-select" class:active>
	<strong>{label}</strong>
	<select bind:value onfocusin={() => (focus = true)} onfocusout={() => (focus = false)}>
		{@render children()}
	</select>
</label>

<style>
	.field-select {
		display: block;
		width: 100%;
		position: relative;
	}
	strong {
		font: var(--body-large);
		font-weight: 600;
		position: absolute;
		top: 16px;
		left: 16px;
		transition: 90ms ease-in;
	}
	.active strong {
		font: var(--label-small);
		top: 10px;
		transition: 90ms ease-out;
	}
	select {
		font: var(--body-medium);
		appearance: none;
		width: 100%;
		height: 56px;
		border-radius: 8px;
		background: none;
		padding: 24px 16px 12px;
		border: none;
		outline: 1px solid rgba(var(--primary));
	}

	@media not (hover: none) {
		select {
			padding: 24px 16px 10px;
		}
		select,
		::picker(select) {
			appearance: base-select;
			border-radius: 8px;
		}
		select :global(option) {
			font-family: 'Roboto';
			display: flex;
			justify-content: flex-start;
			gap: 8px;
			background: rgba(var(--surface));
			padding: 16px;
		}
		select :global(option:checked) {
			background: rgba(var(--background));
			color: rgba(var(--on));
		}
		select :global(option:hover) {
			background: #cccccc;
			color: rgba(var(--on));
		}
		select::-ms-expand {
			display: none;
		}
	}
</style>
