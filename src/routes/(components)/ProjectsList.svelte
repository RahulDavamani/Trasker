<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from '../$types';
	import { Accordion, AccordionItem, TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import TaskItem from './TaskItem.svelte';
	import Icon from '@iconify/svelte';

	$: data = $page.data as PageData;
</script>

<TreeView>
	{#each data.projects as project}
		<div class="bg-[#{project.color}] w-full m-5 rounded-lg shadow">
			<TreeViewItem open>
				<svelte:fragment slot="lead">
					<div class="flex">
						<span class="font-semibold text-lg">{project.name}</span>
						<span class="badge variant-filled-primary capitalize ml-4">{project.status.toLowerCase()}</span>
					</div>
				</svelte:fragment>

				<div class="btn">
					<Icon icon="material-symbols:edit" width="20" height="20" />
				</div>

				<svelte:fragment slot="children">
					{#each project.tasks as task}
						<TaskItem {task} />
					{/each}
				</svelte:fragment>
			</TreeViewItem>
		</div>
	{/each}
</TreeView>
