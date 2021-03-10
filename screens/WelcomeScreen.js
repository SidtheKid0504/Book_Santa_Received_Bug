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
    ScrollView 
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class WelcomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailID: "",
            password: "" ,
            phoneNum: "",
            address: "",
            confirmPassword: "",
            lastName: "",
            firstName: "",
            isModalVisible: false,
            isBookRequestValid: false,
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                </View>
                    {
                        this.showModal()
                    }
                    
                <View style={styles.profileContainer}>
                    <Text style={styles.titleText}>Book Santa</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TextInput
                        onChangeText={(text) => {
                            this.setState({
                                emailID: text
                            });
                        }}
                        placeholder="abc@123.com"
                        placeholderTextColor="#00008B"
                        style={styles.loginInput}
                        keyboardType="email-address"
                    />

                    <TextInput
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            });
                        }}
                        placeholder="Password"
                        placeholderTextColor="#00008B"
                        style={styles.loginInput}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress= {() => 
                            this.setState({
                                isModalVisible: true
                            })
                        }
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.login(this.state.emailID, this.state.password);
                        }}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    signUp = (email, password, confirm) => {
        if (password === confirm) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.collection("users").add({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    password: password,
                    email: email,
                    address: this.state.address,
                    phoneNum: this.state.phoneNum,
                    isBookRequestValid: false
                })
            })
        } else {
            return Alert.alert("Passwords Don't Match\n Check Your Password") 
        }
    }

    login = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            console.log('Login Worked')
           this.props.navigation.navigate("Donate")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return(Alert.alert(errorMessage));
        });
    }

    showModal = () => {
        // alert(this.state.isModalVisible)
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={{width:"100%"}}>
                        <KeyboardAvoidingView style={styles.keyBoardAvoidView}>
                            <Text style={styles.modalTitle}>Registration</Text>
                            <TextInput 
                                placeholder= {"First Name"}
                                maxLength= {8}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        firstName: text
                                    })
                                }}
                            />

                            <TextInput 
                                placeholder= {"Last Name"}
                                maxLength= {13}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        lastName: text
                                    })
                                }}
                            />

                            <TextInput 
                                placeholder= {"Address"}
                                multiline= {true}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        address: text
                                    })
                                }}
                            />

                            <TextInput 
                                placeholder= {"Phone Number"}
                                maxLength= {10}
                                keyboardType= {"numeric"}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        phoneNum: text
                                    })
                                }}
                            />

                            <TextInput 
                                placeholder= {"abc@123.com"}
                                keyboardType={"email-address"}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        emailID: text
                                    })
                                }}
                            />

                            <TextInput 
                                placeholder= {"Password"}
                                secureTextEntry= {true}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text
                                    })
                                }}
                            />

                            <TextInput 
                                placeholder= {"Confirm Password"}
                                secureTextEntry= {true}
                                style= {styles.registerTextInput}
                                onChangeText={(text) => {
                                    this.setState({
                                        confirmPassword: text
                                    })
                                }}
                            />
                            <View style= {styles.modalEnd}>
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() => {
                                        this.signUp(this.state.emailID, this.state.password, this.state.confirmPassword)
                                    }}
                                >   
                                    <Text style={styles.formButtonText}>Register</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style= {styles.cancelButton}
                                    onPress= {() => {
                                        this.setState({
                                            isModalVisible: "false"
                                        });
                                    }}
                                >
                                    <Text style={styles.formButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fed348',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 65,
        fontWeight: "300",
        color: '#291f00',
        paddingBottom: 30
    },
    loginInput: {
        width: 300,
        height: 50,
        borderColor: '#876600',
        backgroundColor: '#68ff7c',
        margin: 10,
        paddingLeft: 10,
        borderWidth: 2
    },
    button: {
        width: 300,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 25,
        margin: 10,
        backgroundColor: '#95e8ff'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
         borderRadius: 20,
         backgroundColor: "#ff9e9e",
         marginRight: 30,
         marginLeft: 30,
         marginTop: 80,
         marginBottom: 80
    },
    modalTitle: {
        justifyContent: "center",
        alignSelf: "center", 
        fontSize: 30,
        color: "#062926",
        margin: 50
    },
    keyBoardAvoidView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerTextInput: {
        width: "75%",
        height: 35,
        alignSelf: "center", 
        borderColor: "#012a42",
        borderWidth: 0.7,
        borderRadius: 10,
        marginTop: 20,
        padding: 10
    },
    registerButton: {
        width: 200,
        height: 40,
        alignItems: "center", 
        justifyContent: 'center',
        borderWidth: 1.5,
        borderRadius: 10,
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
    },
    cancelButton: {
        width: 200,
        height: 40,
        alignItems: "center", 
        justifyContent: 'center',
        borderWidth: 1.5,
        borderRadius: 10,
        marginTop: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
    },
    formButtonText: {
        alignSelf: "center",
    }
});
  