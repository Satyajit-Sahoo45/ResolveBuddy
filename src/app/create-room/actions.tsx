"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Room } from "@prisma/client";

export async function createRoomAction(roomData: Omit<Room, "userId" | "id">) {
  const session = await getSession();
  console.log(session, "session");

  if (!session) {
    throw new Error("You must be logged in to create a room");
  }
  await db.room.create({ data: { ...roomData, userId: session?.user?.id } });
}
