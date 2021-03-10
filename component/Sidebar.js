import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';

export default class Sidebar extends React.Component{
    
    state = {
        userID: firebase.auth().currentUser.email,
        image: "",
        name: "",
        docID: ""
    }
    render() {
        return(
            <View style={styles.container}>
                <View
                    style={{
                        flex: 0.5,
                        alignItems: "center",
                        backgroundColor: "yellow",
                    }}
                    >
                    <Avatar
                        rounded
                        source={{
                        uri: this.state.image,
                        }}
                        size="medium"
                        onPress={() => this.selectPicture()}
                        containerStyle={styles.imageContainer}
                        showEditButton
                    />
                    <Text style={{ fontWeight: "100", fontSize: 20, paddingTop: 10 }}>
                        {this.state.name}
                    </Text>
                    </View>
                <View style={styles.drawerContainer}>
                    <DrawerItems
                        {...this.props}
                    />
                </View>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity
                    style={styles.logoutButton}
                    onPress= {() => {
                        this.props.navigation.navigate("WelcomeScreen");
                        firebase.auth().signOut();
                    }}
                    >
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

//image container
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerContainer: {
        flex: 0.8
    },
    logoutContainer: {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingBottom: 30
    },
    logoutButton: {
        width: "100%",
        height: 30,
        justifyContent: "center", 
        padding: 10
    },
})


