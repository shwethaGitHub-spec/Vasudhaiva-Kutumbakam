import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {FirstAppTabNavigator} from './FirstAppTabNavigator';
import FirstCustomSideBarMenu from './FirstCustomSideBarMenu';
import DonatorsSettingsScreen from '../screens/DonatorsSettingsScreen';
import DonatorsNotificationsScreen from '../screens/DonatorsNotificationsScreen';

export const FirstAppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: FirstAppTabNavigator
    },
    Notifications: {
        screen: DonatorsNotificationsScreen,
    },
    Settings: {
        screen: DonatorsSettingsScreen
    }
}, 
    {
        contentComponent: FirstCustomSideBarMenu
    }, {
        initialRouteName : 'Home'
    }
);