import { View, Text, StyleSheet, Pressable, Alert, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Marker, Callout } from "react-native-maps";
import { fetchObjectsInRegion, updateExistMapItem} from "../axios";
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
  const [modalVisible, setModalVisible] = useState(false);

  const handleCalloutPress = (type,mapItemId) =>{
    let title = '';
    let changeable = null
    switch(type){
      case "Beach":
      case "Camera":
      case "Dangerous Building":
      case "Defibrillator":
      case "Fountain":
      case "Light Post":
      case "MADA Station":
      case "Museum":
      case "Polluted Area":
      case "Shelter":
      case "Public WIFI Hotspots":
        title = "This data is immutable"
        changeable = false
        break;
      case "Danger":  
      case "Flood":
      case "Protest":
      case "Poop":
      case "Constraction":
        title = "Still there?"
        changeable = true
        break;
      case "No lights":
        title = "Still no lights?"
        changeable = true
        break;
      case "Dirty":
        title = "Still dirty?"
        changeable = true
        break;
      case "No shadow":
        title = "Still no shdaow?"
        changeable = true
        break;
    }

    if(changeable){
      Alert.alert(type, title, [
        {text: 'Yes'},
        {
          text: 'No', onPress: () =>{
            handleNoPress(mapItemId);
          }
        } 
      ]);

    }else{
      Alert.alert(type, title);
    }
  }

  const handleNoPress = (mapItemId) =>{
    const data = {
      "_id" : mapItemId,
      "userEmail":user.email 
    }
    updateExistMapItem(data)
  }

  useEffect(() => {
    setModalVisible(!modalVisible)
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
            <Callout tooltip onPress={()=>handleCalloutPress(mapItem.type,mapItem._id)}>
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
