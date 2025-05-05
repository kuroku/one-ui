<script lang="ts">
	let {
		value,
		max,
		label,
		fixed = 1
	}: { value: number; max: number; label: string; fixed?: number } = $props();
</script>

<label class="progress">
	<p>{label} <strong>{value.toFixed(fixed)}</strong></p>
	<progress {value} {max}>70%</progress>
</label>

<style>
	label {
		font: var(--label-large);
	}
	p {
		display: grid;
		grid-template-columns: 1fr auto;
	}
	progress[value] {
		width: 100%;
		height: 12px;
		border: none;
		-webkit-appearance: none;
		appearance: none;
	}
	progress[value]::-webkit-progress-bar {
		background: rgb(var(--background));
		border-radius: 16px;
	}

	progress[value]::-webkit-progress-value {
		background: var(--orange);
		border-radius: 16px;
	}
</style>
