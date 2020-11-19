import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class DonatorDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            userName: "",
            donatorId: this.props.navigation.getParam("details")["user_id"],
            requestId: this.props.navigation.getParam("details")["request_id"],
            itemRequestedToDonate: this.props.navigation.g("details")["item_requested_to_donate"],
            donatorName: "",
            donatorContact: "",
            donatorAddress: "",
            donatorRequestDocId: "",
            nameOfItemRequestedToDonate: ""
        }
    }

    getDonatorDetails = () => {
        db.collection("users").where("email_id", "==", this.state.donatorId).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    donatorName: doc.data().first_name,
                    donatorContact: doc.data().contact,
                    donatorAddress: doc.data().address
                });
            });
        });

        db.collection("items_requested_to_donate").where("request_id", "==", this.state.requestId).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    donatorRequestDocId: doc.id,
                    nameOfItemRequestedToDonate: doc.data().item_requested_to_donate
                });
            });
        });
    }

    getUserDetails = () => {
        db.collection("charityWorkers").where("email_id", "==", this.state.userId).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    userName: doc.data().first_name + " " + doc.data().last_name
                });
            });
        });
    }

    updateRequestStatus = () => {
        db.collection("all_acceptedRequests").add({
            "item_requested_to_donate": this.state.itemRequestedToDonate,
            "request_id": this.state.requestId,
            "person_requesting_to_donate": this.state.donatorName,
            "charity_worker_id": this.state.userId,
            "request_status": "Charity Worker Interested"
        });
    }

    addNotification = () => {
        var message = this.state.userName + " has shown interest in taking the " + this.state.nameOfItemRequestedToDonate + " you requested to donate ";
        db.collection("all_notifications").add({
            "donator_id": this.state.donatorId,
            "charity_worker_id": this.state.userId,
            "request_id": this.state.requestId,
            "name_of_item_requested_to_donate": this.state.nameOfItemRequestedToDonate,
            "message": message,
            "notification_status": "unread",
            "date": firebase.firestore.FieldValue.serverTimestamp(),
        })
    }

    componentDidMount() {
        this.getDonatorDetails();
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Card title={"Information of item requested to be donated"}  titleStyle={{fontSize: 20}}>
                            <Card>
                                <Text style={{fontWeight: 'bold'}}>
                                    Name: {this.state.itemRequestedToDonate}
                                </Text>
                            </Card>
                        </Card>
                    </View>

                    <View>
                        <Card title = {'Information of the person who requested to donate'} titleStyle = {{fontSize: 20}}> 
                            <Card>
                                <Text style={{fontWeight: 'bold'}}>
                                    Name: {this.state.donatorName}
                                </Text>
                            </Card>

                            <Card>
                                <Text style={{fontWeight: 'bold'}}>
                                    Contact: {this.state.donatorContact}
                                </Text>
                            </Card>

                            <Card>
                                <Text style={{fontWeight: 'bold'}}>
                                    Address: {this.state.donatorAddress}
                                </Text>
                            </Card>
                        </Card>
                    </View>

                    <View style={styles.buttonContainer}>
                        {this.state.donatorId !== this.state.userId ? (
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={() => {
                                    this.updateRequestStatus();
                                    this.addNotification();
                                    this.props.navigation.navigate('MyAcceptedRequests');
                                }}
                            >
                                <Text>I accept his request to donate</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </View>
            </ScrollView>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    buttonContainer : {
        flex:0.3,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation : 16,
        marginTop: 55
    }
});