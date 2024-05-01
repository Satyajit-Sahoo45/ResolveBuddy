import React from "react";
import { CreateRoomForm } from "./create-room-form";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="container mx-auto flex-col gap-8 pt-12 pb-28">
      <h1 className="text-4xl font-bold">Create Room</h1>

      <CreateRoomForm />
    </div>
  );
}
