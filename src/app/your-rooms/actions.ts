"use server";

import { getSession } from "@/lib/auth";
import { deleteRoom, getRoomData } from "@/services/room";
import { revalidatePath } from "next/cache";

export async function delete_Room(roomId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const room = await getRoomData(roomId);

  if (room?.userId !== session.user.id) {
    throw new Error("User not authenticated");
  }
  await deleteRoom(roomId);

  revalidatePath("/your-rooms");
}
