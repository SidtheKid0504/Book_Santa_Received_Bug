import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from "./screens/WelcomeScreen";
import { DrawerNavigator } from "./component/DrawNavigator";
import { TabNavigator } from './component/BottomTab';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

export default class App extends React.Component {
  render() {
    return(
      <AppContainer />
    )
  }
}

const switchNavigator =  createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  Drawer: {screen: DrawerNavigator},
  BottomTab: {screen: TabNavigator}
});

const AppContainer = createAppContainer(switchNavigator)