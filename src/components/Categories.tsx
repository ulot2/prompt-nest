import React from "react";

const categories = [
  { tagName: "All" },
  { tagName: "ChatGPT" },
  { tagName: "Midjourney" },
  { tagName: "Gemini" },
  { tagName: "Code" },
  { tagName: "Writing" },
  { tagName: "Marketing" },
  { tagName: "Research" },
];

export const Categories = () => {
  return (
    <div className="max-w-[600px] w-full mx-auto mt-[1rem] flex justify-center items-center gap-[10px]">
      <div className="bg-[#ececf0] flex flex-wrap p-[6px] rounded-lg justify-center">
        {categories.map((category) => (
          <button
            key={category.tagName}
            type="button"
            className="font-bold text-[13px] hover:bg-white p-[0.3rem] px-[1rem] text-center rounded-[200px] transition cursor-pointer"
          >
            {category.tagName}
          </button>
        ))}
      </div>

      <div>
        <button
          type="button"
          className="bg-[#ececf0] p-[0.5rem] w-[100px] rounded-lg cursor-pointer"
        >
          Trending
        </button>
      </div>
    </div>
  );
};
