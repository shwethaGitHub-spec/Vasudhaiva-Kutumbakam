import React from 'react';
import LottieView from 'lottie-react-native';

export default class ThankyouAnimation extends React.Component {
    render() {
        return (
            <LottieView 
                source={require('../assets/11405-thank-you.json')}
                style={{width: '60%'}}
                autoPlay
                loop
            />
        );
    }
}