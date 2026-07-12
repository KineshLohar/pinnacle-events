import "dotenv/config";

import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth/auth";
import { db } from ".";
import { user } from "./schema";

async function seed() {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const name = process.env.ADMIN_NAME!;

  const existing = await db
    .select({
      id: user.id,
    })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existing.length) {
    console.log("✅ Admin already exists.");
    return;
  }

  await auth.api.createUser({
    body: {
      name,
      email,
      password,
      role: "admin",
    },
  });

  console.log("✅ Admin created.");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });