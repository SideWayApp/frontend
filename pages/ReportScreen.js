import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text,Alert,TouchableOpacity,TextInput } from "react-native";

import { Button } from "react-native-paper";

import Icon from '../components/IconComponent'
import forbiddenIcon from '../images/forbidden.png';
import warningIcon from '../images/warning.png'
import floodIcon from '../images/water.png'
import protestIcon from '../images/protest.png'
import roadConstractionIcon from '../images/road-construction.png'
import poopIcon from '../images/poop.png'
import noLightIcon from '../images/no-light.png'
import trashIcon from '../images/trash.png'
import hotTempIcon from '../images/hot-temperature.png'

const ReportScreen = () =>{
    const [text, onChangeText] = useState('your location');
    const handleForbiddenPress = () => {
        Alert.alert('FORBIDDEN icon pressed!');
    };

    const handleWarningPress = () => {
        Alert.alert('WARNING icon pressed!');
    };

    const handleFloodPress = () => {
        Alert.alert('FLOOD icon pressed!');
    };

    const handleProtestPress = () => {
        Alert.alert('PROTEST icon pressed!');
    };

    const handleConstractionPress = () => {
        Alert.alert('ROAD-CONSTRACTION icon pressed!');
    };

    const handlePoopPress = () => {
        Alert.alert('POOP icon pressed!');
    };

    const handleNoLightPress = () => {
        Alert.alert('NO-LIGHT icon pressed!');
    };

    const handleTrashPress = () => {
        Alert.alert('TRASH icon pressed!');
    };

    const handleHotTempPress = () => {
        Alert.alert('HOT-TEMPERTURE icon pressed!');
    };



useEffect(()=>{

},[])

return(
    <View style={styles.container}>
        <View>
            <Text style={styles.title}> Report  </Text>
        </View>
    
        <View >
            <TextInput
                style={styles.searchContainer}
                onChangeText={onChangeText}
                value={text}
            />
            <Button
            style={styles.searchContainer}
            onPress={()=>Alert.alert('button pressed')}
            >
                <Text style={styles.searchContainer}>Choose on map</Text>
            </Button>
        </View>
        <View style={styles.grid}>
            <TouchableOpacity
             style={styles.button}>
                <Icon source={forbiddenIcon} style={styles.button} onPress={handleWarningPress}/>
            </TouchableOpacity>

            <TouchableOpacity
             style={styles.button}>
                <Icon source={warningIcon} style={styles.button} onPress={handleForbiddenPress}/>
            </TouchableOpacity>

            <TouchableOpacity
             style={styles.button}>
                <Icon source={floodIcon} style={styles.button} onPress={handleFloodPress}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button}>
                <Icon source={protestIcon} style={styles.button} onPress={handleProtestPress}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Icon source={roadConstractionIcon} style={styles.button} onPress={handleConstractionPress}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Icon source={poopIcon} style={styles.button} onPress={handlePoopPress}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Icon source={noLightIcon} style={styles.button} onPress={handleNoLightPress}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Icon source={trashIcon} style={styles.button} onPress={handleTrashPress}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Icon source={hotTempIcon} style={styles.button} onPress={handleHotTempPress}/>
            </TouchableOpacity>
        </View>
    </View>
)

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
        paddingTop: 10,
        marginLeft: 20,
    },
    grid: {
        marginTop:40,
        marginRight: 25,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      button: {
        width: '30%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 50,
      },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 5,
    },
    content: {
        flex: 1,
        textAlign: 'center',
        marginTop: 5,
    },
    searchContainer: {
        position: 'relative',
        alignItems: 'center',
        width: "90%",
        shadowColor: "black",
        color:"black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8,
        top: 10,
        marginTop:10,
        backgroundColor:'#ddd'
    },
});
  
export default ReportScreen;