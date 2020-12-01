import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator';

export const SecondAppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarIcon: <Image source={require('../assets/Home.png')} style={{width: 20, height: 20}}/>,
            tabBarLabel: "Home"
        }
    }
});