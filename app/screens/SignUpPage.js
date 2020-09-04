import React,{Component} from "react";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";

import 'firebase/firestore';
import firebase from 'firebase';
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

//import signInWithInstagram from "./InstaSignUp";


class SignUpPage extends Component{

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

  //instagram
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }
 
  setIgToken = (data) => {
    console.log('data', data)
    this.setState({ token: data.access_token })
  }
 
  onClear() {
    CookieManager.clearAll(true)
      .then((res) => {
        this.setState({ token: null })
      });
  }

  //signin with facebook
  async signInWithFacebook() {
    try {
      await Facebook.initializeAsync('242163740267904');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInWithCredential(credential);
        this.onLoginSuccess.bind(this);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  //google firebase login
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser)  => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function(result){
            
            console.log("user sign in");
        firebase
        .database()
        .ref('/users'+result.user.uid)
        .set({
            gmail:result.user.email,
            profile_picture:result.additionalUserInfo.profile.profile_picture,
            locale:result.additionalUserInfo.profile_picture.locale,
            first_name:result.additionalUserInfo.given_name,
            last_name:result.additionalUserInfo.first_name
        })
        .then(function(snapshot){

        });
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "562794673177-34k47eq84c3j9496ueoh660m2muatgbo.apps.googleusercontent.com",
        //iosClientId: IOSClientId,
        behavior: 'web',
        iosClientId: '', //enter ios client id
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
 
  render() {
    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.pageTitle}>SignUp</Text>

          <View style={styles.ImageContainer}>
            <TouchableOpacity onPress={() => this.signInWithGoogleAsync()}>
              <Image source={require('../assets/google.png')} style={styles.Images1} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.signInWithFacebook()}>
              <Image source={require('../assets/fb.png')} style={styles.Images1} />
            </TouchableOpacity>
          </View>
         
          <View style={styles.ImageContainer}>
            <TouchableOpacity  onPress={() => this.signInWithInstagram()}>
              <Image source={require('../assets/insta.png')} style={styles.Images2} />
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => alert('twitter')}>
              <Image source={require('../assets/twitter.png')} style={styles.Images2} />
            </TouchableOpacity> 
          </View>
        
          <View style={styles.ImageContainer}>
            <TouchableOpacity  onPress={() =>this.props.navigation.navigate('Phone')}>
              <Image source={require('../assets/Phone.png')} style={styles.Images3} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Email')}>
              <Image source={require('../assets/Mail.png')} style={styles.Images3} />
            </TouchableOpacity> 
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn') }>
            <Text style={styles.signInText}>Already Have an Account? SignIn</Text>
          </TouchableOpacity>
        </SafeAreaView>
    );
  }
}


export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ImageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Images1: {
    marginLeft:50,
    marginRight:50,
    marginTop:30,
  },
  Images2: {
    marginLeft:50,
    marginRight:50,
  },
  Images3: {
    marginLeft:50,
    marginRight:50,
  },
  pageTitle: {
    padding: Platform.OS === "android" ? 25 : 0, // hack for SafeAreaView on Android,use expo
    //relative positioning later
    fontStyle: "normal",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop:20,
    //flex: 1,
  },
  signInText: {
    textAlign: "center",
    marginBottom:80,
    //flex: 1,
  },
  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
});
