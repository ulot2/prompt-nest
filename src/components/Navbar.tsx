export const Navbar = () => {
  return (
    <div className="border-b border-gray-300 bg-white">
      <div className="w-full max-w-[900px] mx-auto flex justify-between items-center my-[0.5rem]">
        <div className="cursor-pointer">
          <h1 className="text-2xl font-bold">PromptNest</h1>
          <p className="text-[10px] text-[#aeb0af] font-bold">
            Community AI prompts
          </p>
        </div>
        <div>
          <button
            type="button"
            className="bg-[#000] text-[#fff] w-[100px] p-[0.3rem] rounded-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
