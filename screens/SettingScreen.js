import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import firebase from 'firebase';
import db from '../config';
import { Alert } from 'react-native';


export default class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      phoneNum: "",
      address: "",
      lastName: "",
      firstName: "",
      docID: ""
    }
  }
  componentDidMount() {
    this.getUserDetails();
  }
  render() {
    return(
        <View style={styles.container}>
          <Header title="Settings" navigation={this.props.navigation}/>
          <View style={styles.settingContainer}>
              <TextInput 
                placeholder= {"First Name"}
                maxLength= {8}
                style={styles.settingsInput}
                onChangeText= {(text) => {
                  this.setState({
                    firstName: text
                  })
                }}
                value = {this.state.firstName}
              />

            <TextInput 
                placeholder= {"Last Name"}
                maxLength= {13}
                style={styles.settingsInput}
                onChangeText= {(text) => {
                  this.setState({
                    lastName: text
                  })
                }}
                value={this.state.lastName}
              />
              <TextInput 
                placeholder= {"Phone Number"}
                maxLength= {10}
                keyboardType={"numeric"}
                style={styles.settingsInput}
                onChangeText= {(text) => {
                  this.setState({
                    phoneNum: text
                  })
                }}
                value={this.state.phoneNum}
              />
              <TextInput 
                placeholder= {"Address"}
                multiline={true}
                style={styles.settingsInput}
                onChangeText= {(text) => {
                  this.setState({
                    address: text
                  })
                }}
                value={this.state.address}
              />

              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => {
                  this.updateUserDetails();
                }}
              >
                <Text style={styles.settingButtonText}>Save Changes</Text>
              </TouchableOpacity>
          </View>
        </View>
    )
  }
  getUserDetails = () => {
    let user = firebase.auth().currentUser;
    let email = user.email
    db.collection("users").where("email", "==", email).get().
    then(snapshot => {
      snapshot.forEach(doc => {
        let data = doc.data();
        this.setState({
          emailID: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNum: data.phoneNum,
          docID: doc.id
        });
      });
    })
  }
  
  updateUserDetails = () => {
    db.collection("users").doc(this.state.docID).
    update({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNum: this.state.phoneNum
    });
    Alert.alert("Profile Updated");
    console.log("Profile Updated");
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    settingContainer: {
      flex: 1,
      alignItems: "center"
    },
    settingsInput: {
      width: "75%",
      height: 35,
      alignSelf: "center",
      borderRadius: 10,
      borderWidth: 1,
      marginTop: 20, 
      padding: 10,
      borderColor: "gray"
    },
    settingButton: {
      width: 300,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderRadius: 25,
      margin: 10,
      backgroundColor: '#95e8ff'
    },
    settingButtonText: {
      fontSize: 25, 
      fontWeight: "bold"
    }
});
