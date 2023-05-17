import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text,Alert,TouchableOpacity,TextInput ,Modal ,Pressable } from "react-native";
import {addMapItemFromLatLong} from '../axios'

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
    const user = useSelector((state) => state.auth.user)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalQuestion, setModalQuestion] = useState('')
    const route = useRoute();
    const latitude = route.params.location.latitude
    const longitude = route.params.location.longitude
    const [type,setType] = useState("") 

    const submitReport = ()=>{
        const data = {
            "type": type,
            "longitude":longitude,
            "latitude":latitude,
            "creator":user.email,
            "exists":0                
        }

        addMapItemFromLatLong(data);
    }

    const handleIconPress = (question,type) =>{
        setModalVisible(true)
        setModalQuestion(question)
        setType(type)
    } 

useEffect(()=>{
    setModalVisible(false);
    setModalQuestion(null);
},[])

return(
    <View style={styles.container}>
        <View>
            <Text style={styles.title}> Report  </Text>
        </View>
            
        <View style={styles.grid}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalQuestion}>{modalQuestion}</Text>
                        <View  style={{flexDirection: 'row'}}>
                            <Pressable
                                style={[styles.button1, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    submitReport()
                                }
                                }>
                                <Text style={styles.textStyle}>Yes</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button1, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)
                                }>
                                <Text style={styles.textStyle}>No</Text>
                            </Pressable>
                        </View>
                        <Text style={styles.modalThanks}>Thank you for your report! </Text>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
             style={styles.button}>
                <Icon source={forbiddenIcon} style={styles.button} onPress={()=>handleIconPress("Is this road is blocked?" ,"Blocked") }/>
            </TouchableOpacity>

            <TouchableOpacity
             style={styles.button}>
                <Icon source={warningIcon} style={styles.button} onPress={()=>handleIconPress("Is this road dangerous?", "Danger")}/>
            </TouchableOpacity>

            <TouchableOpacity
             style={styles.button}>
                <Icon source={floodIcon} style={styles.button} onPress={()=>handleIconPress("Is this road flooded?","Flood")}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button}>
                <Icon source={protestIcon} style={styles.button} onPress={()=>handleIconPress("Is there is a protest?" ,"Protest")}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Icon source={roadConstractionIcon} style={styles.button} onPress={()=>handleIconPress("Those this road is in constarction?","Constraction") }/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Icon source={poopIcon} style={styles.button} onPress={()=>handleIconPress("There is dog poop on the way?","Poop")}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Icon source={noLightIcon} style={styles.button} onPress={()=>handleIconPress("No lights?", "No lights")}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Icon source={trashIcon} style={styles.button} onPress={()=>handleIconPress("Is this road dirty?","Dirty")}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Icon source={hotTempIcon} style={styles.button} onPress={()=>handleIconPress("No shadow?","No shadow")}/>
            </TouchableOpacity>
        </View>
        <View>
            <Text style={styles.top_title}  >Please Notice!</Text>
            <Text style={styles.bottom_title}  >Your report is from your current location.</Text>
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
        marginTop:80,
        marginBottom:40,
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
      button1: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 5,
      },
      top_title:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'black',
        marginTop: 5,
    },
      bottom_title:{
        fontSize: 16,
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
      fontSize: 36,
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
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
    backgroundColor: '#2196F3',
    marginRight:5,
    },
    textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    },
    modalThanks: {
    marginBottom: 15,
    marginTop:15,
    textAlign: 'center',    
    fontSize:12

    },
    modalQuestion: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight:"bold",
    fontSize:25
    },

})
  
export default ReportScreen;