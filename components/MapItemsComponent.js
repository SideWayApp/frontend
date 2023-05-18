import { View, Text, StyleSheet, Pressable, Alert, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Marker, Callout } from "react-native-maps";
import { fetchObjectsInRegion } from "../axios";
import MapItemMarker from "./MapItemMarker";
import { useSelector } from "react-redux";
// "alert-octagon", "camera"

const minDisplayDelta = {
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function MapItemsComponent({ region }) {
  const [mapItems, setMapItem] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const updateReport = (type) =>{
    console.log("yeaaaaaaaaaaaaaaaaaaaa")
  }
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
                <Text style={styles.calloutQuestion}>is it still there?</Text>
                <View  style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      updateReport(mapItem.type)
                      }
                    }>
                      <Text style={styles.textStyle}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      
                      }
                    }>
                      <Text style={styles.textStyle}>No</Text>
                  </TouchableOpacity>
                </View>           
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
    textAlign:"center"
  },
  calloutQuestion: {
    fontSize: 13,
    marginBottom: 5,
    textAlign:"center"
  },
  calloutDescription: {
    fontSize: 14,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    },
    button: {
      backgroundColor: '#2196F3',
      width: '40%',
      height: 35,
      borderRadius: 20,
      padding: 6,
      elevation: 2,
      marginBottom: 5,
      marginLeft:8,
      marginRight:8,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
});
