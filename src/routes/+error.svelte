<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="card py-6 px-2 max-w-sm mx-auto text-center mt-40">
	<div class="text-4xl font-bold font-mono">{$page.status}</div>
	<div class="text-2xl">{$page.error?.message}</div>
	<a href="/" class="btn variant-filled mt-5 w-40">Go Home</a>
</div>
