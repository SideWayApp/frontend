import store from "./Redux/store";
import {getWayPointsAndInstructions} from "./axios";
import * as geolib from 'geolib';

exports.isWithinRadius = (point,routeCoordinates,radius) =>{
  return true;
  // return routeCoordinates.some(coord => {
  //     const distance = geolib.getDistance(point, coord);
  //     return distance <= radius;
  // });    
}


exports.checkIfIsInRangeOfRoute = async (location, wayPoints) => {
    const thresholdDistance = 15;
    let isPhoneOutOfRange = false;
    
    wayPoints.forEach((wayPoint)=>{
      const distance = haversineDistance(location.latitude,location.longitude,wayPoint.start.latitude,latitude.start.longitude)
      if (distance >= thresholdDistance){
          isPhoneOutOfRange = true;
          return true;
      } 
    })
    return isPhoneOutOfRange;
};
// Haversine formula to calculate distance between two points in meters
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Convert to meters
    return distance;
  }
  
  // Helper function to convert degrees to radians
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  export const renderRoute = async (setWayPoints,setPolyline,setIsDirection,setIsGotDirection,setDistance,setDuration)=>{  
    const user = store.getState().auth.user;
    const origin = store.getState().directions.origin;
    const destination = store.getState().directions.destination;
    const res = await getWayPointsAndInstructions(
      origin,
      destination,
      user.preferences
    );
    setDuration(res.duration);
    setDistance(res.distance);
    setWayPoints(res.arr)
    setPolyline(res.points)
    setIsDirection(true)
    setIsGotDirection(true)
    return "OK"

  }

  export const calculateDeltasAndAverage = (coordinate1, coordinate2) => {
    const lat1 = coordinate1.latitude;
    const lon1 = coordinate1.longitude;
    const lat2 = coordinate2.latitude;
    const lon2 = coordinate2.longitude;
  
    const latDelta = Math.abs(lat1 - lat2) * 1.5;
    const lonDelta = Math.abs(lon1 - lon2) * 1.5;
  
    const avgLat = (lat1 + lat2) / 2;
    const avgLon = (lon1 + lon2) / 2;

  
    return {
      latitudeDelta: latDelta,
      longitudeDelta: lonDelta,
      latitude: avgLat,
      longitude: avgLon,
    };
  };
  
  