import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import React from 'react';

const Button = ({ disabled, type, title, onPress }) => {
    const getColors = () => {
        // if(disabled){
        //   return {background: '#d3d3d3', shadow: '#adafbc' }
        // }

        switch (type) {
            case 'success':
                return { background: '#92cd41', shadow: '#4AA52E' };
            case 'error':
                return { background: '#E76E55', shadow: '#8C2022' };
            case 'alert':
                return { background: '#F7D51D', shadow: '#E59400' };
            default:
                return { background: '#92cd41', shadow: '#4AA52E' };
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
            height: 85,
        },
        blackLine: {
            backgroundColor: getColors().shadow,
            width: 5,
            height: '85%',
        },
        shadowLines: {
            borderTopWidth: 5,
            borderBottomWidth: 5,
            borderColor: getColors().shadow,
            height: '100%',
            width: '100%',
            flex: 1,
            backgroundColor: getColors().background,
            flexDirection: 'row',
        },
        textContainer: {
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-end',
        },
        innerBottomShadowLine: {
            backgroundColor: getColors().shadow,
            height: 8,
            width: '100%',
            alignSelf: 'flex-end',
        },
        innerLeftShadowLine: {
            backgroundColor: getColors().shadow,
            width: 8,
            height: '100%',
        },
        text: {
            color: 'black',
            width: '100%',
            height: '100%',
            textAlignVertical: 'center',
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'PressStart',
            position: 'absolute',
        },
    };

    return (
        <TouchableOpacity
            disabled={disabled}
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.blackLine} />
            <View style={styles.shadowLines}>
                <Text style={styles.text}>{title}</Text>

                <View style={styles.textContainer}>
                    <View style={styles.innerBottomShadowLine} />
                </View>
                <View style={styles.innerLeftShadowLine} />
            </View>
            <View style={styles.blackLine} />
        </TouchableOpacity>
    );
};

export default Button;
