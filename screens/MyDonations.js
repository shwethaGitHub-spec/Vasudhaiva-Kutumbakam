import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native';
import firebase from 'firebase';
import DonatorHeader from '../components/DonatorHeader';
import { ListItem } from 'react-native-elements';
import db from '../config';

export default class MyDonations extends React.Component {
    constructor() {
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            donationsList: []
        }
        this.requestRef = null;
    }

    getDonationsList = () => {
        this.requestRef = db.collection("all_donations").where("user_id", "==", this.state.userId).where("request_status", "==", "item requested to donate collected").onSnapshot((snapshot) => {
            var donationsList = snapshot.docs.map((doc) => doc.data());
            this.setState({
                donationsList: donationsList
            });
        });
    }

    componentDidMount() {
        this.getDonationsList();
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item, index}) => {
        return (
            <ListItem 
                key={index}
                title={item.item_requested_to_donate}
                titleStyle={{color: 'black', fontWeight: 'bold'}}
                subtitle={item.request_status}
                bottomDivider
            />
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <DonatorHeader title="My Donations" navigation={this.props.navigation}/>
                <View style={{flex: 1}}>
                    {this.state.donationsList.length === 0 ? (
                        <View style={styles.subContainer}>
                            <Text style={{fontSize: 20}}>List of all donations</Text>
                        </View>
                    ):(
                        <FlatList 
                            keyExtractor={this.keyExtractor}
                            data={this.state.donationsList}
                            renderItem={this.renderItem}
                        />
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});