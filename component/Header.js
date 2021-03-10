import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';


export default class AppHeader extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    } 
    
    componentDidMount() {
        this.getNumofNotifs()
    }
    render() {
        return (
            <Header
              leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  
              onPress={() => this.props.navigation.toggleDrawer()}/>}
              centerComponent={{ text: this.props.title, style: { color: '#000000', fontSize:20,fontWeight:"bold", } }}
              rightComponent={<this.BellIconWithBadge {...this.props}/>}
              backgroundColor = "#fed348"
            />
        );
    }

    BellIconWithBadge= () =>{
        return(
          <View>
            <Icon name='bell' type='font-awesome' color='#696969' size={25}
              onPress={() =>this.props.navigation.navigate('Notifications')}/>
             <Badge
              value={this.state.value}
             containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
          </View>
        )
      }

    getNumofNotifs = () => {
        db.collection('all_notifs').where("notifStatus", "==", "unread")
        .onSnapshot((snapshot) => {
            let unreadNotifs = snapshot.docs.map((doc) => doc.data());
            this.setState({
                value: unreadNotifs.length
            })
        });
    }
};


