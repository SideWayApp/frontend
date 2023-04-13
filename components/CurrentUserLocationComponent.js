import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import {Marker} from 'react-native-maps';
import Icon from "@expo/vector-icons/MaterialCommunityIcons"

export default function CurrentUserLocationComponent({location}){
  console.log(location)
  return (
    <Marker
        coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }}
        title="My Phone">
        <View style={styles.markerContainer}>
            <Icon name="walk" size={40} color="black"/>
        </View>
    </Marker>
  )
}
const styles = StyleSheet.create({
  markerContainer: {
    borderColor: "#000",
    padding: 0,
    borderRadius: 100
  },
  iconContainer: {
    justifyContent: 'center',
    width: 30,
    height: 30,
    bottom:3,
    alignSelf:'center',
    alignItems: 'center',
  },
});
