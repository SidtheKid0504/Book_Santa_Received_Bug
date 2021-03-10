import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Icon} from 'react-native-elements';
import firebase from 'firebase';
import AppHeader  from '../component/Header'
import db from '../config';


export default class MyDonationsScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            userID: firebase.auth().currentUser.email,
            donorName: "",
            allDonations: []
        }
        this.dbRef = null
    }
    keyExtractor = (item,index) => index.toString();
    renderItem = ({item, i}) => {
        return(
            <ListItem 
            key= {i}
            title= {item.bookName}
            subtitle = {"Requested By: " + item.requestedBy + "\n Status: " + item.requestStatus}
            titleStyle= {{color: "#00000", fontWeight: "bold"}}
            leftElement= {
                <Icon name='book' type='feather' color='#696969' />
            }
            rightElement= {
                <TouchableOpacity
                    style={styles.button}
                    onPress= {() => {
                        this.bookSent(item)
                    }}
                >
                    <Text style={styles.buttonText}>Send Book</Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }
    componentDidMount() {
        this.getAllDonations();
        this.getDonorDetails(this.state.userID);
    }
    render() {
        return(
        <View style={styles.container}>
            <AppHeader
                navigation= {this.props.navigation}
                title= "My Donations"
            />
            <View style={styles.container}>
                {
                    this.state.allDonations.length === 0 ? (
                        <View style={styles.noDono}>
                            <Text style={{fontSize: 20}}>No Donated Books</Text>
                        </View>
                    )
                    : (
                        <FlatList
                            keyExtractor= {this.keyExtractor}
                            data= {this.state.allDonations}
                            renderItem= {this.renderItem}
                        >

                        </FlatList>
                    )
                }
            </View>
        </View>
        )
    }

    getAllDonations = () => {
        this.dbRef = db.collection('book_donations').where('donorID', '==', this.state.userID).
        onSnapshot((snapshot) => {
            let allDonations = []
            snapshot.docs.map((doc) => {
                let donationData = doc.data();
                donationData["docID"] = doc.id
                allDonations.push(donationData);
            });
            this.setState({
                allDonations: allDonations
            })
        });
    }

    bookSent = (bookDetails) => {
        if (bookDetails.requestStatus === "Donor Interested") {
            let requestStatus = "Book Sent";
            db.collection("book_donations").doc(bookDetails.docID).update({
                requestStatus: requestStatus
            });
            this.sendNotification(bookDetails, requestStatus)
        } else {
            let requestStatus = "Donor Interested";
            db.collection("book_donations").doc(bookDetails.docID).update({
                requestStatus: requestStatus
            });
            this.sendNotification(bookDetails, requestStatus)
        }
    }

    getDonorDetails = (donorID) => {
        db.collection('users').where("email", "==", donorID).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    donorName: doc.data().firstName + " " + doc.data().lastName
                })
            })
        });
    }

    sendNotification = (bookDetails, requestStatus) => {
        let requestID = bookDetails.requestID;
        let donorID = bookDetails.donorID;
        db.collection('all_notifs').where("requestID", "==", requestID)
        .where("donorID", "==", donorID).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                let message = "";
                if (requestStatus === "Book Sent") {
                    message = "User Has Sent Your Requested Book: " + this.state.donorName
                } else {
                    message = "This User Has Shown Interest in Donating A Book:" + this.state.donorName
                }
                db.collection("all_notifs").doc(doc.id).update({
                    message: message,
                    notifStatus: "unread",
                    dateofNotif: firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
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
    noDono: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }, 
    button: {
        width: 100,
        height: 30,
        alignItems: "center", 
        justifyContent: 'center',
        backgroundColor:"#ffffe0",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16
    },
    buttonText: {
        color: "black"
    }
})