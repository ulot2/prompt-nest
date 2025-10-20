import { Navbar } from "@/components/Navbar";
import { PromptList } from "@/components/PromptList";
import { Categories } from "@/components/Categories";
import { WebsiteDetails } from "@/components/WebsiteDetails";
import { PromptModal } from "@/components/PromptModal";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <WebsiteDetails />
      <Categories />
      <PromptList />
      {/* <PromptModal /> */}
    </div>
  );
}
