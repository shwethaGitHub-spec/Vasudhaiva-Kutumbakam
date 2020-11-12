import React from 'react';
import LottieView from 'lottie-react-native';

export default class RegistrationAnimation extends React.Component {
    render() {
        return (
            <LottieView 
                source={require('../assets/13460-login.json')}
                style={{width: '60%'}}
                autoPlay
                loop
                speed={4}
            />
        );
    }
}