import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BillSplitter from '../screens/BillSplitter';
import Balance from '../screens/Balance';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName={"BillSplitter"}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="BillSplitter" component={BillSplitter} />
            <Stack.Screen name="Balance" component={Balance} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator