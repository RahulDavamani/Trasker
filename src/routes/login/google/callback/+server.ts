import { auth, googleAuth } from '$lib/server/lucia.js';
import { OAuthRequestError } from '@lucia-auth/oauth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, cookies, locals }) => {
	const storedState = cookies.get('google_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	// Validate State
	if (!storedState || !state || storedState !== state || !code) return new Response(null, { status: 400 });

	try {
		// Get User
		const { existingUser, googleUser, createUser } = await googleAuth.validateCallback(code);

		const newUser = async () =>
			await createUser({
				attributes: {
					name: googleUser.name,
					email: googleUser.email ?? ''
				}
			});

		const { userId } = existingUser ?? (await newUser());

		// Create Session
		const session = await auth.createSession({
			userId,
			attributes: {
				user_picture: googleUser.picture
			}
		});
		locals.auth.setSession(session);

		return new Response(null, {
			status: 302,
			headers: { Location: '/' }
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuthRequestError) return new Response(null, { status: 400 });
		return new Response(null, { status: 500 });
	}
};
