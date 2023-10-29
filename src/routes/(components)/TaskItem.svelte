<script lang="ts">
	import type { PageData } from '../$types';

	export let task: PageData['projects'][number]['tasks'][number];
</script>

<div class="w-full flex space-x-4">
	<div>
		{task.name}
	</div>
	<div class="badge variant-filled-primary capitalize ml-4">{task.status.toLowerCase()}</div>
</div>
