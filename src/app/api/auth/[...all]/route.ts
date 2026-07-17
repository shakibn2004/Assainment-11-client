import { auth } from "@/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

// We extract and cast the handlers to 'any' to bypass Next.js strict Route Handler type checking during the Vercel build.
export const GET = handlers.GET as any;
export const POST = handlers.POST as any;