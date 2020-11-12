import React from 'react';
import {Text, View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import ThankyouAnimation from '../components/ThankyouAnimation';

export class DonatorsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            itemRequestedToDonate: ""
        }
    }

    addRequest = (itemRequestedToDonate) => {
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();

        db.collection('items_requested_to_donate').add({
            "user_id": userId,
            "item_requested_to_donate": itemRequestedToDonate,
            "request_id": randomRequestId
        });

        this.setState({
            itemRequestedToDonate: ""
        });

        return Alert.alert("Requested to donate successfully");
    }

    createUniqueId = () => {
        return rand = Math.random().toString(36).substring(7);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#99f3bd'}}>
                <MyHeader title="Request to donate"/>

                <KeyboardAvoidingView style={styles.keyboardStyle}>
                    <View style={styles.textInputContainer}>
                        <TextInput 
                            placeholder="Enter the name of the item you are requesting to donate" 
                            style={styles.formTextInput}
                            onChangeText={e => {this.setState({itemRequestedToDonate: e})}}
                            value={this.state.itemRequestedToDonate}
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

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"90%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
      backgroundColor: '#fff'
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