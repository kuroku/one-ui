<script module lang="ts">
	export interface IconButtonProps {
		icon: string;
		title?: string;
		class?: string;
		onclick?: (e: any) => void;
	}
</script>

<script lang="ts">
	let { icon, title, class: className, onclick }: IconButtonProps = $props();
</script>

<button
	type="button"
	class="btn-icon material-symbols-outlined {className}"
	data-title={title}
	{onclick}
>
	{icon}
</button>

<style>
	button {
		width: 40px;
		height: 40px;
		background: none;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		color: inherit;
		transition: 180ms ease;
		position: relative;
	}

	button:hover {
		background: rgba(0, 0, 0, 0.1);
	}

	@media not (hover: none) {
		button[data-title]::after {
			visibility: hidden;
			opacity: 0;
			font: var(--label-large);
			content: attr(data-title);
			position: absolute;
			top: 48px;
			right: var(--right, 0px);
			left: var(--left, none);
			background-color: #212121;
			color: white;
			padding: 12px 16px;
			border-radius: 4px;
			transition: 180ms ease;
			z-index: 5;
		}
		button[data-title]:hover::after {
			transition: 180ms ease;
			visibility: visible;
			opacity: 1;
		}
	}
</style>
