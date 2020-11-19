import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DonatorsScreen from '../screens/DonatorsScreen';
import DonatorsSettingsScreen from '../screens/DonatorsSettingsScreen';
import DonatorsNotificationsScreen from '../screens/DonatorsNotificationsScreen';

export const FirstAppTabNavigator = createBottomTabNavigator({
    Donate: {
        screen: DonatorsScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require('../assets/Donate.jpg')} style={{width: 20, height: 20}}/>,
            tabBarLabel: "Request to Donate"
        }
    },
    Settings: {
        screen: DonatorsSettingsScreen
    },
    Notifications: {
        screen: DonatorsNotificationsScreen
    }
});