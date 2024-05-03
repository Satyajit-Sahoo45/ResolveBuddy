import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/services/room";
import { unstable_noStore } from "next/cache";
import { SearchBar } from "./SearchBar";
import { RoomCard } from "./room-card";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-4xl">Find Code Rooms</h1>
        <Button className="bg-gray-300" asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room, index) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
