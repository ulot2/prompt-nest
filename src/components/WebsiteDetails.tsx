"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function WebsiteDetails() {
  const prompt = await prisma.prompt.findMany();

  return (
    <div className="max-w-[900px] w-full mx-auto mt-[1rem]">
      <div className="flex gap-[1rem] justify-center">
        <div className="bg-white border border-gray-300 p-[0.5rem] w-[20%] rounded-lg">
          <h1>{prompt.length}</h1>
          <p>Total prompts</p>
        </div>
        <div className="bg-white border border-gray-300 p-[0.5rem] w-[20%] rounded-lg">
          <h1>12.5k</h1>
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
