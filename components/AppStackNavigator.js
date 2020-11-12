import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import DonatorDetailsScreen from '../screens/DonatorDetailsScreen';
import CharityWorkersScreen from '../screens/CharityWorkersScreen';

export const AppStackNavigator = createStackNavigator({
    CharityWorkers: {
        screen: CharityWorkersScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    DonatorDetails: {
        screen: DonatorDetailsScreen,
        navigationOptions: {
            headerShown: false
        }
    }
}, {initialRouteName: "CharityWorkersScreen"});