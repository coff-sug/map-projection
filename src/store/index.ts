import L from "leaflet";
import { makeAutoObservable } from "mobx";
class App {
  name = "ң�п��ӻ�";
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
//     private name = "ң�п��ӻ�";
//     map!:L.Map;
//     latlng: { lat: string; lng: string } = { lat: '', lng: '' }; // ��Ӿ�γ��״̬
//     constructor(){
//         makeAutoObservable(this);
//     }
//     setName = () => {}
//     setLatLng = (lat: string, lng: string) => {
//         this.latlng = { lat, lng }; // ���¾�γ��״̬
//       }
// }
// export default new App();