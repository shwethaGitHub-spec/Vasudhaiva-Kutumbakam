import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {FirstAppTabNavigator} from './FirstAppTabNavigator';
import FirstCustomSideBarMenu from './FirstCustomSideBarMenu';
import DonatorsSettingsScreen from '../screens/DonatorsSettingsScreen'

export const FirstAppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: FirstAppTabNavigator
    },
    Settings: {
        screen: DonatorsSettingsScreen
    }
}, {contentComponent: FirstCustomSideBarMenu}, {initialRouteName : 'Home'});