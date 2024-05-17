import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Room } from "@prisma/client";

export async function getRooms(search: string | undefined) {
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
  const room = await db.room.findFirst({
    where: {
      id: roomId,
    },
  });

  return room;
}

export async function deleteRoom(roomId: string) {
  await db.room.delete({
    where: {
      id: roomId,
    },
  });
}

export async function editRoom(roomData: Room) {
  const updatedRoom = await db.room.update({
    where: {
      id: roomData.id,
    },
    data: roomData,
  });
  return updatedRoom;
}
