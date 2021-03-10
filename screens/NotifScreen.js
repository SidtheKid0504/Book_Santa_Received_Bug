import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon} from 'react-native-elements';

import AppHeader  from '../component/Header';
import SwipeFlatList from '../component/SwipeFlatList';
import firebase from 'firebase';
import db from '../config';

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: firebase.auth().currentUser.email,
            allNotifs: []
        }
    }

    keyExtractor = (item,index) => index.toString();
    renderItem = ({item, i}) => {
        return(
            <ListItem 
            key= {i}
            title= {item.bookName}
            subtitle = {"Message: " + item.message}
            titleStyle= {{color: "#00000", fontWeight: "bold"}}
            leftElement= {
                <Icon name='bell' type='feather' color='#696969' />
            }
            bottomDivider
            />
        )
    }
    

    componentDidMount() {
        this.getNotifications();
    }

    render() {
        return(
            <View style={styles.container}>
                <AppHeader
                    navigation= {this.props.navigation}
                    title= "Notifications"
                />
                <View style={styles.container}>
                    {
                        this.state.allNotifs.length === 0 ? (
                            <View style={styles.noNotifs}>
                                <Text style={{fontSize: 20}}>No New Notifications</Text>
                            </View>
                        )
                        : (
                            <SwipeFlatList allNotifs= {this.state.allNotifs}/>
                        )
                    }
                </View>
            </View>
            )
        }

    getNotifications = () => {
        db.collection('all_notifs').where("notifStatus", "==", "unread")
        .where("targetUserID", "==", this.state.userID)
        .onSnapshot((snapshot) => {
            let allNotifs = [];
            snapshot.docs.map((doc) => {
                let notification = doc.data();
                notification["docID"] = doc.id
                console.log(notification)
                allNotifs.push(notification);
            });
            this.setState({
                allNotifs: allNotifs
            })
            console.log(allNotifs)
        });
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    subContainer: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    noNotifs: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})