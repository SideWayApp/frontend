import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import { FAB } from 'react-native-paper';
import Icon from "@expo/vector-icons/MaterialCommunityIcons"

export default function BackNavigationFabComponent(props){
  return (
      <FAB
        style={styles.fabMe}
        icon={() =>
          <View style={styles.iconContainer}>
            <Icon name="navigation-variant" size={30} color="black" />
          </View>
        }
        onPress={props.moveTo()}
        onPress={()=>props.setIsGotDirection(true)}
        animated={false}
      />
  )
}

const styles = StyleSheet.create({
  fabMe: {
    position: 'absolute',
    margin: 16,
    right: 0,
    backgroundColor: 'turquoise',
    borderRadius: 100,
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
