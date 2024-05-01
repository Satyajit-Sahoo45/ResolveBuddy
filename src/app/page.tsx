import { db } from "@/lib/db";

export default async function Home() {
  try {
    const rooms = await db.room.findMany();
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {rooms.map((room, index) => {
          return (
            <div key={room.id} className="text-white">
              {room.name}
            </div>
          );
        })}
      </main>
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Error fetching user data. Please try again later!.
        </p>
      </main>
    );
  }
}
