
//作业二
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import Location from "./components/Location";
import RenderCanvas from "./components/renderCanvas"; 
import store from "./store";
import "leaflet/dist/leaflet.css";

export type FieldData = {
  cellsize: number;
  data: number[][];
  nODATA: string;
  xllcorner: number;
  yllcorner: number;
  ncols: number;
  nrows: number;
};
export default function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [tempData, setTempData] = useState<FieldData | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const _map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([36, 120], 7);
      store.setMap(_map); // 将 map 存入 store
      setMapReady(true);

      // 添加控件
      L.control.scale({ imperial: false, position: "bottomright" }).addTo(_map);
      L.control.zoom({ position: "bottomright" }).addTo(_map);

      // 添加底图
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "",
        }
      ).addTo(_map);

      return () => {
        _map.remove();
      };
    }
  }, []);

  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/temp1.json");
      const data = await response.json();
      setTempData(data);
    };
    if (mapReady) fetchData();
  }, [mapReady]);

  return (
    <div className="relative">
      <div ref={mapRef} className="z-10 h-svh"></div>
      {mapReady && <Location />}
      {mapReady && tempData && ( 
        <RenderCanvas tempData={tempData} />
      )}
    </div>
  );
}
//第三次课
// import React, { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import Location from "./components/Location";
// import store from "./store";
// import 'leaflet/dist/leaflet.css';
// export default function App() {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [mapReady, setMapReady] = useState(false);
//   useEffect(() => {
//     if (mapRef.current) {
//       const _map = L.map(mapRef.current, {
//         zoomControl: false,
//         attributionControl: false,
//       }).setView([36, 120], 7);
//       store.setMap(_map);
//       setMapReady(true);
//       renderCanvas(_map);
//       L.control.scale({
//           imperial: false,
//           position: "bottomright",
//         })
//         .addTo(_map);
//       L.control.zoom({ position: "bottomright" }).addTo(_map);
//       L.tileLayer(
//         "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//         {
//           attribution: "",
//         }
//       ).addTo(_map);
//       return () => {
//         _map.remove();
//       };
//     }
//   }, []);

//   const renderCanvas = async(map:L.Map) =>{
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d")!;
//     ctx.fillStyle = "rgb(255,0,0)";
//     ctx.fillRect(10, 10, 55, 50);
//     const url = canvas.toDataURL("png");
//     const tempData: FieldData = await fetch("/temp1.json").then((res) =>
//       res.json()
//     );

//     const imageBounds =L.latLngBounds([
//     [tempData.yllcorner, tempData.xllcorner], 
//     [tempData.yllcorner + tempData.cellsize * tempData.nrows, 
//      tempData.xllcorner + tempData.cellsize * tempData.ncols]]);

//     const layer = L.imageOverlay(url,imageBounds).addTo(map);
//     console.log(layer);
//   };
//   return (
//     <div className="relative">
//       <div ref={mapRef} className="z-10 h-svh"></div>
//       {mapReady && <Location />}
//     </div>
//   );
// }
// type FieldData = {
//   cellsize: number;
//   data: number[][];
//   nODATA: string;
//   xllcorner: number;
//   yllcorner: number;
//   ncols: number;
//   nrows: number;
// }


// //作业一
// // export default function App() {
// //   const mapRef = useRef(null);
// //   const [latlng, setLatlng] = useState({ lat: '', lng: '' });

// //   useEffect(() => {
// //     if (mapRef.current) {
// //       const map = L.map(mapRef.current, {
// //         zoomControl: false,
// //         attributionControl: false,
// //       }).setView([35.775782, 120.03651], 7);

// //       // 添加底图
// //       L.tileLayer(
// //         "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
// //         {
// //           attribution: "",
// //         }
// //       ).addTo(map);

// //       // 绑定mousemove事件监听器
// //       map.on('mousemove', function (e) {
// //         setLatlng({ lat: e.latlng.lat.toFixed(5), lng: e.latlng.lng.toFixed(5) });
// //       });

// //       return () => {
// //         map.remove();
// //       };
// //     }
// //   }, []);

// //   return (
// //     <>
// //       <div ref={mapRef} style={{ height: "100vh" }}></div>
// //       <div style={{
// //         position: 'absolute',
// //         bottom: '10px',
// //         left: '10px',
// //         padding: '10px',
// //         backgroundColor: 'white',
// //         borderRadius: '5px',
// //         boxShadow: '0 0 10px rgba(0,0,0,0.5)',
// //         zIndex: 1000,
// //       }}>
// //         经纬度: {latlng.lat}, {latlng.lng}
// //       </div>
// //     </>
// //   );
// // }
// export default function App(){
//   // const mapRef = useRef<HTMLDivElement>(null);
//   // const [latlng, setLatlng] = useState({ lat: '', lng: '' });
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const [mapInstance, setMapInstance] = useState<L.Map | null>(null); // 存储地图实例
//   useEffect(() => {
//     if(mapRef.current) {
//       const map = L.map(mapRef.current,{zoomControl:false,attributionControl:false,}).setView([35.775782, 120.03651],7);
//       //比例尺
//       L.control.scale({imperial:false,position:"bottomright"}).addTo(map);
//       //缩放
//       L.control.zoom({position:'bottomright'}).addTo(map);
//       // L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
//       //   maxZoom: 18,
//       //   attribution:
//       //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       // }).addTo(map);
//       //地图
//       L.tileLayer(
//         "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//         {
//           attribution: "",
//         }
//       ).addTo(map);
//       //标记
//       L.marker([35.775782, 120.03651]).addTo(map).bindPopup('海大').openPopup();
//       L.marker([31.76693, 117.18487]).addTo(map).bindPopup('安大').openPopup();
//       // 保存地图实例
//       setMapInstance(map);

//       return () => {
//         map.remove(); // 清理地图实例
//       };
      
//     }
//   },[]);  

//   // return <div ref={mapRef} style ={{ height: "100vh"}}></div>;
//   return (
//     <>
//       {/* 地图容器 */}
//       <div ref={mapRef} style={{ height: "100vh" }}></div>

//       {/* 鼠标位置组件 */}
//       {mapInstance && <Location map={mapInstance} />}
//     </>
//   );
// }























// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

// function App() {
//   const [count, setCount] = useState(0);
//   const notice= import.meta.env.VITE_APP_NAME;
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           this count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//         <p>{notice}</p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
