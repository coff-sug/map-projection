import React, { useEffect, useRef } from "react";
import L from "leaflet";

import { Button } from "@/components/ui/button"
 
// function App() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-svh">
//       <Button>Click me</Button>
//     </div>
//   )
// }
 
// export default App

export default function App(){
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(mapRef.current) {
      const map = L.map(mapRef.current,{zoomControl:false,attributionControl:false,}).setView([35.775782, 120.03651],7);
      //比例尺
      L.control.scale({imperial:false,position:"bottomright"}).addTo(map);
      L.control.zoom({position:'bottomright'}).addTo(map);
      // L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
      //   maxZoom: 18,
      //   attribution:
      //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      // }).addTo(map);
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "",
        }
      ).addTo(map);
      L.marker([35.775782, 120.03651]).addTo(map).bindPopup('海大').openPopup();
      L.marker([31.76693, 117.18487]).addTo(map).bindPopup('安大').openPopup();
    }
  },[]);  

  return <div ref={mapRef} style ={{ height: "100vh"}}></div>;
}



















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
