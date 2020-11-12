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
            userId: firebase.auth().currentUser.email,
            allAcceptedRequests: []
        }

        this.requestRef = null;
    }

    getAllAcceptedRequests = () => {
        this.requestRef = db.collection("all_acceptedRequests").where("charity_worker_d", '==', this.state.userId)
        .onSnapshot((snapshot) => {
            var allAcceptedRequests = snapshot.docs.map((doc) => doc.data());
            this.setState({
                allAcceptedRequests: allAcceptedRequests
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
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:'#ffff'}}>Collect the thing</Text>
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