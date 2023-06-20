import { View, Text, StyleSheet, Pressable, Alert, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Marker, Callout } from "react-native-maps";
import { fetchObjectsInRegion} from "../axios";
import MapItemMarker from "./MapItemMarker";
import { useSelector } from "react-redux";

const minDisplayDelta = {
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function MapItemsComponent({ region,handleCalloutPress }) {
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
      { mapItems && mapItems.map((mapItem, index) => {
        return ( 
        <Marker
          key={index}
          title={mapItem.type}
          description={mapItem.streetName}
          coordinate={{
            latitude: mapItem.latitude,
            longitude: mapItem.longitude,
          }}
        >
          <MapItemMarker mapItem={mapItem} />
          <Callout tooltip onPress={() => handleCalloutPress(mapItem.type,mapItem._id)}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>{mapItem.type}</Text>
              <Text style={styles.calloutQuestion}>Click for more information</Text>
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
    marginBottom: 2.5,
    textAlign: "center",
  },
  calloutQuestion: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: "center",
  },
  calloutDescription: {
    fontSize: 14,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    width: "40%",
    height: 35,
    borderRadius: 20,
    padding: 6,
    elevation: 2,
    marginBottom: 5,
    marginLeft: 8,
    marginRight: 8,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalType: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
