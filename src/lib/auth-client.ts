import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL // Use NEXT_PUBLIC_ for client-side access
});

// Extract the methods directly from the configured 'authClient' we just created above
export const { signIn, signUp, useSession } = authClient;