import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {SecondAppTabNavigator} from './SecondAppTabNavigator';
import SecondCustomSideBarMenu from './SecondCustomSideBarMenu';
import CharityWorkersSettingsScreen from '../screens/CharityWorkersSettingsScreen';
import MyAcceptedRequests from '../screens/MyAcceptedRequests';
import CharityWorkersNotificationsScreen from '../screens/CharityWorkersNotificationsScreen';
import { Image } from 'react-native';
import {Icon} from 'react-native-elements';

export const SecondAppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: SecondAppTabNavigator,
        navigationOptions: {
            drawerIcon: <Icon name="home" type="fontawesome5"/>
        }
    },
    MyAcceptedRequests: {
        screen: MyAcceptedRequests,
        navigationOptions: {
            drawerIcon: <Image source={require("../assets/AcceptedRequest.png")} size={{width: 10, height: 10}}/>,
            drawerLabel: "My Accepted Requests"
        }
    },
    Notifications: {
        screen: CharityWorkersNotificationsScreen,
        navigationOptions: {
            drawerIcon: <Icon name="folder" type="font-awesome"/>,
            drawerLabel: "Notifications"
        }
    },
    Settings: {
        screen: CharityWorkersSettingsScreen,
        navigationOptions: {
            drawerIcon: <Icon name="gears" type="font-awesome" color="#000"/>,
            drawerLabel: "Settings"
        }
    }
}, {
    contentComponent: SecondCustomSideBarMenu
    }, {
        initialRouteName : 'Home'
    }
);