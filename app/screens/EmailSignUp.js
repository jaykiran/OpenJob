import React, { Component } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
import * as Segment from "expo-analytics-segment";
//import { Button } from "native-base";

class EmailSignUp extends Component{

  state = { displayName: '', email: '', password: '', errorMessage: '', loading: false };
  onLoginSuccess() {
    this.props.navigation.navigate('App');
  }

  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }

  async signInWithEmail() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
              this.onLoginFailure.bind(this)('Weak Password!');
          } else {
              this.onLoginFailure.bind(this)(errorMessage);
          }
      });
      Segment.identify(this.state.email);
      Segment.trackWithProperties("User SignIn", {
        accountType: "CustomEmailAuth",
        email:this.state.email
      });
   
  }

    render(){
        return(
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }}
            >
                <SafeAreaView style={{ flex: 1 }} >
                    <KeyboardAvoidingView style={styles.container} behavior="padding" >
                    <View style={styles.form}>
                    <Text style={{ fontSize: 32, fontWeight: "700", color: "black" }}>
                        SignUP
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#B1B1B1"
                        returnKeyType="next"
                        textContentType="name"
                        value={this.state.displayName}
                        onChangeText={displayName => this.setState({ displayName })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#B1B1B1"
                        returnKeyType="next"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#B1B1B1"
                        returnKeyType="done"
                        textContentType="newPassword"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                    {this.renderLoading()}
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: 'center',
                            color: 'red',
                            width: '80%'
                        }}
                    >
                    {this.state.error}
                    </Text>
                    <Button title="SignUp" style={{width:'30%', borderRadius: '10px', alignItems: "center", justifyContent: 'center' }} onPress={() => this.signInWithEmail()} />
                    <View style={{ marginTop: 10 }}>
                        <Text
                            style={{ fontWeight: "200", fontSize: 15, textAlign: "center" }}
                            onPress={() => {
                                this.props.navigation.navigate("SignIn");
                            }}
                        >
                        Already have an Account? SignIn
                        </Text>
                    </View>

                    </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "86%",
      marginTop: 15,
      flex: 1,
      justifyContent:"center",
      padding:10, 
    },
    logo: {
      marginTop: 20
    },
    input: {
      fontSize: 20,
      borderColor: "#707070",
      borderBottomWidth: 1,
      paddingBottom: 1.5,
      marginTop: 25.5
    },
    button: {
      backgroundColor: "#3A559F",
      height: 44,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 22
    },
  });

export default EmailSignUp;