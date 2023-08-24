import { superValidate } from 'sveltekit-superforms/server';
import { logout } from './(actions)/logout';
import { upsertProjectSchema, upsertProject } from './(actions)/upsertProject';
import { deleteProject } from './(actions)/deleteProject';
import { upsertTask, upsertTaskSchema } from './(actions)/upsertTask';
import { deleteTask } from './(actions)/deleteTask';
import { startTask, startTaskSchema } from './(actions)/startTask';
import { stopTask, stopTaskSchema } from './(actions)/stopTask';
import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const session = event.locals.session;
	if (!session) throw redirect(302, '/login');

	const form = {
		upsertProject: await superValidate(event, upsertProjectSchema),
		upsertTask: await superValidate(event, upsertTaskSchema),
		startTaskForm: await superValidate(event, startTaskSchema),
		stopTaskForm: await superValidate(event, stopTaskSchema)
	};

	const projects = await prisma.project.findMany({
		where: { userId: session.user_id, status: 'ACTIVE' },
		include: {
			tasks: {
				where: {
					OR: [{ status: 'ACTIVE' }, { status: 'PENDING' }]
				},
				include: { taskDurations: true }
			}
		}
	});
	const projectWithDuration = projects.map((p) => {
		const tasks = p.tasks.map((t) => {
			const totalDuration = t.taskDurations.reduce((acc, cur) => {
				const start = new Date(cur.start).getTime();
				const end = new Date(cur.end).getTime();
				const duration = (end - start) / 1000;
				return acc + duration;
			}, 0);
			return { ...t, totalDuration };
		});
		const totalDuration = tasks.reduce((acc, cur) => acc + cur.totalDuration, 0);
		return { ...p, tasks, totalDuration };
	});

	return {
		form,
		projects: projectWithDuration
	};
};

export const actions = {
	logout,
	upsertProject,
	deleteProject,
	upsertTask,
	deleteTask,
	startTask,
	stopTask
};
