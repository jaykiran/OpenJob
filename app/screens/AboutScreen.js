import React, { Component } from 'react';
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



class AboutScreen extends Component {
    render() {
        return (
            <SafeAreaView>
                <Text styles={styles.pageTitle}>About Open Job App</Text>
                <Text styles={styles.body}>
                    Open Job App is specially designed for Blue collar Workers. The sole
                    motive behind this open source project is to help blue collar workers to
                    find a job without charging any money and help them find way to live
                    their life with dignity.
                </Text>
            </SafeAreaView>
        );
    }
}

export default AboutScreen;


const styles = StyleSheet.create({
  pageTitle: {
    padding: Platform.OS === "android" ? 25 : 0, // hack for SafeAreaView on Android,use expo
    fontStyle: "normal",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    fontWeight: "bold",
    //flex: 1,
  },
  body: {
    margin: 0,
    flex: 1,
    padding: 24,
    fontStyle: "italic",
  },
});
