import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import { fetchObjectsInRegion } from "../axios";

export default function MapItemsComponent({ region }) {
  const [mapItems, setMapItem] = useState([]);

  useEffect(() => {
    // Fetch objects based on the current region
    const fetchObjects = async () => {
      const objects = await fetchObjectsInRegion(region);
      setMapItem(objects);
    };

    fetchObjects();
    console.log(region);
  }, [region]);
  return (
    <>
      {mapItems.map((mapItem, index) => (
        <Marker
          key={index}
          coordinate={{ latitude: mapItem.y, longitude: mapItem.x }}
        />
      ))}
    </>
  );
}
