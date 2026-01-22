import { FaLayerGroup, FaUsers } from "react-icons/fa6";

type WebsiteDetailsProps = {
  totalPrompts: number;
  totalUsers: number;
};

export default function WebsiteDetails({
  totalUsers,
  totalPrompts,
}: WebsiteDetailsProps) {
  return (
    <div className="w-full max-w-[1200px] mx-auto mt-2 mb-8 md:p-0">
      <div className="flex flex-wrap justify-center gap-3">
        <div className="group bg-white border border-gray-200 pl-3 pr-5 py-2 rounded-full shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300 flex items-center gap-3">
          <div className="p-1.5 bg-violet-50 rounded-full group-hover:scale-110 transition-transform duration-300">
            <FaLayerGroup className="text-violet-600 text-sm" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-900 leading-none">
              {totalPrompts}
            </h1>
            <p className="text-[10px] font-medium text-gray-500 leading-tight">
              Total Prompts
            </p>
          </div>
        </div>

        <div className="group bg-white border border-gray-200 pl-3 pr-5 py-2 rounded-full shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex items-center gap-3">
          <div className="p-1.5 bg-emerald-50 rounded-full group-hover:scale-110 transition-transform duration-300">
            <FaUsers className="text-emerald-600 text-sm" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-900 leading-none">
              {totalUsers}
            </h1>
            <p className="text-[10px] font-medium text-gray-500 leading-tight">
              Community Members
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
