import InstagramLogin from "react-native-instagram-login";

import Instagram from "react-native-instagram-login";
//import CookieManager from '@react-native-community/cookies';

const  signInWithInstagram = async() => {
    try {
      await Instagram.initializeAsync('1143280759361196');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const InstagramProfileData = await firebase.auth().signInWithCredential(credential);
        this.onLoginSuccess.bind(this);
      }
    } catch ({ message }) {
      alert(`Instagram Login Error: ${message}`);
    }
  }

export default signInWithInstagram;