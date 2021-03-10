import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, TouchableHighlight } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ListItem, Icon } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class SwipeFlatList extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        console.log(this.props.allNotifs);
        this.state = {
            allNotifs: this.props.allNotifs
        }
    }

    onSwipeValueChange = swipeData => {
        var allNotifications = this.state.allNotifs;
        const { key, value } = swipeData;
        if (value < -Dimensions.get("window").width) {
          const newData = [...allNotifications];
          this.updateNotifRead(allNotifications[key]);
          newData.splice(key, 1);
          this.setState({ allNotifs: newData });
        }
      };
    
      updateNotifRead = notification => {
        db.collection("all_notifs")
          .doc(notification.docID)
          .update({
            notifStatus: "read"
          });
      };

    renderItem = (data) => (
        <Animated.View>
            <ListItem
                LeftElement={
                    <Icon
                        name="Book"
                        type="font-awesome"
                        color="yellow"
                    />
                }
                title={data.item.bookName}
                titleStyle={{ color: "#000000", fontWeight: "bold" }}
                subtitle={data.item.message}

                bottomDivider
            />
        </Animated.View>
    )

    renderHiddenItem = () => (
        <View
            style={styles.hiddenContainer}
        >
            <View
                style={[styles.alignItemStyle, styles.colorStyle]}
            >
                <Text
                    style={styles.hiddenText}
                >
                </Text>
            </View>
        </View>
    )

    render() {
        return (

            <View style={styles.container}>
                <SwipeListView
                    disableRightSwipe
                    data={this.state.allNotifs}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    rightOpenValue={-Dimensions.get("window").width}
                    previewRowKey={"0"}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onSwipeValueChange={this.onSwipeValueChange}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    hiddenContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 10,
        backgroundColor: "#add8e6"
    },
    alignItemsStyle: {
        alignItems: "center",
        bottom: 0,
        top: 0,
        justifyContent: "center",
        position: "absolute",
        width: 100
    },
    colorStyle: {
        backgroundColor: "#29b6f6",
        right: 0
    },
    hiddenText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "flex-start",
        textAlign: "center"
    }
})