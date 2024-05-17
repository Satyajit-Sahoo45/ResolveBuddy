import { db } from "@/lib/db";

export async function deleteUser(userId: string) {
  await db.user.delete({
    where: {
      id: userId,
    },
  });
}
