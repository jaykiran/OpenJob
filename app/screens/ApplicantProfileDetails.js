//Gives option to choose between "Job Seeker" and "Recruiter"
//For time being it will be set for the user once selected.
// Ability to change role  can be added later. Need discussion.

import React, { Component } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Platform,
  TextInput,
} from "react-native";

import firebase from "firebase";

class ApplicantProfileDetails extends Component{
  state = { user: {} };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({user: user});
      }
    })
  }
  render(){
    return (
      <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text>{this.state.user.email}</Text>
            <Button style={styles.signInText} title="Log Off" onPress={() => {
              firebase.auth().signOut();
            /*  analytics.identify("test", {
                  email: "this.state.email"
                });*/
            }}/>
          </View>
        </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
  pageTitle: {
    padding: Platform.OS === "android" ? 25 : 0, // hack for SafeAreaView on Android,use expo
    //relative positioning later
    fontStyle: "normal",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    fontWeight: "bold",
    //flex: 1,
  },
  signInText: {
    textAlign: "center",
    //flex: 1,
  },
});

export default ApplicantProfileDetails;
