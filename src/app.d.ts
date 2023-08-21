import type { PrismaClient } from '@prisma/client';
import type { Session } from 'lucia';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
			session: Session | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			name: string;
			email: string;
		};
		type DatabaseSessionAttributes = {
			user_picture: string;
		};
	}
	// eslint-disable-next-line no-var
	var prisma: PrismaClient;
}

export {};
