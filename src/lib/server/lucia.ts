import { lucia } from 'lucia';
import { google } from '@lucia-auth/oauth/providers';
import { sveltekit } from 'lucia/middleware';
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from './prisma';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => data,
	getSessionAttributes: (data) => data
});

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env;
export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: `${env.BASE_URL}/login/google/callback`,
	scope: ['email', 'profile']
});

export type Auth = typeof auth;
