import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import{createBottomTabNavigator} from 'react-navigation-tabs';

import TransactionScreen  from "./screens/BookTransactionScreen";
import SearchScreen from "./screens/SearchScreen";

export default class App extends Component {

  render(){
    return (
      <AppContainer/>
    );
  }
  
}

const TabNavigator = createBottomTabNavigator({
  Transact:{screen:TransactionScreen},
  Search:{screen:SearchScreen}
})

const AppContainer = createAppContainer(TabNavigator)