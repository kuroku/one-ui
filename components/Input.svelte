<script module lang="ts">
	export interface InputProps {
		name?: string;
		type?: HTMLInputTypeAttribute | null | undefined;
		label?: string;
		value?: any;
		error?: boolean;
		rules?: Array<(value: string) => string | null>;
		step?: string | number | null | undefined;
		list?: string | null | undefined;
	}
</script>

<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import { slide } from 'svelte/transition';
	import { useFormChild } from './Form.svelte';
	let {
		name = uuidv4(),
		type,
		label = 'Label',
		value = $bindable(),
		error = $bindable(),
		rules = [],
		step,
		list
	}: InputProps = $props();
	let focus = $state(false);
	let active = $derived(focus || !!value);
	const { form } = useFormChild();
	$effect(() => {
		error = rules.some((rule) => !!rule(value));
		if (form) form.errors[name] = rules.some((rule) => !!rule(value));
	});
</script>

<label class="field-input" class:active class:error={error && (form?.submitted || focus)}>
	<strong>{label}</strong>
	<input
		{type}
		bind:value
		onfocusin={() => (focus = true)}
		onfocusout={() => (focus = false)}
		{step}
		{list}
	/>
	<ul>
		{#each rules as rule}
			{@const error = rule(value)}
			{#if error && (value || focus || form?.submitted)}
				<li
					in:slide={{ duration: 90, easing: cubicOut }}
					out:slide={{ duration: 90, easing: cubicIn }}
				>
					{error}
				</li>
			{/if}
		{/each}
	</ul>
</label>

<style>
	label {
		display: block;
		width: 100%;
		position: relative;
	}
	strong {
		font-size: 16px;
		line-height: 24px;
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
	input {
		font: var(--body-medium);
		appearance: none;
		width: 100%;
		height: 56px;
		border-radius: 8px;
		background: none;
		padding: 28px 14px 16px;
		border: none;
		outline: 1px solid rgba(var(--primary));
	}
	.error input {
		outline: 1px solid red;
	}
	ul {
		display: grid;
		gap: 4px;
		list-style: none;
		padding: 8px 8px 0;
	}
	li {
		font-size: 12px;
		line-height: 16px;
		color: rgb(246, 46, 46);
	}
</style>
