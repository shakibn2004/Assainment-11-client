"use server";

import { cookies } from "next/headers";

export const getAuthToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("better-auth.session_token")?.value || cookieStore.get("__Secure-better-auth.session_token")?.value;
  return token || null;
};
