import { StatusBar } from "react-native";
import AppNavigation from "./src/navigation/AppNavigator";
import { statusTheme } from "./src/styles/theme";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import PressStart from './assets/fonts/PressStart2P-Regular.ttf'
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [fontsLoaded] = useFonts({
        'PressStart': PressStart,
    });    

   useEffect(() => {
    if(fontsLoaded) {
        setTimeout( () => {
            SplashScreen.hideAsync();
        }, 1000 )
    }
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