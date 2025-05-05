<script module lang="ts">
	export interface TextareaProps {
		name?: string;
		label?: string;
		value?: string;
		rules?: Array<(value: string) => string | null>;
		error?: boolean;
	}
</script>

<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { useFormChild } from './Form.svelte';
	let {
		name = uuidv4(),
		label = 'Label',
		value = $bindable(),
		rules = [],
		error = $bindable()
	}: TextareaProps = $props();
	let focus = $state(false);
	const { form } = useFormChild();
	$effect(() => {
		error = rules.some((rule) => !!rule(value as string));
		if (form) form.errors[name] = rules.some((rule) => !!rule(value as string));
	});
</script>

<text-area>
	<label class="field-textarea" class:error={error && (form?.submitted || focus)}>
		<strong>{label}</strong>
		<textarea
			rows="10"
			bind:value
			onfocusin={() => (focus = true)}
			onfocusout={() => (focus = false)}
		></textarea>
	</label>
	<ul>
		{#each rules as rule}
			{@const error = rule(value as string)}
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
</text-area>

<style>
	text-area {
		display: block;
	}
	label {
		display: block;
		width: 100%;
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr;
		border-radius: 8px;
		outline: 1px solid rgba(var(--primary));
	}
	label.error {
		outline: 1px solid var(--error);
	}
	strong {
		font: var(--label-large);
		padding: 16px 16px 8px;
		transition: 90ms ease-in;
	}
	strong {
		font-size: 12px;
		line-height: 16px;
		top: 10px;
		transition: 90ms ease-out;
	}
	textarea {
		font: var(--body-medium);
		width: 100%;
		background: none;
		padding: 4px 16px;
		border: none;
		overflow: auto;
		resize: none;
		outline: none;
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
		color: var(--error);
	}
</style>
