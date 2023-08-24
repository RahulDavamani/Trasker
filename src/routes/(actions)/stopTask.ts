import { fail } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

export const stopTaskSchema = z.object({
	taskId: z.string().nonempty(),
	end: z.string().nonempty()
});
export type StopTask = z.infer<typeof stopTaskSchema>;

export const stopTask = async (event: RequestEvent) => {
	const form = await superValidate(event, stopTaskSchema);
	const {
		valid,
		data: { taskId, end }
	} = form;
	if (!valid) return fail(400);

	const { id } = await prisma.taskDuration.findFirstOrThrow({
		where: { taskId: taskId },
		orderBy: { end: 'desc' },
		select: { id: true }
	});
	await prisma.taskDuration.update({
		where: { id },
		data: {
			taskId,
			end
		}
	});
	return { form };
};
