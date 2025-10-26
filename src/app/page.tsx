"use server";

import { Navbar } from "@/components/Navbar";
import { PromptList } from "@/components/PromptList";
import { Categories } from "@/components/Categories";
import { WebsiteDetails } from "@/components/WebsiteDetails";
import { auth } from "@/auth";
import { log } from "console";

export default async function Home() {
  const session = await auth();

  return (
    <div className="">
      <Navbar session={session} />
      <WebsiteDetails />
      <Categories />
      <PromptList />
    </div>
  );
}
