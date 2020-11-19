import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, Image, Dimensions } from 'react-native';
import RegistrationAnimation from '../components/RegistrationAnimation';
import db from '../config'; 
import firebase from 'firebase';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: "",
            password: "",
            isDonatorSignUpModalVisible: false,
            isDonatorSignInModalVisible: false,
            isCharityWorkerSignUpModalVisible: false,
            isCharityWorkerSignInModalVisible: false,
            address: "",
            contact: "",
            firstName: "",
            lastName: "",
            confirmPassword: "",
            ngoAddress: ""
        }
    }

    donatorLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
            Alert.alert("Successfully Logged in");
            this.props.navigation.navigate('Donate');
        })
        .catch((error)=> {
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        });
    }

    donatorSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("Password doesn't match \n Check your password");
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(() => {
                Alert.alert('Successfully Signed Up');
                this.props.navigation.navigate('Donate');
            }).catch((error) => {
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            })
            
            db.collection('donators').add({
                address: this.state.address,
                contact: this.state.contact,
                email_id: this.state.emailId,
                first_name: this.state.firstName,
                last_name: this.state.lastName
            });
        }
    }

    charityWorkerLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
            Alert.alert("Successfully Logged in");
            this.props.navigation.navigate('Home');
        })
        .catch((error)=> {
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        });
    }

    charityWorkerSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return Alert.alert("Password doesn't match \n Check your password");
        } else {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(() => {
                Alert.alert('Successfully Signed Up');
                this.props.navigation.navigate('Home');
            }).catch((error) => {
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            })
            
            db.collection('charityWorkers').add({
                address: this.state.address,
                contact: this.state.contact,
                email_id: this.state.emailId,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                ngo_address: this.state.ngoAddress
            });
        }
    }

    showSignUpAsDonatorModal = () => {
        return (
            <Modal animationType="slide" transparent={true} visible={this.state.isDonatorSignUpModalVisible} presentationStyle="overFullScreen">   
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: "100%"}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView} behavior="padding" enabled >
                            <RegistrationAnimation />

                            <Text style={[styles.modalTitle, {marginTop: 25}]}>SIGN UP AS DONATOR</Text>

                            <TextInput 
                                style={styles.input}
                                placeholder={"First Name"}
                                maxLength={8}
                                onChangeText={e => {this.setState({firstName: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Last Name"}
                                maxLength={8}
                                onChangeText={e => {this.setState({lastName: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"abc@example.com"}
                                keyboardType={"email-address"}
                                onChangeText={e => {this.setState({emailId: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Address"}
                                multiline={true}
                                onChangeText={e => {this.setState({address: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Contact Number"}
                                maxLength={10}
                                keyboardType={"numeric"}
                                onChangeText={e => {this.setState({contact: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Password"}
                                secureTextEntry={true}
                                onChangeText={e => {this.setState({password: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Confirm Password"}
                                secureTextEntry={true}
                                onChangeText={e => {this.setState({confirmPassword: e})}}
                            />

                            <View style={styles.modalBackButton}>
                                <TouchableOpacity 
                                    style={[styles.button, {marginTop: 25}]}
                                    onPress={() => {this.donatorSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}}
                                >
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', margin: 30}}
                                    onPress={() => {this.setState({isDonatorSignUpModalVisible: false})}}
                                >
                                    <Text style={{color: '#000', fontWeight: '200', fontSize: 20}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );
    }

    showSignUpAsCharityWorkerModal = () => {
        return (
            <Modal animationType="slide" transparent={true} visible={this.state.isCharityWorkerSignUpModalVisible} presentationStyle="overFullScreen">   
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: "100%"}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView} behavior="padding" enabled >
                            <RegistrationAnimation />

                            <Text style={[styles.modalTitle, {marginTop: 25}]}>SIGN UP AS CHARITY WORKER</Text>

                            <TextInput 
                                style={styles.input}
                                placeholder={"First Name"}
                                maxLength={8}
                                onChangeText={e => {this.setState({firstName: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Last Name"}
                                maxLength={8}
                                onChangeText={e => {this.setState({lastName: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"abc@example.com"}
                                keyboardType={"email-address"}
                                onChangeText={e => {this.setState({emailId: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Address"}
                                multiline={true}
                                onChangeText={e => {this.setState({address: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Address of NGO you are working for"}
                                multiline={true}
                                onChangeText={e => {this.setState({ngoAddress: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Contact Number"}
                                maxLength={10}
                                keyboardType={"numeric"}
                                onChangeText={e => {this.setState({contact: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Password"}
                                secureTextEntry={true}
                                onChangeText={e => {this.setState({password: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Confirm Password"}
                                secureTextEntry={true}
                                onChangeText={e => {this.setState({confirmPassword: e})}}
                            />

                            <View style={styles.modalBackButton}>
                                <TouchableOpacity 
                                    style={[styles.button, {marginTop: 25}]}
                                    onPress={() => {this.charityWorkerSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}}
                                >
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', margin: 30}}
                                    onPress={() => {this.setState({isCharityWorkerSignUpModalVisible: false})}}
                                >
                                    <Text style={{color: '#000', fontWeight: '200', fontSize: 20}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );
    }

    showSignInAsDonatorModal = () => {
        return (
            <Modal animationType="slide" transparent={true} visible={this.state.isDonatorSignInModalVisible} presentationStyle="overFullScreen">   
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: "100%"}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView} behavior="padding" enabled >
                            <RegistrationAnimation />

                            <Text style={[styles.modalTitle, {marginTop: 25}]}>SIGN IN AS DONATOR</Text>

                            <TextInput 
                                style={styles.input}
                                placeholder={"abc@example.com"}
                                keyboardType={"email-address"}
                                onChangeText={e => {this.setState({emailId: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Password"}
                                secureTextEntry={true}
                                onChangeText={e => {this.setState({password: e})}}
                            />

                            <View style={styles.modalBackButton}>
                                <TouchableOpacity 
                                    style={[styles.button, {marginTop: 25}]}
                                    onPress={() => {this.donatorLogin(this.state.emailId, this.state.password, this.state.confirmPassword)}}
                                >
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', margin: 30}}
                                    onPress={() => {this.setState({isDonatorSignInModalVisible: false})}}
                                >
                                    <Text style={{color: '#000', fontWeight: '200', fontSize: 20}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );
    }

    showSignInAsCharityWorkerModal = () => {
        return (
            <Modal animationType="slide" transparent={true} visible={this.state.isCharityWorkerSignInModalVisible} presentationStyle="overFullScreen">   
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: "100%"}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView} behavior="padding" enabled >
                            <RegistrationAnimation />

                            <Text style={[styles.modalTitle, {marginTop: 25}]}>SIGN IN AS CHARITY WORKER</Text>

                            <TextInput 
                                style={styles.input}
                                placeholder={"abc@example.com"}
                                keyboardType={"email-address"}
                                onChangeText={e => {this.setState({emailId: e})}}
                            />

                            <TextInput 
                                style={styles.input}
                                placeholder={"Password"}
                                secureTextEntry={true}
                                onChangeText={e => {this.setState({password: e})}}
                            />

                            <View style={styles.modalBackButton}>
                                <TouchableOpacity 
                                    style={[styles.button, {marginTop: 25}]}
                                    onPress={() => {this.charityWorkerLogin(this.state.emailId, this.state.password, this.state.confirmPassword)}}
                                >
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', margin: 30}}
                                    onPress={() => {this.setState({isCharityWorkerSignInModalVisible: false})}}
                                >
                                    <Text style={{color: '#000', fontWeight: '200', fontSize: 20}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );
    }    

    render() {
        return (
            <View style={styles.container}>
                {console.log(this.state.isAppReady)}
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    {this.showSignInAsCharityWorkerModal()}
                    {this.showSignUpAsCharityWorkerModal()}
                    {this.showSignInAsDonatorModal()}
                    {this.showSignUpAsDonatorModal()}
                </View>

                <Image 
                    source={require('../assets/Logo.jpg')}
                    style={{height: imageHeight, width: imageWidth, position: 'absolute', top: 20, borderRadius: 400/2}}
                    resizeMethod="resize"
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => {this.setState({isDonatorSignInModalVisible: true})}} style={[styles.button, {marginBottom: 20, marginTop: 20}]}>
                        <Text style={styles.buttonText}>LOGIN AS DONATOR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.setState({isDonatorSignUpModalVisible: true})}} style={styles.button}>
                        <Text style={styles.buttonText}>SIGN UP AS DONATOR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.setState({isCharityWorkerSignInModalVisible: true})}} style={[styles.button, {marginBottom: 20, marginTop: 20}]}>
                        <Text style={styles.buttonText}>LOGIN AS CHARITY WORKER</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.setState({isCharityWorkerSignUpModalVisible: true})}} style={styles.button}>
                        <Text style={styles.buttonText}>SIGN UP AS CHARITY WORKER</Text>
                    </TouchableOpacity>                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#99f3bd'
    },
    input: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: 'black',
        fontSize: 20,
        padding: 10,
        margin: 10
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#ff7272',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 300
    },
    modalTitle: {
        justifyContent:'center',
        alignSelf: 'center',
        fontSize: 20,
        color: '#000',
        margin: 50
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginRight: 30,
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 40
    },
    KeyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});