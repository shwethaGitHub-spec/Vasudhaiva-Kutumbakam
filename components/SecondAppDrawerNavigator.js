import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {FirstAppTabNavigator} from './FirstAppTabNavigator';
import SecondCustomSideBarMenu from './SecondCustomSideBarMenu';
import CharityWorkersSettingsScreen from '../screens/CharityWorkersSettingsScreen';
import MyAcceptedRequests from '../screens/MyAcceptedRequests';

export const SecondAppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: FirstAppTabNavigator
    },
    MyAcceptedRequests: {
        screen: MyAcceptedRequests
    },
    Settings: {
        screen: CharityWorkersSettingsScreen
    }
}, {contentComponent: SecondCustomSideBarMenu}, {initialRouteName : 'Home'});