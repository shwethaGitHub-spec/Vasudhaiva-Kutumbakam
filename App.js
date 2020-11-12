import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import {FirstAppTabNavigator} from './components/FirstAppTabNavigator';
import {SecondAppTabNavigator} from './components/SecondAppTabNavigator';
import {FirstAppDrawerNavigator} from './components/FirstAppDrawerNavigator';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const switchNavigator = createSwitchNavigator({
  LoginScreen: {screen: LoginScreen},
  FirstBottomTab: {screen: FirstAppTabNavigator},
  SecondBottomTab: {screen: SecondAppTabNavigator},
  FirstDrawer: {screen: FirstAppDrawerNavigator}
});

const AppContainer = createAppContainer(switchNavigator);