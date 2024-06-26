import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/services/room";
import { unstable_noStore } from "next/cache";
import { SearchBar } from "./SearchBar";
import { RoomCard } from "./room-card";
import Image from "next/image";
import notFoundSvg from "../../../public/assets/not-found.svg";

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

      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src={notFoundSvg}
            width="200"
            height="200"
            alt="not found image"
          />

          <h2 className="text-2xl">No Rooms Yet!</h2>

          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
