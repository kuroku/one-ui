<script lang="ts">
	let {
		labels,
		data,
		focus,
		symbol
	}: { labels: string[]; data: number[]; focus?: string; symbol?: string } = $props();
	let average = $derived(Math.max(...data));
	const box = {
		width: 360,
		height: 180
	};
	const text = {
		height: 24
	};
	function xChild(key: number) {
		return (box.width / labels.length) * key;
	}
	function rectWidth() {
		return box.width / labels.length - 8;
	}
	function rectHeight(key: number) {
		const height = (box.height * data[key]) / average;
		return data[key]
			? height > box.height * 0.5
				? height
				: box.height * 0.5 + height
			: box.height * 0.4;
	}
	function rectY(key: number) {
		return box.height - rectHeight(key);
	}
</script>

<svg width="100%" viewBox="0 0 {box.width} {box.height}">
	{#each labels as label, key (label)}
		<g class:focus={focus?.includes(label.toLocaleLowerCase())}>
			<text class="data" x={xChild(key)} y={rectY(key) + 19} dx={rectWidth() / 2}
				>{symbol}{data[key] || 0}</text
			>
			<rect
				rx="4"
				width={rectWidth()}
				height={rectHeight(key) - text.height * 2}
				x={xChild(key)}
				y={rectY(key) + text.height}
			/>
			<text class="label" x={xChild(key)} y={box.height} dx={rectWidth() / 2}>{label}</text>
		</g>
	{/each}
</svg>

<style>
	rect {
		fill: #ededed;
	}
	.label {
		font-size: 12px;
		font-weight: 500;
		text-anchor: middle;
	}
	.data {
		font-size: 14px;
		font-weight: 500;
		text-anchor: middle;
	}
</style>
