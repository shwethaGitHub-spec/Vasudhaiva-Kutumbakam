import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class MyAcceptedRequests extends React.Component {
    static navigationOptions = {header: null};

    constructor() {
        super();
        this.state = {
            charityWorkerId: firebase.auth().currentUser.email,
            charityWorkerName: "",
            allAcceptedRequests: []
        }

        this.requestRef = null;
    }

    getCharityWorkerDetails = () => {
        db.collection("charityWorkers").where("email_id", "==", this.state.charityWorkerId).onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    charityWorkerName: doc.data().first_name + " " + doc.data().last_name
                });
            });
        });
    }

    getAllAcceptedRequests = () => {
        this.requestRef = db.collection("all_acceptedRequests").where("charity_worker_id", '==', this.state.userId)
        .onSnapshot((snapshot) => {
            var allAcceptedRequests = snapshot.docs.map((doc) => doc.data());
            this.setState({
                allAcceptedRequests: allAcceptedRequests
            });
        });
    }

    collectItemRequestedToDonate = (itemRequestedToDonateDetails) => {
        if (itemRequestedToDonateDetails.request_status === "Requested Item Collected") {
            var requestStatus = "Charity Worker Interested";
            db.collection("all_acceptedRequests").doc(itemRequestedToDonateDetails.doc_id).update({
                request_status: "Charity Worker Interested"
            });

            this.sendNotification(itemRequestedToDonateDetails, requestStatus);
        } else {
            var requestStatus = "Requested Item Collected";
            db.collection("all_acceptedRequests").doc(itemRequestedToDonateDetails.doc_id).update({
                request_status: "Requested Item Collected"
            });

            this.sendNotification(itemRequestedToDonateDetails, requestStatus);
        }
    }

    sendNotification = (itemRequestedToDonateDetails, requestStatus) => {
        var requestId = itemRequestedToDonateDetails.request_id;
        var charityWorkerId = itemRequestedToDonateDetails.charity_worker_id;

        db.collection("all_notifications")
        .where("request_id", "==", requestId)
        .where("charity_worker_id", "==", charityWorkerId)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                var message = "";
                
                if (requestStatus === "Requested Item Collected") {
                    message = this.state.charityWorkerName + " has collected the item which you requested to donate";
                } else {
                    message = this.state.charityWorkerName + "has shown interest in collecting the item which you have requested to donate";
                }

                db.collection("all_notifications").doc(doc.id).update({
                    "message": message,
                    "notification_status": "unread",
                    "date": firebase.firestore.FieldValue.serverTimestamp()
                });
            });
        });
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>(
        <ListItem
            key={i}
            title={item.item_requested_to_donate}
            subtitle={"Requested to Donate By : " + item.person_requesting_to_donate +"\nStatus : " + item.request_status}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity 
                    style={[styles.button, {backgroundColor: item.request_status === "Requested Item Collected" ? "green" : "#ff5722"}]}
                    onPress={() => {this.collectItemRequestedToDonate(item)}}
                >
                    <Text style={{color:'#ffff'}}>
                        {item.request_status === "Requested Item Collected" ? "Requested Item Collected" : "Collect the Requested Item"}
                    </Text>
                </TouchableOpacity>
                }
            bottomDivider
        />
    );

    componentDidMount() {
        this.getAllAcceptedRequests();
    }

    componentWillUnmount() {
        this.requestRef;
    }

    render() {
        return (
            <View style={{flex:1}}>
                <MyHeader navigation={this.props.navigation} title="My Donations"/>

                <View style={{flex:1}}>
                    {this.state.allDonations.length !== 0 ? (
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allAcceptedRequests}
                            renderItem={this.renderItem}
                        />                        
                    ) : (
                        <View style={styles.subtitle}>                 
                            <Text style={{fontSize: 20}}>List of all accepted requests</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation : 16
    },
    subtitle :{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center'
    }
});