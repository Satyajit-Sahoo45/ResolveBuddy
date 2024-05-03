import { getRoomData } from "@/services/room";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import { TagsList, splitTags } from "@/components/tags-list";
import { ResolveBuddyVideoPlayer } from "./video";
import { unstable_noStore } from "next/cache";

export default async function page(props: { params: { roomId: string } }) {
  unstable_noStore();

  const roomId = props.params.roomId;

  const room = await getRoomData(roomId);

  if (!room) {
    return <div>No room of this id found</div>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <ResolveBuddyVideoPlayer room={room} />
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
          <h1 className="text-base">{room?.name}</h1>

          {room?.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2 text-sm "
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github /> Github Link
            </Link>
          )}

          <p className="text-base text-gray-600">{room?.description}</p>

          <TagsList tags={splitTags(room.tags)} />
        </div>
      </div>
    </div>
  );
}
