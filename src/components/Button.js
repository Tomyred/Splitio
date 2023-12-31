import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Button = ({ disabled, type, fontSize, title, onPress }) => {

  const getColors = () => {

    if(disabled){
      return {background: '#d3d3d3', shadow: '#adafbc' }
    }

    switch (type) {
      case 'success':
        return {background: '#92cd41', shadow: '#4AA52E'};
      case 'error':
        return  {background: '#E76E55', shadow: '#8C2022' };
      case 'alert':
        return {background: '#F7D51D', shadow: '#E59400' }
      default:
        return {background: '#92cd41', shadow: '#4AA52E'};
    }
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      height: 85,
      
    },
    blackLine: {
      backgroundColor: 'black',
      width: 5,
      height: '85%',
    },
    verticalLines: {
      borderTopWidth: 5,
      borderBottomWidth: 5,
      borderColor: 'black',
      height: '100%',
      width: '100%',
      flex: 1,
      backgroundColor: getColors().background,
      flexDirection: 'row'
    },
    textContainer: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      flex: 1
    },
    innerBottomShadowLine: {
      backgroundColor: getColors().shadow,
      height: 5,
      width: '100%',
      alignSelf: 'flex-end'
    },
    innerLeftShadowLine: {
      backgroundColor: getColors().shadow,
      width: 5,
      height: '100%',
      // alignSelf: 'flex-end'
    }
  }

  return (
    <TouchableOpacity disabled={disabled} style={styles.container} onPress={onPress} >
      <View style={styles.blackLine} />
      <View style={styles.verticalLines} >
        <View style={styles.textContainer}>
          <Text style={{color: 'white', flex: 1, textAlignVertical: 'center', fontSize:20 }} >{title}</Text>
          <View style={styles.innerBottomShadowLine} />
        </View>
        <View style={styles.innerLeftShadowLine} />
      </View>
      <View style={styles.blackLine} />
    </TouchableOpacity>
  );
}

export default Button