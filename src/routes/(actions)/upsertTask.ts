import { fail, redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export const upsertTaskSchema = z.object({
	id: z.string().nonempty().optional(),
	projectId: z.string().nonempty(),
	name: z.string().nonempty(),
	status: z.literal('ACTIVE').or(z.literal('PENDING'))
});
export type UpsertTask = z.infer<typeof upsertTaskSchema>;

export const upsertTask = async (event: RequestEvent) => {
	const session = event.locals.session;
	if (!session) throw redirect(302, '/login');

	const form = await superValidate(event, upsertTaskSchema);
	const {
		valid,
		data: { id = '', name, status }
	} = form;
	if (!valid) return fail(400, { form });

	await prisma.task.upsert({
		where: { id },
		create: {
			projectId: session.user_id,
			name,
			status
		},
		update: {
			name,
			status
		}
	});
	return { form };
};
