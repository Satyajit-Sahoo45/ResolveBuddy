import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const rooms = await db.room.findMany();
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-4xl">Find Buddy Room</h1>
        <Button className="bg-gray-300" asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      {rooms.map((room, index) => {
        return (
          <div key={room.id} className="text-white">
            {room.name}
          </div>
        );
      })}
    </main>
  );
}
