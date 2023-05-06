import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Marker, Callout } from "react-native-maps";
import { fetchObjectsInRegion } from "../axios";
import MapItemMarker from "./MapItemMarker";
import { useSelector } from "react-redux";
// "alert-octagon", "camera"

const minDisplayDelta = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function MapItemsComponent({ region }) {
  const [mapItems, setMapItem] = useState([]);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    // Fetch objects based on the current region
    const fetchObjects = async (preferences) => {
      const objects = await fetchObjectsInRegion(region, preferences);
      setMapItem(objects);
    };
    if (
      user &&
      (region.latitudeDelta <= minDisplayDelta.latitudeDelta ||
        region.longitudeDelta <= minDisplayDelta.longitudeDelta)
    ) {
      fetchObjects(user.preferences);
    } else {
      setMapItem([]);
    }
  }, [region, user]);
  return (
    <>
      {mapItems.map((mapItem, index) => {
        return (
          <Marker
            title={mapItem.type}
            description={mapItem.streetName}
            key={mapItem.longitude + mapItem.latitude + index}
            coordinate={{
              latitude: mapItem.latitude,
              longitude: mapItem.longitude,
            }}
          >
            <MapItemMarker mapItem={mapItem} />
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
