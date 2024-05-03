import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
  unstable_noStore();

  const where = search
    ? {
        tags: {
          contains: search,
        },
      }
    : undefined;

  const rooms = await db.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms() {
  unstable_noStore();

  const session = await getSession();

  if (!session) {
    throw new Error("User not authenticated");
  }
  const rooms = await db.room.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return rooms;
}

export async function getRoomData(roomId: string) {
  unstable_noStore();

  const room = await db.room.findFirst({
    where: {
      id: roomId,
    },
  });

  return room;
}
