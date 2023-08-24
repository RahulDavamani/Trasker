import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '../$types';
import { auth } from '$lib/server/lucia';

export const logout = async ({ locals }: RequestEvent) => {
	if (locals.session) await auth.invalidateSession(locals.session.sessionId);
	locals.auth.setSession(null);
	throw redirect(302, '/login');
};
