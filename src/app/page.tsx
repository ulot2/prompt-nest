import { Navbar } from "@/components/Navbar";
import { PromptList } from "@/components/PromptList";
import { Categories } from "@/components/Categories";
import { WebsiteDetails } from "@/components/WebsiteDetails";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <WebsiteDetails />
      <Categories />
      <PromptList />
    </div>
  );
}
