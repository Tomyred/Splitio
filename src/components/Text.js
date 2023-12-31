import React from "react";
import { View, Text as ElementText } from "react-native";
import { color, fontSize } from "../utils/utils";

const Text = props => {
    const createText = prop => {
        return (
            <ElementText
                {...prop}
                style={{
                    color: prop.hexColor ? prop.hexColor : color(prop.textStyle),
                    fontSize: fontSize(prop.fontSize),
                    // fontFamily: prop.fontFamily ? prop.fontFamily : theme.fontFamilys.primary,
                    // fontWeight: prop.fontWeight ? prop.fontWeight : "normal",
                    lineHeight: fontSize(prop.fontSize) + 5,
                    ...prop.style,
                }}
                textBreakStrategy={props.textBreakStrategy}
                numberOfLines={prop.numberOfLines}
            >
                {prop.value}
                {prop.children ? createText(prop.children.props) : null}
            </ElementText>
        );
    };
    return <View>{createText(props)}</View>;
};

export default Text;