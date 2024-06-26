import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRooms } from "@/services/room";
import { UserRoomCard } from "./user-room-card";
import { unstable_noStore } from "next/cache";

export default async function YourRooms() {
  unstable_noStore();
  const rooms = await getUserRooms();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button className="bg-gray-300" asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room, index) => {
          return <UserRoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
