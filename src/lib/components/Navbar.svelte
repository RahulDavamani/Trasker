<script lang="ts">
	import { LightSwitch, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import type { Session } from 'lucia';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	export let session: Session;
	$: ({
		user_picture,
		user: { name, email }
	} = session);

	const popupFeatured: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'bottom'
	};

	$: urlPath = $page.url.pathname;
</script>

<div class="w-full py-4 px-6 flex justify-between items-center">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<img
		src="/logo/png/logo-no-background.png"
		alt="logo"
		width="15%"
		class="cursor-pointer"
		on:click={() => goto('/')}
	/>
	<div class="flex gap-10 items-center text-primary-500 dark:text-primary-100">
		<a href="/calendar" class="font-semibold {urlPath.startsWith('/calendar') && 'underline underline-offset-2'}">
			Calendar
		</a>
		<a href="/projects" class="font-semibold {urlPath.startsWith('/projects') && 'underline underline-offset-2'}">
			My Projects
		</a>
		<button class="btn-icon variant-filled overflow-hidden" use:popup={popupFeatured}>
			<img src={user_picture} alt="logo" />
		</button>
	</div>
</div>

<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
	<div class="float-right">
		<LightSwitch />
	</div>
	<div class="font-bold">{name}</div>
	<div>{email}</div>

	<form action="?/logout" method="post">
		<button type="submit" class="btn variant-filled w-full font-semibold mt-5 gap-2">
			<Icon icon="material-symbols:logout" width="20" height="20" /> Sign Out
		</button>
	</form>
</div>
