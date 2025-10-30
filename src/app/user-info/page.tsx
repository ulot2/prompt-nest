import { auth } from "@/auth";
import Image from "next/image";
import { IoIosArrowRoundBack, IoIosAdd } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { prisma } from "@/lib/db";
import { PromptList } from "@/components/PromptList";
import router from "next/dist/shared/lib/router/router";
import { UserInfoHeader } from "@/components/UserInfoHeader";

export default async function UserInfo() {
  const session = await auth();
  const prompts = await prisma.prompt.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  return (
    <div>
      <UserInfoHeader />
      <div className="w-full max-w-[600px] mx-auto bg-white mt-[2rem] p-[2rem] rounded-lg shadow-md">
        <div className="flex gap-[2rem]">
          <div className="h-[102px] rounded-[50%] w-[102px] border-4 border-white shadow-lg">
            {session?.user?.image && (
              <Image
                className="rounded-[50%]"
                src={session.user.image ?? ""}
                width={100}
                height={100}
                alt="avatar"
              />
            )}
          </div>
          <div>
            <p className="text-2xl font-semibold">{session?.user?.name}</p>
            <p className="text-[#848587] mb-[0.6rem]">{session?.user?.email}</p>
            <p className="text-[#848587] mb-[0.8rem]">
              Member of the community curated AI prompts
            </p>
            <hr className="border-gray-300 mb-[0.8rem]" />
            <div>
              <h2 className="text-[20px]">{prompts.length}</h2>
              <p className="flex items-center text-[#848587]">
                <FaRegFileAlt />
                <span>Prompts</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <PromptList session={session} prompts={prompts} />
    </div>
  );
}
