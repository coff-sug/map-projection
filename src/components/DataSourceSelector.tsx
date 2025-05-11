import React from "react";
import { MapDataType } from "@/App";

interface DataSourceSelectorProps {
  data: MapDataType[];
  currentTimeIndex: number;
  updateIndex: (index: number) => void;
}

const DataSourceSelector = ({ data, currentTimeIndex, updateIndex }: DataSourceSelectorProps) => {
  return (
    <div className="absolute top-10 right-10 bg-white p-3 rounded-lg shadow-md w-56 z-20">
      {}
      <h3 className="text-sm font-semibold text-gray-800 mb-3">数据源选择</h3>

      {}
      <div className="space-y-1">
        {data.map((item, index) => (
          <button
            key={index}
            onClick={() => updateIndex(index)}
            className={`flex items-center justify-between w-full px-3 py-1.5 rounded-md transition-colors duration-200 ${
              currentTimeIndex === index
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {}
            <div>
              <p className="text-xs font-medium">{item.name}</p>
              <p className="text-[10px] text-gray-500">{item.time}</p>
            </div>

            {}
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                currentTimeIndex === index ? "bg-white" : "bg-transparent"
              }`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataSourceSelector;