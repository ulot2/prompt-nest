import { auth } from "@/auth";
import Image from "next/image";
import React from "react";

export default async function UserInfo() {
  const session = await auth();
  return (
    <div>
      <h1>User Info</h1>
      <p>User signed in with name: {session?.user?.name}</p>
      <p>User signed in with email: {session?.user?.email}</p>
      {session?.user?.image && (
        <Image
          className="rounded-[50%]"
          src={session.user.image ?? ""}
          width={50}
          height={50}
          alt="avatar"
        />
      )}
    </div>
  );
}
