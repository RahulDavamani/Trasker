<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="flex justify-center items-center h-screen">
	<div class="card py-8 px-10 max-w-md w-full shadow">
		<img src="/logo/png/logo-no-background.png" alt="logo" />
		<a href="/login/google" class="btn bg-secondary-100 text-primary-500 shadow-sm w-full mt-8">
			<Icon icon="flat-color-icons:google" width="25" height="25" />
			<span class="font-semibold">Sign in with Google</span>
		</a>
	</div>
	<div class="absolute bottom-5 right-5 text-sm italic">
		Created By <span class="font-semibold">Rahul Davamani</span>
	</div>
</div>
