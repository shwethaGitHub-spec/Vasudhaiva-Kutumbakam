import React from 'react';
import { View } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class CharityWorkerHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            userId: firebase.auth().currentUser.email,
            value: ""
        }
    }

    BellIconWithBadge = () => {
        return (
            <View>
                <Icon 
                    name="bell" 
                    type="font-awesome" 
                    color="#696969" 
                    size={25} 
                    onPress={() => {this.props.navigation.navigate("CharityWorkersNotifications")}}
                />
    
                <Badge 
                    value="1"
                    containerStyle={{position: "absolute", top: -4, right: -4}}
                />
            </View>
        );       
    }

    getNumberOfUnreadNotifications = () => {
        db.collection("all_notifications").where("charity_worker_id", "==", this.state.userId).where("notification_status", "==", "unread").onSnapshot((snapshot) => {
            var unreadNotifications = snapshot.docs.map((doc) => doc.data());
            this.setState({
                unreadNotifications: unreadNotifications.length
            })
        });
    }

    componentDidMount() {
        this.getNumberOfUnreadNotifications();
    }

    render() {
        return (
            <View>
                <Header 
                    leftComponent={<Icon name="bars" type="font-awesome" color="#696969" onPress={() => {this.props.navigation.toggleDrawer()}}/>}
                    centerComponent={{text: this.props.title, style: {color: '#f9fcfb', fontSize: 20, fontWeight: 'bold'}}}
                    rightComponent={<this.BellIconWithBadge {...this.props} />}
                    backgroundColor="#821752"
                />
            </View>
        );
    }
}