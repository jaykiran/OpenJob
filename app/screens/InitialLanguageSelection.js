import React, { Component } from "react";
import { View, Image, StyleSheet, Text, Button, TouchableOpacity, Picker } from "react-native";

import colors from "../config/colors";

const onPressTitle = () => {
  console.log("Language Selected.(Dummy Msg)"); //using dummy word for to be implemented.
};

class InitialLanguageSelection extends Component {
  
  state = {
    launguage: '',  
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subheading}>Select Launguage</Text>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/language.png',
          }}
          style={styles.img}
        />
                <Picker
                    selectedValue={this.state.launguage}
                    onValueChange={launguage => this.setState({ launguage })}
                    style={{ width: 180, marginBottom: 30 }}
                    mode="dropdown">
                    <Picker.Item label="Select One" value="select" />
                    <Picker.Item label="English" value="english" />
                    <Picker.Item label="Hindi" value="hindi" />
                    <Picker.Item label="Telugu" value="telugu" />
                    <Picker.Item label="Marati" value="marati" />
                </Picker>
        <Button title="Next->" onPress={() => this.props.navigation.navigate("Initial") } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontSize: 60,
    fontWeight: "bold",
    margin: 40,
  },
  subheading: {
        fontSize: 25,
        fontWeight: "normal",
        margin: 10
  },
  img: { 
    width: 64,
    height: 64,
    marginTop: 30,
    marginBottom:30, 
  }
});

export default InitialLanguageSelection;
