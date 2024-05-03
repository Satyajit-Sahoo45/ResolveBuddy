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

export async function getRoomData(roomId: string) {
  unstable_noStore();

  const room = await db.room.findFirst({
    where: {
      id: roomId,
    },
  });

  return room;
}
