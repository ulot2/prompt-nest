"use server";

import { auth } from "@/auth";

import { prisma } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { PromptList } from "@/components/PromptList";
import { Categories } from "@/components/Categories";
import WebsiteDetails from "@/components/WebsiteDetails";

export default async function Home() {
  const session = await auth();

  const prompts = await prisma.prompt.findMany();

  return (
    <div className="">
      <Navbar session={session} />
      <WebsiteDetails />
      {/* <Categories /> */}
      <PromptList session={session} prompts={prompts} />
    </div>
  );
}
