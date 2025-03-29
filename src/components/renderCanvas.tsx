
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { FieldData } from '../App';
import store from '../store'; 

type RenderCanvasProps = {
  tempData: FieldData | null;
};

const RenderCanvas: React.FC<RenderCanvasProps> = ({ tempData }) => {
  const layerRef = useRef<L.ImageOverlay | null>(null);

  useEffect(() => {
    const map = store.map; 

    if (!map || !tempData) return;

    // ´´½¨ Canvas ÔªËØ
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(10, 10, 55, 50);
    const imageUrl = canvas.toDataURL('png');

    // ¼ÆËãÍ¼Ïñ¸²¸Ç·¶Î§
    const imageBounds = L.latLngBounds([
      [tempData.yllcorner, tempData.xllcorner],
      [
        tempData.yllcorner + tempData.cellsize * tempData.nrows,
        tempData.xllcorner + tempData.cellsize * tempData.ncols,
      ],
    ]);

    // ´´½¨²¢Ìí¼ÓÍ¼Ïñ¸²¸Ç²ã
    const newLayer = L.imageOverlay(imageUrl, imageBounds);
    newLayer.addTo(map);

    layerRef.current = newLayer;

    return () => {
      if (layerRef.current) {
        layerRef.current.remove();
      }
    };
  }, [tempData]); 

  return null; 
};

export default RenderCanvas;