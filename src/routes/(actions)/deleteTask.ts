import { fail } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';

export const deleteTask = async ({ url }: RequestEvent) => {
	const id = url.searchParams.get('id');
	if (!id) return fail(404);

	await prisma.task.delete({ where: { id } });
};
