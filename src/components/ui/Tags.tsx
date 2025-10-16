import React from "react";

const tags = [
  { tagName: "All" },
  { tagName: "ChatGPT" },
  { tagName: "Midjourney" },
  { tagName: "Gemini" },
  { tagName: "Code" },
  { tagName: "Writing" },
  { tagName: "Marketing" },
  { tagName: "Research" },
];

export const Tags = () => {
  return (
    <div className="max-w-[600px] w-full mx-auto mt-[1rem] flex justify-center">
      <div className="bg-[#ececf0] flex flex-wrap p-[6px] rounded-lg">
        {tags.map((tag) => (
          <button
            key={tag.tagName}
            type="button"
            className="font-bold text-[13px] hover:bg-white p-[0.3rem] px-[1rem] text-center rounded-[200px] transition cursor-pointer"
          >
            {tag.tagName}
          </button>
        ))}
      </div>

      <div>Trendinf</div>
    </div>
  );
};
