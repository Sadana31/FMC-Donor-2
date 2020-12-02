import * as React from 'react';
import {Header, Icon, Badge} from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config';
import * as firebase from 'firebase';

export default class MyHeader extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value: ""
        }
    }

    getNumberOfUnreadNotifications=()=>{
        db.collection('allNotifications')
        .where('notificationStatus','==','unread')
        .where('receiverID','==',firebase.auth().currentUser.email)
        .onSnapshot((snapshot)=>{
          var unreadNotifications = snapshot.docs.map(doc=>doc.data());
          this.setState({
            value : unreadNotifications.length
          });
        })
      }

      componentDidMount() {
        this.getNumberOfUnreadNotifications();
      }

      BellIconWithBadge=()=>{
        return (
          <View>
            <Icon name='bell' type='font-awesome' color='white' size={25} 
              onPress={()=>{
                this.props.navigation.navigate('Notifications');
              }
            }/>
            <Badge value={this.state.value} containerStyle={{
              position : 'absolute',
              top : -4,
              right : -4
            }}/>
          </View>
        )
      }

    render(){
        return (
            <Header 
                leftComponent={
                    <Icon name='bars' type='font-awesome' color='white' 
                    onPress={()=>{
                        this.props.navigation.toggleDrawer();
                        }
                    } />
                }
                centerComponent={{ 
                    text: this.props.text, 
                    style: { color: 'white', fontSize:20, fontWeight:"bold"} 
                }}
                rightComponent={
                    <this.BellIconWithBadge {...this.props}/>
                  }
                backgroundColor = "#0080ff"
                navigation={this.props.navigation}
        />
        )
    }
}