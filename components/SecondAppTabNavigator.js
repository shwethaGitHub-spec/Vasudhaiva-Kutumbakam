import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import CharityWorkersScreen from '../screens/CharityWorkersScreen';
import CharityWorkersSettingsScreen from '../screens/CharityWorkersSettingsScreen';
import CharityWorkersNotificationsScreens from '../screens/CharityWorkersNotificationsScreen';

export const SecondAppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: CharityWorkersScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require('../assets/Home.png')} style={{width: 20, height: 20}}/>,
            tabBarLabel: "Home"
        }
    }
});