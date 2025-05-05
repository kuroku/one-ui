<script module lang="ts">
	export interface UploadFileProps {
		name?: string;
		images: string[];
		rules?: Array<(value: string[]) => string | null>;
		error?: boolean;
		onRemove?: (base64: string) => void;
	}
</script>

<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import { slide } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import IconButton from './IconButton.svelte';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { useFormChild } from './Form.svelte';
	import { flip } from 'svelte/animate';

	let {
		name = uuidv4(),
		images = $bindable(),
		rules = [],
		error = $bindable(),
		onRemove
	}: UploadFileProps = $props();

	let files = $state<any>();

	const { form } = useFormChild();

	function onchange() {
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();
			reader.onloadend = () => {
				images = [...images, reader.result as string];
			};
			reader.readAsDataURL(file);
		}
	}
	function remove(key: number) {
		onRemove?.(images[key]);
		images = images.filter((_, imageKey) => imageKey !== key);
	}

	$effect(() => {
		error = rules.some((rule) => !!rule(images));
		if (form) form.errors[name] = rules.some((rule) => !!rule(images));
	});
</script>

<upload-file>
	<figure>
		<header>
			<h3>Imagenes</h3>
		</header>
		<label class="upload-file">
			<input
				type="file"
				accept="image/png, image/jpeg, image/jpg, image/webp"
				multiple
				bind:files
				{onchange}
			/>
			<Icon icon="image" />
			<strong>Haz click aqui para agregar tus imagenes</strong>
		</label>
		{#each images as src, key (src)}
			<li class="file" animate:flip={{ duration: 180, easing: cubicOut }}>
				<img {src} alt="one" />
				<IconButton icon="close" title="Eliminar imagen" onclick={() => remove(key)} />
			</li>
		{/each}
	</figure>
	<ul>
		{#each rules as rule}
			{@const error = rule(images)}
			{#if error && form?.submitted}
				<li
					in:slide={{ duration: 90, easing: cubicOut }}
					out:slide={{ duration: 90, easing: cubicIn }}
				>
					{error}
				</li>
			{/if}
		{/each}
	</ul>
</upload-file>

<style>
	upload-file {
		display: block;
	}
	.upload-file {
		outline: 1px dashed rgba(var(--primary));
		border-radius: 16px;
		display: grid;
		padding: 8px 8px 8px;
		align-content: center;
		justify-items: center;
		aspect-ratio: 3/4;
		/* background: #eee; */
	}
	header {
		grid-column: 1/-1;
		padding: 4px 8px;
	}
	h3 {
		font: var(--title-medium);
	}
	.upload-file :global(.icon) {
		font-size: 64px;
		color: rgb(98, 98, 98);
	}
	input {
		display: none;
	}
	strong {
		font-size: 12px;
		text-align: center;
		color: rgb(98, 98, 98);
	}
	figure {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 8px;
		outline: 1px solid rgba(var(--primary));
		border-radius: 8px;
		padding: 8px 8px 16px;
	}
	li.file {
		list-style: none;
		position: relative;
	}
	li.file :global(.btn-icon) {
		position: absolute;
		right: 2px;
		top: 2px;
		background: rgba(var(--surface));
	}
	img {
		width: 100%;
		object-fit: cover;
		border-radius: 16px;
		aspect-ratio: 3/4;
	}

	ul {
		display: grid;
		gap: 4px;
		list-style: none;
		padding: 8px 8px 0;
	}
	ul li {
		font-size: 12px;
		line-height: 16px;
		color: var(--error);
	}
</style>
