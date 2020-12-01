import React from 'react';
import {Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import CharityWorkerHeader from '../components/CharityWorkerHeader';
import CharityWorkerSwipeableFlatlist from '../components/CharityWorkerSwipeableFlatlist';
import firebase from 'firebase';
import db from '../config';

export class CharityWorkersNotificationsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            allNotifications: []
        }

        this.notificationRef = null;
    }

    getNotifications = () => {
        this.notificationRef = db.collection("charity_workers_notifications").where("charity_worker_id", "==", this.state.userId).where("notification_status", "==", "unread").onSnapshot((snapshot) => {
            var allNotifications = [];
            snapshot.docs.map((doc) => {
                var notification = doc.data();
                notification["doc_id"] = doc.id;
                allNotifications.push(notification);
            });

            this.setState({
                allNotifications: allNotifications
            })
        });
    }

    componentDidMount() {
        this.getNotifications();
    }

    componentWillUnmount() {
        this.notificationRef();
    }

    keyExtractor = (item, index) => index.toString();
    
    renderItem = ({item, index}) => {
        return (
            <ListItem 
                key={index}
                title={item.name_of_the_item_requested_to_donate}
                titleStyle={{color: "#000", fontWeight: "bold"}}
                subtitle={item.message}
                bottomDivider
            />
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.1}}>
                    <CharityWorkerHeader title="Notifications" navigation={this.props.navigation}/>
                </View>

                <View style={{flex: 0.9}}>
                    {this.state.allNotifications.length !== 0 ? (
                        <CharityWorkerSwipeableFlatlist allNotifications={this.state.allNotifications}/>
                    ):(
                        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
                            <Text style={{fontSize: 25}}>You have no notifications</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

export default CharityWorkersNotificationsScreen;