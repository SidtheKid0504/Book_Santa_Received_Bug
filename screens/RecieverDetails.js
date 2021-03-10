import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';



export default class RecieverDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userID: firebase.auth().currentUser.email,
            userName: "",
            receiverID: this.props.navigation.getParam("details")["userID"],
            requestID: this.props.navigation.getParam("details")["requestID"],
            bookName: this.props.navigation.getParam("details")["bookName"],
            reasonToRequest: this.props.navigation.getParam("details")["reasonToRequest"],
            receiverName: "",
            receiverContact: "",
            receiverAddress: "",
            receiverRequestDocID: ""
        }
    }

    componentDidMount() {
        this.getReceiverDetails();
        this.getCurrentUserDetails(this.state.userID);
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={{flex: 0.1}}>
                    <Header
                        leftComponent= {
                            <Icon name='arrow-left' type='feather' color='#696969' onPress={() => this.props.navigation.goBack()}/>
                        }
                        centerComponent= {
                            {text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold"}}
                        }
                        backgroundColor="#012a42"
                    />
                </View>
                <View style={{flex:0.3}}>
                        <Card
                            title= {"Book Information"}
                            titleStyle= {{fontSize: 20}}
                        >
                            <Card>
                                <Text style={{fontWeight: "bold"}}>Name: {this.state.bookName}</Text>
                            </Card>

                            <Card>
                                <Text style={{fontWeight: "bold"}}>Reason For Request: {this.state.reasonToRequest}</Text>
                            </Card>
                        </Card>
                </View>
                <View style={{flex: 0.3}}>
                    <Card
                        title= {"Receiver Information"}
                        titleStyle= {{fontSize: 20}}
                    >
                        <Card>
                            <Text style={{fontWeight: "bold"}}>Receiver Name: {this.state.receiverName}</Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: "bold"}}>Receiver Contact: {this.state.receiverContact}</Text>
                        </Card>

                        <Card>
                            <Text style={{fontWeight: "bold"}}>Receiver Address: {this.state.receiverAddress}</Text>
                        </Card>
                    </Card>
                </View>
                <View style={styles.buttonContainer}>
                      
                        {
                            this.state.userID != this.state.receiverID ?
                            (<TouchableOpacity
                                style= {styles.button}
                                onPress = {() => {
                                    this.props.navigation.navigate("My_Donations");
                                    this.updateBookStatus();
                                    this.addNotif();
                                }}
                            >
                                <Text>I Want to Donate</Text>
                            </TouchableOpacity>)
                            : console.log("Can't Donate to Yourself")
                        }
                </View>
            </View>
        )
    }

    updateBookStatus = () => {
        db.collection('book_donations').add({
            bookName: this.state.bookName, 
            requestID: this.state.requestID,
            requestedBy: this.state.receiverName,
            donorID: this.state.userID,
            requestStatus: "Donor Interested"
        })
    }

    getReceiverDetails() {
        db.collection('users').where("email", "==", this.state.receiverID).get().
        then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    receiverName: doc.data().firstName,
                    receiverContact: doc.data().phoneNum,
                    receiverAddress: doc.data().address,
                })
            })
        })
    }

    getCurrentUserDetails = (userID) => {
        db.collection('users').where("email", "==", userID).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    userName: doc.data().firstName + " " + doc.data().lastName
                })
            })
        });
    }
    
    addNotif = () => {
        let message =  "This User Has Shown Interest in Donating A Book: "+ this.state.userName
        db.collection('all_notifs').add({
            targetUserID: this.state.receiverID,
            donorID: this.state.userID,
            requestID: this.state.requestID,
            bookName: this.state.bookName, 
            dateofNotif: firebase.firestore.FieldValue.serverTimestamp(),
            message: message
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        width: 200,
        height: 30,
        alignItems: "center", 
        justifyContent: 'center',
        backgroundColor:"#90A5A9",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16
    }
})