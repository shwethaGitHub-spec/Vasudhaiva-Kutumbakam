import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DonatorsScreen from '../screens/DonatorsScreen';
import DonatorsNotificationsScreen from '../screens/DonatorsNotificationsScreen';
import DonatorsSettingsScreen from '../screens/DonatorsSettingsScreen';

export const FirstAppTabNavigator = createBottomTabNavigator({
    Donate: {
        screen: DonatorsScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require('../assets/Donate.jpg')} style={{width: 20, height: 20}}/>,
            tabBarLabel: "Request to Donate"
        }
    },
    Notifications: {
        screen: DonatorsNotificationsScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require('../assets/Notifications.png')} style={{width: 20, height: 20}}/>,
            tabBarLabel: "Notifications"
        }
    },
    Settings: {
        screen: DonatorsSettingsScreen
    }
});