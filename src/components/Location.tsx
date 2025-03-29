import React, { useEffect, useState } from "react";
import L from "leaflet";
import store from "../store/index.ts";
import { observer } from "mobx-react-lite";

const Location = observer(() => {
  const map = store.map;
  const [postion, setPostion] = useState<string>("");
  useEffect(() => {
    map.on("mousemove", updatePostion);
    return () => {
      map.off("mousemove", updatePostion);
    };
  }, [map]);

  const updatePostion = (evt: L.LeafletMouseEvent) => {
    setPostion(evt.latlng.toString());
  };
  return (
    <div className="absolute z-20 text-white bottom-0.5 text-sm right-0.5 py-2 px-4">
      {postion}
    </div>
  );
});

export default Location;


// import React, { useEffect } from 'react';
// import L from 'leaflet';
// import store from '../store/index'; // 引入 MobX store
// import { observer } from 'mobx-react-lite'; // 引入 MobX 的 observer

// interface LocationProps {
//   map: L.Map | null; // 接收 Leaflet 地图实例
// }

// const Location: React.FC<LocationProps> = ({ map }) => {
//   useEffect(() => {
//     if (map) {
//       const onMouseMove = (e: L.LeafletMouseEvent) => {
//         const lat = e.latlng.lat.toFixed(5);
//         const lng = e.latlng.lng.toFixed(5);

//         // 更新 MobX 状态中的经纬度
//         store.setLatLng(lat, lng);
//       };

//       // 绑定 mousemove 事件
//       map.on('mousemove', onMouseMove);

//       // 清理事件监听器
//       return () => {
//         map.off('mousemove', onMouseMove);
//       };
//     }
//   }, [map]);

//   return (
//     <div
//       style={{
//         position: 'absolute',
//         bottom: '10px',
//         left: '10px',
//         padding: '10px',
//         backgroundColor: 'white',
//         borderRadius: '5px',
//         boxShadow: '0 0 10px rgba(0,0,0,0.5)',
//         zIndex: 1000,
//       }}
//     >
//       {/* 从 MobX 状态中读取经纬度 */}
//       经纬度: {store.latlng.lat}, {store.latlng.lng}
//     </div>
//   );
// };

// // 使用 observer 包裹组件以响应 MobX 状态变化
// export default observer(Location);