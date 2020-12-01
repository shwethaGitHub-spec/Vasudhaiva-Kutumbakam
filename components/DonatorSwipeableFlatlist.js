import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../config';

export default class DonatorSwipeableFlatlist extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            allNotifications: this.props.allNotifications
        }
    }

    updateMarkAsRead = (notification) => {
        db.collection("donators_notifications").doc(notification.doc_id).update({
            notification_status: "read"
        });
    }

    closeRow = (item, key) => {
        if (item[key]) {
            item[key].closeRow();
        }
    }

    deleteRow = (item, key) => {
        var allNotifications = this.state.allNotifications;
        this.closeRow(item, key);
        const newData = [...allNotifications];
        const prevIndex = allNotifications.findIndex(item => item.key === key);
        this.updateMarkAsRead(allNotifications[prevIndex]);
        newData.splice(prevIndex, 1);
        this.setState({allNotifications: newData})
    }

    onRowDidOpen = (key) => {
        console.log("This row is opened", key);
    }

    renderItem = (data) => {
        <TouchableHighlight>
            <ListItem 
                title={data.item.name_of_item_requested_to_donate}
                titleStyle={{color: 'black', fontWeight: 'bold'}}
                subtitle={data.item.message}
                bottomDivider
            />
        </TouchableHighlight>
    }

    renderHiddenItem = (data, item) => {
        <View style={styles.rowBack}>
            <Text>Left</Text>

            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={() => this.closeRow(item, data.item.key)}>
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => this.deleteRow(item, data.item.key)}>
                <Text style={styles.backTextWhite}>Mark as Read</Text>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <SwipeListView
                        data={this.state.allNotifications}
                        renderItem={this.renderItem}
                        renderHiddenItem={this.renderHiddenItem}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});