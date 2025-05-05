<script module lang="ts">
	export interface FabProps {
		hidden?: boolean;
		class?: string;
		icon: string;
		onclick?: () => void;
	}
</script>

<script lang="ts">
	import { ui } from './Oneui.svelte';

	let { class: className, icon, onclick }: FabProps = $props();
</script>

<button
	class="fab material-symbols-outlined {className}"
	class:hidden-only-mobile={ui.scrollDirection === 'down'}
	{onclick}
>
	{icon}
</button>

<style>
	button {
		background: #ff68ae;
		border: none;
		border-radius: 16px;
	}
	@media screen and (orientation: landscape) {
		button {
			width: 56px;
			height: 56px;
			grid-area: fab;
			justify-self: center;
			align-self: center;
			margin: 8px 0px 16px;
			opacity: 1;
			transition:
				90ms ease-in,
				opacity 180ms ease-in;
		}
	}

	@media screen and (orientation: portrait) {
		button {
			width: 64px;
			height: 64px;
			position: fixed;
			bottom: calc(64px + 16px);
			right: 16px;
			opacity: 1;
			z-index: 2;
			transition: 90ms ease-out;
		}
		.hidden-only-mobile {
			transform: scale(0);
			transition: 90ms ease-in;
		}
	}
</style>
