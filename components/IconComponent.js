import React from 'react';
import {Image,StyleSheet,TouchableOpacity} from 'react-native'

const Icon = ({source,style,onPress}) =>{
    return (
        <TouchableOpacity onPress={onPress} style={style}>
        <Image source={source} style={styles.button} />
      </TouchableOpacity>
    
    )
}

const styles = StyleSheet.create({
    button: {
        width: '350%',
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 55,
    },
})

export default Icon;
