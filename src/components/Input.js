import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";

const Input = props => {
    const { placeholder, reff } = props;
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical:5,
            
            marginBottom: 10,
            height: 90,
            width: '100%'
        },
        whiteLine: {
            backgroundColor: 'white',
            width: 5,
            height: '85%',
        },
        verticalLines: {
            borderTopWidth: 5,
            borderBottomWidth: 5,
            borderColor: 'white',
            height: '100%',
            width: '100%',
            backgroundColor: 'black',
            flex: 1,
            flexDirection: 'row'
          },
        inputStyle: {
            color: 'white',
            flex: 1,
            height: "100%",
            fontSize: 30,
            paddingHorizontal: 10
        }
    });

    return (
        <View style={styles.container} pointerEvents={props.pointerEvents}>
            <View style={styles.whiteLine} />
            <View style={styles.verticalLines} >
                <TextInput
                    ref={reff}
                    {...props}
                    maxFontSizeMultiplier={1.2}
                    style={styles.inputStyle}
                    placeholder={placeholder}
                />
            </View>
            <View style={styles.whiteLine} />
        </View>
    );
};

export default Input