import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text,Alert,TouchableOpacity,TextInput } from "react-native";
import {getAddressFromLatLng} from '../axios'

import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import { setOrigin, setDestination } from "../Redux/DirectionsStore/actions"
import Stack from "@react-native-material/core"

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
    const navigation = useNavigation()
    const origin = useSelector((state) => state.directions)
    const user = useSelector((state) => state.auth.user)

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
        Alert.alert("There is dog poop on the way?","Thank you for your report",[
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
    
        <View style={{ flexDirection: "row" }}>
					<View style={{ width: "91%" }}>
						<Button
                        style={styles.row_button}
							title={origin}
							variant="outlined"
							value={origin}
							onPress={() => {
								if (user) {
									navigation.navigate("Choose Point", { type: "Origin" })
								} else {
									Alert.alert(
										"Not logged in",
										"Sign in please",
										[
											{
												text: "Cancel",
											},

											{ text: "OK" },
										],
										{ cancelable: false }
									)
								}
							}}
							uppercase={false}
							color="black"
						>
                            <Text style={styles.button_title}  >Choose your location</Text>
                        </Button>
					</View>
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
      row_button: {
        backgroundColor: '#ADD8E6',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
      },
      button_title:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'black',
        marginTop: 5,
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
        position: 'absolute',
        alignItems: 'center',
        width: "100%",
        shadowColor: "black",
        color:"black",
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 25,
        borderRadius: 8,
        top: 10,
        marginTop:10,
        backgroundColor:'#ddd'
    },
});
  
export default ReportScreen;