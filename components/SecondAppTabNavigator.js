import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import CharityWorkersScreen from '../screens/CharityWorkersScreen';

export const SecondAppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: CharityWorkersScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require('../assets/Home.png')} style={{width: 20, height: 20}}/>,
            tabBarLabel: "Request to Donate"
        }
    }
});