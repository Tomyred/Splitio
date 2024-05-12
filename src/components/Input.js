import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { theme } from "../styles/theme";

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
        verticalLine: {
            backgroundColor: '#FFFF',
            width: 5,
            height: '85%',
        },
        horizontalLines: {
            borderTopWidth: 5,
            borderBottomWidth: 5,
            borderColor: '#FFFF',
            height: '100%',
            width: '100%',
            backgroundColor: 'black',
            flex: 1,
            flexDirection: 'row'
          },
        inputStyle: {
            color: 'white',
            flex: 1,
            fontFamily: 'PressStart',
            height: "100%",
            fontSize: 20,
            paddingHorizontal: 10
        }
    });

    return (
        <View style={styles.container} pointerEvents={props.pointerEvents}>
            <View style={styles.verticalLine} />
            <View style={styles.horizontalLines} >
                <TextInput
                    maxLength={15}
                    placeholderTextColor={theme.colors.grey} 
                    ref={reff}
                    {...props}
                    maxFontSizeMultiplier={1.2}
                    style={styles.inputStyle}
                    placeholder={placeholder}
                />
            </View>
            <View style={styles.verticalLine} />
        </View>
    );
};

export default Input