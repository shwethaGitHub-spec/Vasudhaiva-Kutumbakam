import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class DonatorsSettingsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: "",
            firstName: "",
            lastName: "",
            address: "",
            contact: "",
            docId: "",
            email: firebase.auth().currentUser.email
        }

        console.log(this.state.emailId);
    }

    getUserDetails = () => {
        db.collection('donators').where('email_id', '==', this.state.email).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    emailId: doc.data().email_id,
                    firstName: doc.data().first_name,
                    lastName: doc.data().last_name,
                    address: doc.data().address,
                    contact: doc.data().contact,
                    docId: doc.id
                });

                console.log(data);
            });
        });
    }
    
    updateUserDetails = () => {
        db.collection('donators').doc(this.state.docId).update({
            "first_name": this.state.firstName,
            "last_name" : this.state.lastName,
            "address"   : this.state.address,
            "contact"   : this.state.contact
        });

        Alert.alert("Profile Updated Successfully");
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <TextInput 
                    style={styles.formTextInput}
                    placeholder={"First Name"}
                    maxLength={8}
                    onChangeText={(text) => {
                        this.setState({
                            firstName: text
                        });
                    }}
                    value={this.state.firstName}
                />

                <TextInput 
                    style={styles.formTextInput}
                    placeholder={"Last Name"}
                    maxLength={8}
                    onChangeText={(text) => {
                        this.setState({
                            lastName: text
                        });
                    }}
                    value={this.state.lastName}
                />

                <TextInput 
                    style={styles.formTextInput}
                    placeholder={"Contact"}
                    maxLength={8}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                        this.setState({
                            contact: text
                        });
                    }}
                    value={this.state.contact}
                />

                <TextInput 
                    style={styles.formTextInput}
                    placeholder={"Address"}
                    multiline={true}
                    onChangeText={(text) => {
                        this.setState({
                            address: text
                        });
                    }}
                    value={this.state.address}
                />

                <TextInput 
                    style={styles.formTextInput}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    onChangeText={(text) => {
                        this.setState({
                            emailId: text
                        });
                    }}
                    value={this.state.emailId}
                />

                <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.updateUserDetails();
                    }}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#99f3bd'
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center',
      backgroundColor: "#fff"
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
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
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
});