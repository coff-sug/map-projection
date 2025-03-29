import L from "leaflet";
import { makeAutoObservable } from "mobx";
class App {
  name = "遥感可视化";
  map!: L.Map;
  constructor() {
    makeAutoObservable(this);
  }
  setName = (name: string) => {
    this.name = name;
  };
  setMap = (map: L.Map) => {
    this.map = map;
  };

}
export default new App();

// import L from 'leaflet';
// import { makeAutoObservable} from 'mobx'
// class App{
//     private name = "遥感可视化";
//     map!:L.Map;
//     latlng: { lat: string; lng: string } = { lat: '', lng: '' }; // 添加经纬度状态
//     constructor(){
//         makeAutoObservable(this);
//     }
//     setName = () => {}
//     setLatLng = (lat: string, lng: string) => {
//         this.latlng = { lat, lng }; // 更新经纬度状态
//       }
// }
// export default new App();