import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {FirstAppTabNavigator} from './FirstAppTabNavigator';
import SecondCustomSideBarMenu from './SecondCustomSideBarMenu';
import CharityWorkersSettingsScreen from '../screens/CharityWorkersSettingsScreen';
import MyAcceptedRequests from '../screens/MyAcceptedRequests';
import CharityWorkersNotificationsScreen from '../screens/CharityWorkersNotificationsScreen';

export const SecondAppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: FirstAppTabNavigator
    },
    MyAcceptedRequests: {
        screen: MyAcceptedRequests
    },
    Notifications: {
        screen: CharityWorkersNotificationsScreen
    },
    Settings: {
        screen: CharityWorkersSettingsScreen
    }
}, {
    contentComponent: SecondCustomSideBarMenu
    }, {
        initialRouteName : 'Home'
    }
);