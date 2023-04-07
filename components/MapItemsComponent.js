import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Marker, Callout } from "react-native-maps";
import { fetchObjectsInRegion } from "../axios";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// "alert-octagon", "camera"

const minDisplayDelta = {
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

export default function MapItemsComponent({ region }) {
  const [mapItems, setMapItem] = useState([]);

  useEffect(() => {
    // Fetch objects based on the current region
    const fetchObjects = async () => {
      const objects = await fetchObjectsInRegion(region);
      setMapItem(objects);
    };
    if (
      region.latitudeDelta <= minDisplayDelta.latitudeDelta ||
      region.longitudeDelta <= minDisplayDelta.longitudeDelta
    ) {
      fetchObjects();
    } else {
      setMapItem([]);
    }
  }, [region]);
  return (
    <>
      {mapItems.map((mapItem, index) => {
        return (
          <Marker
            title={mapItem.type}
            description={mapItem.streetName}
            key={mapItem.y + mapItem.x}
            coordinate={{ latitude: mapItem.y, longitude: mapItem.x }}
          >
            <View style={styles.markerContainer}>
              {mapItem.type === "camera" && <Icon name="camera" />}
              {mapItem.type !== "camera" && <Icon name="alert-octagon" />}
            </View>
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{mapItem.type}</Text>
                <Text style={styles.calloutDescription}>
                  {mapItem.streetName}
                </Text>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
  },
  calloutContainer: {
    backgroundColor: "gray",
    borderRadius: 5,
    width: 150,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
  },
});
