import React from 'react'
import LoginScreen from '../screens/LoginScreen'
import ClientListScreen from '../screens/ClientListScreen'

import { createStackNavigator, createAppContainer } from 'react-navigation'

const navStack = createStackNavigator({
  login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  clientList: {
    screen: ClientListScreen
  }
});

const Navigator = createAppContainer(navStack);

export default Navigator;