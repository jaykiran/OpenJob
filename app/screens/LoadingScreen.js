import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  TextInput,
} from "react-native";
import firebase from "firebase";

class LoadingScreen extends Component{

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('App');
            } else{
                this.props.navigation.navigate('SignUp');
            }
        });
    }

    render(){
        return (
            <SafeAreaView style={styles.container}>
              <ActivityIndicator size="large" color="black" />
            </SafeAreaView>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
});

export default LoadingScreen;
