import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon} from 'react-native-elements';
import firebase from 'firebase';
import AppHeader  from '../component/Header';
import db from '../config';

export default class MyReceivedBookScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userID: firebase.auth().currentUser.email,
            receivedBooksList: []
        }
    }

    componentDidMount() {
        this.getReceivedBookList();
        console.log(this.state.receivedBooksList)
    }

    keyExtractor = (item,index) => index.toString();
    renderItem = ({item, i}) => {
        console.log(this.state.receivedBooksList);
        return(
            <ListItem 
            key= {i}
            title= {item.bookName}
            subtitle = {item.bookStatus}
            titleStyle= {{color: "#00000", fontWeight: "bold"}}
            bottomDivider
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <AppHeader 
                    navigation= {this.props.navigation}
                    title="All Received Books"
                />
                <View style={styles.container}>
                    {
                        this.state.receivedBooksList.length === 0 ? 
                        (
                            <View style={styles.subContainer}>
                                <Text style={{fontSize: 20}}>List of All Received Books</Text>
                            </View>
                        ) :
                        (
                            <FlatList
                                keyExtractor= {this.keyExtractor}
                                data= {this.state.receivedBooksList}
                                renderItem= {this.renderItem}
                            />         
                        )
                    }
                </View>
            </View>
        )
    }

    getReceivedBookList = async() => {
        await db.collection('received_books')
        .where("userID", "==", this.state.userID)
        .onSnapshot((snapshot) => {
            let receivedBooksList = snapshot.docs.map((doc) => {
                doc.data();
            });
    
            this.setState({
                receivedBooksList: receivedBooksList
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
})