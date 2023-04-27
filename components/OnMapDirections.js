import { GOOGLE_API_KEY } from "@env";
import { useEffect, useState } from "react";
import { Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import polyline from "@mapbox/polyline";

export default function OnMapDirections({ wayPoints, polylinePoints }) {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  useEffect(() => {
    if (polylinePoints) {
      const decodedPoints = polyline.decode(polylinePoints, {
        polylinePrecision: 5,
      });
      const coordinates = decodedPoints.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));
      console.log(coordinates.length);
      setRouteCoordinates(coordinates);
    }
  }, [polylinePoints]);
  return (
    <Polyline
      coordinates={routeCoordinates}
      // apikey={GOOGLE_API_KEY}
      strokeWidth={3}
      mode="WALKING"
      strokeColor="red"
    />
  );
}
