<script module lang="ts">
	export interface IconProps {
		icon: string;
		class?: string;
		rotate?: boolean;
	}
</script>

<script lang="ts">
	let { icon, class: className, rotate }: IconProps = $props();
</script>

<span class="icon material-symbols-outlined {className}" class:rotate>
	{icon}
</span>

<style>
	.rotate {
		animation: rotate 1s linear infinite;
	}
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
