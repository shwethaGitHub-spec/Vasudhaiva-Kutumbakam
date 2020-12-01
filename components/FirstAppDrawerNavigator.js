import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {FirstAppTabNavigator} from './FirstAppTabNavigator';
import FirstCustomSideBarMenu from './FirstCustomSideBarMenu';
import DonatorsSettingsScreen from '../screens/DonatorsSettingsScreen';
import DonatorsNotificationsScreen from '../screens/DonatorsNotificationsScreen';
import MyDonations from '../screens/MyDonations';
import { Icon } from 'react-native-elements';
import { Image } from 'react-native';

export const FirstAppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: FirstAppTabNavigator,
        navigationOptions: {
            drawerIcon: <Icon name="home" type="fontawesome5"/>
        }
    },
    DonatorsNotifications: {
        screen: DonatorsNotificationsScreen,
        navigationOptions: {
            drawerIcon: <Icon name="folder" type="font-awesome"/>,
            drawerLabel: "Notifications"
        }
    },
    DonatorsSettings: {
        screen: DonatorsSettingsScreen,
        navigationOptions: {
            drawerIcon: <Icon name="gears" type="font-awesome" color="#000"/>,
            drawerLabel: "Settings"
        }
    },
    MyDonations: {
        screen: MyDonations,
        navigationOptions: {
            drawerLabel: "My Donations"
        }
    }
}, 
    {
        contentComponent: FirstCustomSideBarMenu
    }, {
        initialRouteName : 'Home'
    }
);