import { IoIosSearch } from "react-icons/io";

export const SearchPrompt = () => {
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mt-[1rem]">
        <h1 className="text-2xl font-bold text-center lg:text-left">
          Discover Powerful AI Prompts
        </h1>
        <p className="text-gray-600 text-center lg:text-left">
          Community-curated prompts for ChatGPT, Claude, Gemini, and more. Find
          the perfect prompt for your needs.
        </p>
      </div>
      <div className="mt-[1rem] w-[350px] flex items-center mx-auto gap-[0.5rem] border border-gray-300 rounded-lg focus-within:border-gray-600">
        <IoIosSearch className="text-gray-400 ml-2" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search prompts..."
          className="p-2 w-full rounded-lg focus:outline-none"
        />
      </div>
    </div>
  );
};
