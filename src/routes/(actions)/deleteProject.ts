import { fail } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';

export const deleteProject = async ({ url }: RequestEvent) => {
	const id = url.searchParams.get('id');
	if (!id) return fail(404);

	await prisma.project.delete({ where: { id } });
};
