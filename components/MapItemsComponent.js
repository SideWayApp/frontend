import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import { fetchObjectsInRegion } from "../axios";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// "alert-octagon", "camera"
export default function MapItemsComponent({ region }) {
  const [mapItems, setMapItem] = useState([]);

  useEffect(() => {
    // Fetch objects based on the current region
    const fetchObjects = async () => {
      const objects = await fetchObjectsInRegion(region);
      setMapItem(objects);
    };

    fetchObjects();
  }, [region]);
  return (
    <>
      {mapItems.map((mapItem, index) => {
        return (
          <Marker
            key={mapItem.y + mapItem.x}
            coordinate={{ latitude: mapItem.y, longitude: mapItem.x }}
          >
            <View style={{ width: 50, height: 50 }}>
              {mapItem.type === "camera" && <Icon name="camera" />}
              {mapItem.type !== "camera" && <Icon name="alert-octagon" />}
            </View>
          </Marker>
        );
      })}
    </>
  );
}
