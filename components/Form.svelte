<script module lang="ts">
	export interface FormProps {
		children: Snippet;
		onsubmit: () => void;
		onfailed?: () => void;
		form: FormInstance;
	}
	export class FormInstance {
		public errors = $state<Record<string, boolean>>({});
		public submitted = $state(false);
		public submitting = $state(false);
		public canSubmit() {
			return Object.values(this.errors).every((err) => !err);
		}
	}
	export function useFormChild() {
		const form = getContext('form') as FormInstance;
		return { form };
	}
</script>

<script lang="ts">
	import { getContext, setContext, type Snippet } from 'svelte';
	let { children, onsubmit, onfailed, form }: FormProps = $props();
	setContext('form', form);
</script>

<form
	onsubmit={async (e) => {
		e.preventDefault();
		if (form.canSubmit()) {
			form.submitting = true;
			await onsubmit();
			form.submitting = false;
		} else {
			onfailed?.();
		}
		form.submitted = true;
	}}
>
	{@render children()}
</form>

<style>
	form {
		display: contents;
	}
</style>
