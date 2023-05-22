exports.checkIfIsInRangeOfRoute = async (location, wayPoints) => {
    const thresholdDistance = 5;
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