exports.checkIfIsInRangeOfRoute = async (location, wayPoints) => {
    let isInRange = true;
  
    for (let i = 0; i < wayPoints.length; i++) {
        const wayPoint = wayPoints[i];
        const distance = getDistance(
            location.latitude,
            location.longitude,
            wayPoint.latitude,
            wayPoint.longitude
        );
        const direction = checkDirectionBetweenCurrentToNextWayPoint(location, wayPoint);
        
        if (direction > 100 && distance < 5) {
            console.log("Oops, wrong direction.");
            isInRange = false;
            console.log(`Location = ${location.latitude}, ${location.longitude}, Waypoint = ${wayPoint.latitude}, ${wayPoint.longitude}, Distance = ${distance}`);
            break;
        } else {
            console.log("Oops, you are out of range.");
            isInRange = false;
            console.log(`Location = ${location.latitude}, ${location.longitude}, Waypoint = ${wayPoint.latitude}, ${wayPoint.longitude}, Distance = ${distance}`);
            break;
        }
    }
  
    return isInRange;
};




const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000; // Distance in meters
};

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

const checkDirectionBetweenCurrentToNextWayPoint = (location, wayPoint)=>{
    const radiansToDegrees = (radians) => (radians * 180) / Math.PI;

    const dLon = wayPoint.longitude - location.longitude;
    const y = Math.sin(dLon) * Math.cos(wayPoint.latitude);
    const x =
        Math.cos(location.latitude) * Math.sin(wayPoint.latitude) -
        Math.sin(location.latitude) * Math.cos(wayPoint.latitude) * Math.cos(dLon);
    let direction = radiansToDegrees(Math.atan2(y, x));

    // Convert direction to a positive value between 0 and 360 degrees
    if (direction < 0) {
        direction += 360;
    }
    return direction;
}
