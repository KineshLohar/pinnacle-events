
import { headers } from "next/headers";
import { auth } from "./options";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}