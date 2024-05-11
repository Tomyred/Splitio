import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-view";
import AppNavigation from "./src/navigation/AppNavigator";
import { statusTheme } from "./src/styles/theme";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import PressStart from './assets/fonts/PressStart2P-Regular.ttf'
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [fontsLoaded] = useFonts({
        'PressStart': PressStart,
    });    

   useEffect(() => {
    if(fontsLoaded) SplashScreen.hideAsync();
   }, [fontsLoaded])
      
    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor={statusTheme.barBackground} barStyle={statusTheme.barStyle} />
            <AppNavigation />
        </SafeAreaProvider>
    );
}