import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {createAppContainer, createSwitchNavigator} from "react-navigation";


//Screens
//import SignUpPage from "./app/screens/SignUpPage";
//import SignInPage from "./app/screens/SignInPage";
import AuthNavigator from "./app/config/AuthNavigator";
import InitialLanguageSelection from "./app/screens/InitialLanguageSelection";
import AppUserRoleSelection from "./app/screens/AppUserRoleSelection";
import ApplicantProfileDetails from "./app/screens/ApplicantProfileDetails";
import RecruiterProfileDetails from "./app/screens/RecruiterProfileDetails";
import ApplicantHelpSection from "./app/screens/ApplicantHelpSection";
//import LoadingScreen from "./app/screens/LoadingScreen";
import EmailSignUp from "./app/screens/EmailSignUp";
import PhoneSignUp from "./app/screens/PhoneSignUp";

//firebase
import * as firebase from "firebase";
import {firebaseConfig} from "./app/config/Configuration";
firebase.initializeApp(firebaseConfig);

export default createAppContainer(
  
  createSwitchNavigator(
    {
      Auth: AuthNavigator,
      App: ApplicantProfileDetails,
    },
    {
      initialRouteName: 'Auth'
    }
  )
);

/*
export default function App() {
  return (
    <AppNavigator />
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen : LoadingScreen,
  SignUpPage: SignUpPage,
  ApplicantProfileDetails: ApplicantProfileDetails,
  SignInPage: SignInPage,
  EmailSignUp: EmailSignUp,
  PhoneSignUp: PhoneSignUp
})

const AppNavigator = createAppContainer(AppSwitchNavigator)
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
