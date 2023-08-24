import { fail, redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export const upsertProjectSchema = z.object({
	id: z.string().nonempty().optional(),
	name: z.string().nonempty(),
	status: z.literal('ACTIVE').or(z.literal('PENDING')),
	color: z.string().nonempty()
});
export type UpsertProject = z.infer<typeof upsertProjectSchema>;

export const upsertProject = async (event: RequestEvent) => {
	const session = event.locals.session;
	if (!session) throw redirect(302, '/login');

	const form = await superValidate(event, upsertProjectSchema);
	const {
		valid,
		data: { id = '', name, status, color }
	} = form;
	if (!valid) return fail(400, { form });

	await prisma.project.upsert({
		where: { id },
		create: {
			userId: session.user_id,
			name,
			status,
			color
		},
		update: {
			name,
			status,
			color
		}
	});
	return { form };
};
