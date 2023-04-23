import { GOOGLE_API_KEY } from "@env";
import { Polyline } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";

export default function OnMapDirections({wayPoints}){
  console.log(wayPoints.length)
  return (
    <Polyline
          coordinates={wayPoints}
          apikey={GOOGLE_API_KEY}
          strokeWidth={3}
          mode="WALKING"
          strokeColor="red"
    />
  )
}
