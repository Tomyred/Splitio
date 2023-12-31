import { theme } from "../styles/theme";
import { normalize } from "react-native-elements";
import { Dimensions } from "react-native";

export function color(style) {
    const color = theme.colors[style];
    return color ? color : theme.colors["primaryText"];
}

export function fontSize(style) {
    const fontSize = theme.fontSizes[style];
    const pixels = fontSize ? fontSize : theme.fontSizes.sm;
    return normalize(pixels);
}

export const capitalize = (str, firstWord) => {
    if (!str) return "";
    if (str.length < 2) {
        return str.toUpperCase();
    } else {
        if (!firstWord) {
            let splitStr = str.split(" ");
            for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1).toLowerCase();
            }
            return splitStr.join(" ");
        } else return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
};

export const replaceSpace = (str) => {
    if (!str) return "";
    return str.replace(/ /g, "%20");
};

export const windowsWidthAppSize = (largeTabSize, medTabSize, phoneSize) => {
    const windowsWidth = Dimensions.get("window").width;
    if (windowsWidth > 765) {
        return largeTabSize;
    } else if (windowsWidth > 416 && windowsWidth < 764) {
        return medTabSize;
    } else if (windowsWidth < 415) {
        return phoneSize;
    }
};