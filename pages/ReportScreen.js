import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text,Alert,TouchableOpacity,TextInput } from "react-native";
import {getAddressFromLatLng} from '../axios'

import { Button } from "react-native-paper";

import Icon from '../components/IconComponent'
import forbiddenIcon from '../images/no-entry.png';
import warningIcon from '../images/warning.png'
import floodIcon from '../images/water.png'
import protestIcon from '../images/demonstration.png'
import roadConstractionIcon from '../images/under-construction.png'
import poopIcon from '../images/poop.png'
import noLightIcon from '../images/no-light.png'
import trashIcon from '../images/garbage-bin.png'
import hotTempIcon from '../images/hot-temperature.png'

const ReportScreen = () =>{
    const [text, onChangeText] = useState('your location');
    const handleForbiddenPress = () => {
        Alert.alert("Is this road is blocked?","Thank you for your report",[
            {
                text:"Yes",
                onPress:()=>Alert.alert("YES pressed")
            },
            {
                text:"No",
                onPress:()=>Alert.alert("NO pressed")
            }
        ]);
    };

    const handleWarningPress = () => {
        Alert.alert("Is this road dangerous?","Thank you for your report",[
            {
                text:"Yes",
                onPress:()=>Alert.alert("YES pressed")
            },
            {
                text:"No",
                onPress:()=>Alert.alert("NO pressed")
            }
        ]);
    };

    const handleFloodPress = () => {
        Alert.alert("Is this road is flooded?","Thank you for your report",[
            {
                text:"Yes",
                onPress:()=>Alert.alert("YES pressed")
            },
            {
                text:"No",
                onPress:()=>Alert.alert("NO pressed")
            }
        ]);
    };

    const handleProtestPress = () => {
        Alert.alert("Is there is a protest?","Thank you for your report",[
            {
                text:"Yes",
                onPress:()=>Alert.alert("YES pressed")
            },
            {
                text:"No",
                onPress:()=>Alert.alert("NO pressed")
            }
        ]);
    };

    const handleConstractionPress = () => {
        Alert.alert("Those this road is in constarction?","Thank you for your report",[
            {
                text:"Yes",
                onPress:()=>Alert.alert("YES pressed")
            },
            {
                text:"No",
                onPress:()=>Alert.alert("NO pressed")
            }
        ]);
    };

    const handlePoopPress = () => {
        AAlert.alert("There is dog poop on the way?","Thank you for your report",[
            {
                text:"Yes",
                onPress:()=>Alert.alert("YES pressed")
            },
            {
                text:"No",
                onPress:()=>Alert.alert("NO pressed")
            }
        ]);
    };

    const handleNoLightPress = () => {
        Alert.alert("No lights?","Thank you for your report",[
            {
                text:"Yes",
                onPress:()=>Alert.alert("YES pressed")
            },
            {
                text:"No",
                onPress:()=>Alert.alert("NO pressed")
            }
        ]);
    };

    const handleTrashPress = () => {
        Alert.alert("Is this road dirty?","Thank you for your report",[
            {
                text:"Yes",
                onPress:()=>Alert.alert("YES pressed")
            },
            {
                text:"No",
                onPress:()=>Alert.alert("NO pressed")
            }
        ]);
    };

    const handleHotTempPress = () => {
        Alert.alert("No shadow?","Thank you for your report",[
            {
                text:"Yes",
                onPress:()=>Alert.alert("YES pressed")
            },
            {
                text:"No",
                onPress:()=>Alert.alert("NO pressed")
            }
        ]);
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
                <Icon source={forbiddenIcon} style={styles.button} onPress={handleForbiddenPress }/>
            </TouchableOpacity>

            <TouchableOpacity
             style={styles.button}>
                <Icon source={warningIcon} style={styles.button} onPress={handleWarningPress}/>
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
        marginRight: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      button: {
        width: '30%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
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