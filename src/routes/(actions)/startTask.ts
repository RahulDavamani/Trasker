import { fail } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export const startTaskSchema = z.object({
	taskId: z.string().nonempty(),
	start: z.string().nonempty()
});
export type StartTask = z.infer<typeof startTaskSchema>;

export const startTask = async (event: RequestEvent) => {
	const form = await superValidate(event, startTaskSchema);
	const {
		valid,
		data: { taskId, start }
	} = form;
	if (!valid) return fail(400);

	await prisma.taskDuration.create({
		data: {
			taskId,
			start,
			end: start
		}
	});
	return { form };
};
