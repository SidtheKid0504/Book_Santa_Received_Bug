import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import RecieverDetails from '../screens/RecieverDetails';
import DonateScreen from '../screens/DonateScreen';

export const StackNavigator = createStackNavigator({
    DonateList: {
        screen: DonateScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    RecieverScreen: {
        screen: RecieverDetails,
        navigationOptions: {
            headerShown: false
        }
    }
},
{
    initialRouteName: "DonateList"
}
);
