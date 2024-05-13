import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { color as c, fontSize as f } from "../utils/utils";

const IconButton = props => {
    const { iconName, onPress, color, fontSize } = props;
    return (
        <TouchableOpacity {...props} onPress={onPress}>
            <FontAwesome5 name={iconName} color={c(color)} size={f(fontSize)} />
        </TouchableOpacity>
    );
};

export default IconButton;