import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import db from '../config';
import CharityWorkerHeader from '../components/CharityWorkerHeader';

export class CharityWorkersScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            itemsRequestedToBeDonatedList: []
        }

        this.requestRef = null;
    }

    getAllRequests = () => {
        this.requestRef = db.collection('items_requested_to_donate').onSnapshot((snapshot) => {
            var itemsRequestedToBeDonatedList = snapshot.docs.map((doc) => doc.data());
            this.setState({
                itemsRequestedToBeDonatedList: itemsRequestedToBeDonatedList
            });
        });
    }

    componentDidMount() {
        this.getAllRequests();
    }

    componentWillUnmount() {
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item, i}) => {
        return (
            <ListItem 
                key={i}
                title={item.item_requested_to_donate}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => {
                           this.props.navigation.navigate('DonatorDetails', {'details': item})
                        }}
                    >
                        <Text style={{color:'#ffff'}}>View</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        );
    }

    render(){
        return(
            <View style={{flex:1, backgroundColor: '#99f3bd'}}>
                <CharityWorkerHeader title="List of All Requests to Donate" navigation ={this.props.navigation}/>
                <View style={{flex:1}}>
                    {this.state.itemsRequestedToBeDonatedList.length === 0 ? (
                        <View style={styles.subContainer}>
                            <Text style={{ fontSize: 20}}>List Of All Items Requested To Be Donated</Text>
                        </View>
                    ):(
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.itemsRequestedToBeDonatedList}
                            renderItem={this.renderItem}
                        />
                    )}
                </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
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
       }
    }
});

export default CharityWorkersScreen;