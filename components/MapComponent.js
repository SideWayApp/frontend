import React, { useState,useRef,useEffect } from "react";
import { View, StyleSheet, Dimensions,TouchableOpacity, Text } from "react-native";
import MapView ,{Marker} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from "@env";
import { getDirections } from 'react-native-google-maps-directions';
const { width, height } = Dimensions.get("window");


const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00001;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 32.0853,
  longitude: 34.781769,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function MapComponent({lastIndex,isDirection,origin,destination,preference,wayPointArr}) {
    return (
    <View>
        <MapView style={styles.map}  initialRegion={INITIAL_POSITION}>  
            {isDirection &&  
            <>
                <Marker coordinate={{latitude:wayPointArr[0].latitude,longitude:wayPointArr[0].longitude}} title="Origin"/>
                <Marker coordinate={{latitude:wayPointArr[lastIndex].latitude,longitude:wayPointArr[lastIndex].longitude}} title="Destination"/>
                <Marker coordinate={{latitude: wayPointArr[2].latitude, longitude: wayPointArr[2].longitude}} title="You"/>
                <MapViewDirections
                    origin={{latitude:wayPointArr[0].latitude,longitude:wayPointArr[0].longitude}}
                    destination={{latitude:wayPointArr[lastIndex].latitude,longitude:wayPointArr[lastIndex].longitude}}
                    waypoints={wayPointArr}
                    apikey={GOOGLE_API_KEY} 
                    strokeWidth={3}
                    mode="WALKING"
                    strokeColor="black"
                />
            </>
        }
        </MapView>  
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});