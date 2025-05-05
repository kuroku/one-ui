<script module lang="ts">
	export class Dialog {
		public open = $state(false);
		public title = $state<string>();
		public description = $state<string>();
		public type = $state<'confirm' | 'info' | null>();
		public onOk = $state<() => Promise<void> | null>();

		confirm(title: string, description: string, onOk: () => Promise<void>) {
			this.type = 'confirm';
			this.title = title;
			this.description = description;
			this.open = true;
			this.onOk = onOk;
		}

		info(title: string, description: string) {
			this.type = 'info';
			this.title = title;
			this.description = description;
			this.open = true;
		}
	}
	export const dialog = new Dialog();
</script>

<script lang="ts">
	import { scale } from 'svelte/transition';

	import Button from './Button.svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import Backdrop from './Backdrop.svelte';
</script>

{#if dialog.open}
	<dialog
		class="modal"
		open
		in:scale={{ duration: 180, easing: cubicOut, start: 0.8 }}
		out:scale={{ duration: 180, easing: cubicIn, start: 0.8 }}
	>
		<hgroup>
			<h6>{dialog.title}</h6>
			<p>{dialog.description}</p>
		</hgroup>
		<menu>
			{#if dialog.type === 'confirm'}
				<Button variant="outline" onclick={() => (dialog.open = false)}>Cancelar</Button>
				<Button
					onclick={() => {
						dialog.onOk?.();
						dialog.open = false;
					}}>Aceptar</Button
				>
			{/if}
			{#if dialog.type === 'info'}
				<Button
					onclick={() => {
						dialog.open = false;
					}}>Entiendo</Button
				>
			{/if}
		</menu>
	</dialog>
	<Backdrop onclick={() => (dialog.open = false)} />
{/if}

<style>
	.modal {
		width: calc(100% - 48px);
		max-width: 480px;
		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		margin: auto;
		z-index: 11;
		background: white;
		border: none;
		border-radius: 8px;
		box-shadow:
			0px 1px 2px rgba(0, 0, 0, 0.3),
			0px 2px 6px 2px rgba(0, 0, 0, 0.15);
	}

	hgroup {
		display: grid;
		gap: 8px;
		padding: 24px;
	}
	h6 {
		font: var(--title-medium);
	}
	p {
		font: var(--body-medium);
	}
	menu {
		display: flex;
		padding: 0px 16px 16px;
		justify-content: flex-end;
		gap: 8px;
	}
</style>
