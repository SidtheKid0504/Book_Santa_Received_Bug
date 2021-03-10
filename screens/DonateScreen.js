import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    Modal, 
    KeyboardAvoidingView,
    ScrollView,
    FlatList 
} from 'react-native';
import { ListItem } from 'react-native-elements';
import AppHeader  from "../component/Header";
import firebase from 'firebase';
import db from '../config';

export default class DonateScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            requestBookList: []
        }
        this.dbRef = null
    }
    keyExtractor = (item,index) => index.toString();
    renderItem = ({item, i}) => {
        return(
            <ListItem 
            key= {i}
            title= {item.bookName}
            subtitle = {item.reasonToRequest}
            titleStyle= {{color: "#00000", fontWeight: "bold"}}
            rightElement= {
                <TouchableOpacity
                    style={styles.button}
                    onPress= {() => {
                        this.props.navigation.navigate("RecieverScreen", {
                            details: item
                        });
                    }}
                >
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }

    componentDidMount() {
        this.getRequestedBookList()
    }
    
    render() {
        return(
            <View style={styles.container}>
                <AppHeader 
                    navigation= {this.props.navigation}
                    title="Donate Book"
                />
                <View style={styles.container}>
                    {
                        this.state.requestBookList.length === 0 ? 
                        (
                            <View style={styles.subContainer}>
                                <Text style={{fontSize: 24, fontWeight: "bold"}}>No Requested Books</Text>
                            </View>
                        )
                        :(
                            <FlatList
                                keyExtractor= {this.keyExtractor}
                                data= {this.state.requestBookList}
                                renderItem= {this.renderItem}

                            ></FlatList>
                        )
                    }
                </View>
                
            </View>
        )
    }
    
    getRequestedBookList = () => {
        this.dbRef = db.collection("requested_books")
        .where("bookStatus", "==", "requested")
        .onSnapshot((snapshot) => {
            var requestedBookList = snapshot.docs.map(document => document.data());
            this.setState({
                requestBookList: requestedBookList
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