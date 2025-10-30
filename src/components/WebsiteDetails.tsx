"use server";

import { prisma } from "@/lib/db";

export default async function WebsiteDetails() {
  const promptCount = await prisma.prompt.count();
  const userCount = await prisma.user.count();

  return (
    <div className="max-w-[900px] w-full mx-auto mt-[1rem]">
      <div className="flex gap-[1rem] justify-center">
        <div className="bg-white border border-gray-300 p-[0.5rem] w-[20%] rounded-lg">
          <h1>{promptCount}</h1>
          <p>Total prompts</p>
        </div>
        <div className="bg-white border border-gray-300 p-[0.5rem] w-[20%] rounded-lg">
          <h1>{userCount}</h1>
          <p>Community members</p>
        </div>
        {/* <div className="bg-white border border-gray-300 p-[0.5rem] w-[20%] rounded-lg">
          <h1>156k</h1>
          <p>Prompts copied</p>
        </div> */}
      </div>
    </div>
  );
}
