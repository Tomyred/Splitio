import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import BillSplitter from '../screens/BillSplitter';
import Balance from '../screens/Balance';

const Stack = createStackNavigator();

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