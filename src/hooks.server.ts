import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

const urls = {
	publicURLs: [] as string[], // Session & No Session
	sessionRestricted: ['/login', '/login/google', '/login/google/callback'] // No Session
};

export const handle: Handle = async ({ event, resolve }) => {
	const authRequest = auth.handleRequest(event);
	const session = await authRequest.validate();
	event.locals = { auth: authRequest, session };

	const path = event.url.pathname;

	// Session Restricted
	if (urls.sessionRestricted.includes(path))
		if (session) throw redirect(302, '/');
		else return await resolve(event);

	// Protected
	if (!urls.publicURLs.includes(path))
		if (session) return await resolve(event);
		else throw redirect(302, '/login');

	//Public
	return await resolve(event);
};
