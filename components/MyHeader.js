import React from 'react';
import {Header, Icon} from 'react-native-elements';

const MyHeader = props => {
    return (
        <Header 
            centerComponent={{text: props.title, style: {color: '#f9fcfb', fontSize: 20, fontWeight: 'bold'}}}
            backgroundColor="#821752"
        />
    );
}

export default MyHeader;