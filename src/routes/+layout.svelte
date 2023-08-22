<script>
	import '../app.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../theme.css';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import Navbar from '$lib/components/Navbar.svelte';

	export let data;

	// Skeleton Popup
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

{#if data.session}
	<Navbar session={data.session} />
{:else}
	<div class="absolute top-5 right-5">
		<LightSwitch />
	</div>
{/if}

<slot />
