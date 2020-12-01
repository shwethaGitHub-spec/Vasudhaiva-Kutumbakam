import React from 'react';
import {Text, View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import DonatorHeader from '../components/DonatorHeader';
import { RFValue } from 'react-native-responsive-fontsize'; 

export class DonatorsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            itemRequestedToDonate: "",
            itemRequestedToDonateName: "",
            IsRequestActive: "",
            requestId: "",
            requestStatus: "",
            docId: "",
            userDocId: ""
        }
    }

    getIsRequestActive = () => {
        db.collection("donators").where("email_id", "==", this.state.userId).onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    IsRequestActive: doc.data().IsRequestActive,
                    userDocId: doc.id
                })
            })
        })
    }

    addRequest = (itemRequestedToDonate) => {
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();

        db.collection('items_requested_to_donate').add({
            "user_id": userId,
            "item_requested_to_donate": itemRequestedToDonate,
            "request_id": randomRequestId,
            "request_status": "requested to donate"
        });

        db.collection("donators").where("email_id", "==", this.state.userId).get().then().then((snapshot) => {
            snapshot.forEach((doc) => {
                db.collection("donators").doc(doc.id).update({
                    IsRequestActive: true
                });
            });
        });

        this.setState({
            itemRequestedToDonate: ""
        });

        return Alert.alert("Requested to donate successfully");
    }

    createUniqueId = () => {
        return rand = Math.random().toString(36).substring(7);
    }

    getRequest = () => {
        db.collection("items_requested_to_donate").where("user_id", "==", this.state.userId).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.data().request_status !== "item requested to donate collected") {
                    this.setState({
                        requestId: doc.data().request_id,
                        itemRequestedToDonateName: doc.data().item_requested_to_donate,
                        requestStatus: doc.data().request_status,
                        docId: doc.id
                    });
                }
                console.log(doc.data());
            });
        });
    }

    sendNotification = () => {
        db.collection("donators").where("email_id", "==", this.state.userId).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var name = doc.data().first_name;
                var lastName = doc.data().last_name;

                db.collection("donators_notifications").where("request_id", "==", this.state.requestId).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        var charityWorkerId = doc.data().charity_worker_id;
                        var itemRequestedToDonate = doc.data().name_of_item_requested_to_donate;

                        db.collection("charity_workers_notifications").add({
                            "notification_status": "unread",
                            "item_requested_to_donate": itemRequestedToDonate,
                            "charity_worker_id": charityWorkerId,
                            "message": "The" + " " + itemRequestedToDonate + " " + "was collected from" + " " + name + " " + lastName
                        });
                    });
                });
            });
        });
    }

    updateRequestStatus = () => {
        db.collection("items_requested_to_donate").doc(this.state.docId).update({
            "request_status": "item requested to donate collected"
        });

        db.collection("donators").where("email_id", "==", this.state.userId).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                db.collection("donators").doc(doc.id).update({
                    "IsRequestActive": false
                });
            });
        });
    }

    allDonations = () => {
        db.collection("all_donations").add({
            "request_status": "item requested to donate collected",
            "user_id": this.state.userId,
            "request_id": this.state.requestId,
            "item_requested_to_donate": this.state.itemRequestedToDonateName
        });
    }

    componentDidMount() {
        this.getIsRequestActive();
        this.getRequest();
    }

    render() {
        if (this.state.IsRequestActive === true) {
            return (
                <View style={{flex: 1, backgroundColor: '#99f3bd', justifyContent: "center"}}>
                    <View style={{borderColor: 'orange', borderWidth: 2, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', textDecorationLine: 'underline'}}>Requested Thing Name</Text>
                        <Text>{this.state.itemRequestedToDonateName}</Text>
                    </View>

                    <View style={{borderColor: 'orange', borderWidth: 2, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', textDecorationLine: 'underline'}}>Requested Status</Text>
                        <Text>{this.state.requestStatus}</Text>
                    </View>

                    <TouchableOpacity 
                        style={{borderWidth: 1, borderColor: '#000', backgroundColor: '#ff9800', width: 300, alignItems: 'center', alignSelf: 'center', height: 30, marginTop: 30}}
                        onPress={() => {
                            this.sendNotification();
                            this.updateRequestStatus();
                            this.allDonations();
                        }}
                    >
                        <Text>Item requested to donate was collected</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1, backgroundColor: '#99f3bd'}}>
                    <DonatorHeader title="Request to donate" navigation={this.props.navigation}/>
    
                    <KeyboardAvoidingView style={styles.keyboardStyle}>
                        <View style={styles.textInputContainer}>
                            <TextInput 
                                placeholder="Enter the name of the item you are requesting to donate" 
                                style={styles.formTextInput}
                                onChangeText={e => {this.setState({itemRequestedToDonate: e})}}
                                value={this.state.itemRequestedToDonate}
                                multiline={true}
                                numberOfLines={2}
                            />
    
                            <TouchableOpacity style={styles.button} onPress={() => {this.addRequest(this.state.itemRequestedToDonate)}}>
                                <Text>Request to donate</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"96%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:RFValue(60),
      padding:10,
      backgroundColor: '#fff',
    },
    button:{
      width:"60%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    textInputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 100
    }
});

export default DonatorsScreen;