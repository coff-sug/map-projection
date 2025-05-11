
//Marker.tsx 第四次作业
// import { forwardRef, useImperativeHandle, useState } from "react";

// interface MarkerProps {
//   value: string;
//   name: string;
//   unit: string;
// }
// export interface MarkerRefProps {
//   init: (data: string) => void;show: () => void;hide: () => void;
//   isVisible: boolean; 
// }
// const Marker = forwardRef<MarkerRefProps, MarkerProps>((props, ref) => {
//   const [value, setValue] = useState(props.value);
//   const [name, setName] = useState(props.name);
//   const [unit, setUnit] = useState(props.unit);
//   const [isVisible, setIsVisible] = useState(true);
//   useImperativeHandle(
//     ref, () => ({
//       init(value: string) {setValue(value);},show() {setIsVisible(true);},hide() {setIsVisible(false);},get isVisible() {return isVisible;},
//     }),[isVisible]);
//   const handleClose = () => {setIsVisible(false);};
//   if (!isVisible) {return null; }
//   return (
//     <div className="relative top-1.5 left-1.5">
//       <div className="px-2 py-1 bg-white text-black whitespace-nowrap absolute -translate-x-1/2 top-[-30px] rounded shadow-lg flex items-center justify-between">
//         <span>
//           {name}: {value} {unit}
//         </span>
//         <button
//           onClick={handleClose}
//           className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           ×
//         </button>
//         <div className="absolute border-l-transparent border-r-transparent border-b-transparent border-t-white border-4 top-full left-1/2 -translate-x-1/2"></div>
//       </div>
//     </div>
//   );
// });


// //Marker.tsx
import { MapDataType } from "@/App";
import { forwardRef, useImperativeHandle, useState } from "react";
import { X } from "lucide-react";

const Marker = forwardRef<MarkerRefProps, MarkerProps>((props, ref) => {
  const [value, setValue] = useState(props.value);
  const [name, setName] = useState(props.name);
  const [unit, setUnit] = useState(props.unit);
  useImperativeHandle(
    ref,
    () => {
      return {
        init(value: string) {
          setValue(value);
        },
      };
    },
    []
  );
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.close();
  };
  return (
    <div className="relative top-1.5 left-1.5">
      <div className="px-4 pt-8 pb-3 bg-white text-black whitespace-nowrap absolute -translate-x-1/2 top-[-30px] after:content-[''] after:absolute after:border-l-transparent after:border-r-transparent after:border-b-transparent after:border-t-white  after:border-4  after:top-full after:left-1/2 after:-translate-x-1/2">
        {name}：{value} {unit}
        <X
          className="absolute top-2 right-2 size-5 hover:text-sky-700"
          onClick={handleClose}
        ></X>
      </div>
    </div>
  );
});

export default Marker;

type MarkerProps = {
  value: string;
  name: string;
  unit: string;
  close: () => void;
};
export type MarkerRefProps = {
  init: (data: string) => void;
};
