import { GOOGLE_API_KEY } from "@env";
import MapViewDirections from "react-native-maps-directions";

export default function OnMapDirections({wayPoints}){
  const lastIndex = wayPoints.length-1;
  console.log(lastIndex + "From OnMap")
  return (
    <MapViewDirections
          origin={{
              latitude: wayPoints[0].latitude,
              longitude: wayPoints[0].longitude,
          }}
          destination={{
              latitude: wayPoints[lastIndex].latitude,
              longitude: wayPoints[lastIndex].longitude,
          }}
          waypoints={wayPoints}
          apikey={GOOGLE_API_KEY}
          strokeWidth={3}
          mode="WALKING"
          strokeColor="red"
    />
  )
}
