import React from 'react';
import { Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { StackNavigator } from './StackNavigator';
import DonateScreen from '../screens/DonateScreen';
import RequestScreen from '../screens/RequestScreen';

export const TabNavigator = createBottomTabNavigator({
    Donate: {
        screen: StackNavigator,
        navigationOptions: {
            tabBarIcon: <Image source={require("../assets/request-list.png")} style = {{width: 20, height: 20}}></Image>,
            tabBarLabel: "Donate Books"
        }
    },
    Request: {
        screen: RequestScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require("../assets/request-book.png")} style = {{width: 20, height: 20}}></Image>,
            tabBarLabel: "Request Books"
        }
    },
})