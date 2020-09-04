import React, { Component } from 'react';
import {View, Picker, StyleSheet, Text, Button} from 'react-native';


class InitialScreen extends Component {

    state = {
        Category: '',  
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.subheading}>Select your Category</Text>
                <Picker
                    selectedValue={this.state.Category}
                    onValueChange={Category => this.setState({ Category })}
                    style={{ width: 180, borderWidth: 10, marginBottom: 30 }}
                    mode="dropdown">
                    <Picker.Item label="Are you a?" value="select" />
                    <Picker.Item label="I'm a Recruiter" value="recruiter" />
                    <Picker.Item label="Job Seeker" value="seeker" />
                </Picker>
                <Button style={styles.nextbutton} title="Next->" onPress={() => this.props.navigation.navigate("SignUp") } />
            </View>
        );
    }
}

export default InitialScreen;

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
        margin: 20
    },
    nextbutton: {
        borderRadius: 20,
        width: 80
    }
});