import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { Card } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import ParticlesBg from "particles-bg";
import bg from "../assets/bg.webp";
import * as Animatable from "react-native-animatable";
import OnboardingAnimate from "react-native-onboarding-animate";

export default class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pwd: "",
      confirmpwd: "",
      name: "",
      bio: "",
      contactNo: "",
      country: "",
      secureTextEntry: true,
    };
  }

  signup = (email, pwd, confirmpwd) => {
    if (
      this.state.name &&
      this.state.contactNo &&
      this.state.country &&
      this.state.bio
    ) {
      if (pwd === confirmpwd) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, pwd)
          .then((response) => {
            alert("User added successfully!");
            var user = response.user;

            db.collection("counselorAccounts").add({
              email: email,
              name: this.state.name,
              bio: this.state.bio,
              contactNo: this.state.contactNo,
              country: this.state.country,
              image:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            });

            this.props.navigation.navigate("Dashboard");
            alert(
              "Welcome to the counselor version of I-Matter! Please fill out your bio on the profile page before you begin to recieve requests."
            );
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage);
          });
      } else {
        alert("Password does not match!");
      }
    } else {
      alert("Please fill all the details!");
    }
  };

  changeSecureText = () => {
    this.setState({ secureTextEntry: !this.state.secureTextEntry });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <ImageBackground source={bg} style={styles.container}>
            <ScrollView>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontFamily: "Times New Roman",
                  marginTop: 40,
                  color: "black",
                }}
              >
                Sign Up
              </Text>

              <View style={styles.footer}>
                <Animatable.View animation="fadeInUpBig">
                  <Text
                    style={{ color: "#ffa585", fontSize: 18, marginLeft: 10 }}
                  >
                    Name
                  </Text>
                  <View style={styles.textInput2}>
                    <AntDesign name="user" size={24} color="#ffa585" />
                    <TextInput
                      style={{
                        paddingLeft: 10,
                        width: "90%",
                        fontFamily: "Times New Roman",
                      }}
                      placeholder="Your name"
                      placeholderTextColor="grey"
                      onChangeText={(val) => {
                        this.setState({ name: val });
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      color: "#ffa585",
                      fontSize: 18,
                      marginLeft: 10,
                      marginTop: 20,
                    }}
                  >
                    Phone Number
                  </Text>
                  <View style={styles.textInput2}>
                    <AntDesign name="phone" size={24} color="#ffa585" />
                    <TextInput
                      style={{
                        paddingLeft: 10,
                        width: "90%",
                        fontFamily: "Times New Roman",
                      }}
                      placeholder="+1 123 456 7890"
                      placeholderTextColor="grey"
                      onChangeText={(val) => {
                        this.setState({ contactNo: val });
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      color: "#ffa585",
                      fontSize: 18,
                      marginLeft: 10,
                      marginTop: 20,
                    }}
                  >
                    Country
                  </Text>
                  <View style={styles.textInput2}>
                    <AntDesign name="enviromento" size={24} color="#ffa585" />
                    <TextInput
                      style={{
                        paddingLeft: 10,
                        width: "90%",
                        fontFamily: "Times New Roman",
                      }}
                      placeholder="Your country"
                      placeholderTextColor="grey"
                      onChangeText={(val) => {
                        this.setState({ country: val });
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      color: "#ffa585",
                      fontSize: 18,
                      marginLeft: 10,
                      marginTop: 20,
                    }}
                  >
                    E-MAIL
                  </Text>

                  <View style={styles.textInput}>
                    <AntDesign name="mail" size={23} color="#ffa585" />
                    <TextInput
                      placeholder="Your email"
                      placeholderTextColor="grey"
                      style={{ paddingLeft: 10, fontFamily: "Times New Roman" }}
                      onChangeText={(val) => {
                        this.setState({ email: val });
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      color: "#ffa585",
                      fontSize: 18,
                      marginLeft: 10,
                      marginTop: 20,
                    }}
                  >
                    Password
                  </Text>

                  <View style={styles.textInput2}>
                    <AntDesign name="lock" size={24} color="#ffa585" />
                    <TextInput
                      style={{
                        paddingLeft: 10,
                        width: "80%",
                        fontFamily: "Times New Roman",
                      }}
                      placeholder="Your password"
                      placeholderTextColor="grey"
                      secureTextEntry={this.state.secureTextEntry}
                      onChangeText={(val) => {
                        this.setState({ pwd: val });
                      }}
                    />
                    <TouchableOpacity onPress={this.changeSecureText}>
                      {this.state.secureTextEntry ? (
                        <Icon name="eye-off" size={20} color="#ffa585" />
                      ) : (
                        <Icon name="eye" size={20} color="#ffa585" />
                      )}
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      color: "#ffa585",
                      fontSize: 18,
                      marginLeft: 10,
                      marginTop: 20,
                    }}
                  >
                    Confirm Password
                  </Text>
                  <View style={styles.textInput2}>
                    <AntDesign name="lock" size={24} color="#ffa585" />
                    <TextInput
                      style={{
                        paddingLeft: 10,
                        width: "80%",
                        fontFamily: "Times New Roman",
                      }}
                      placeholder="Confirm your password"
                      placeholderTextColor="grey"
                      secureTextEntry={this.state.secureTextEntry}
                      onChangeText={(val) => {
                        this.setState({ confirmpwd: val });
                      }}
                    />
                    <TouchableOpacity onPress={this.changeSecureText}>
                      {this.state.secureTextEntry ? (
                        <Icon name="eye-off" size={20} color="#ffa585" />
                      ) : (
                        <Icon name="eye" size={20} color="#ffa585" />
                      )}
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.signup(
                        this.state.email,
                        this.state.pwd,
                        this.state.confirmpwd
                      );
                    }}
                  >
                    <Text style={styles.buttonText}>Sign up</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={async () => {
                      this.props.navigation.navigate("LoginScreen");
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 15,
                        fontFamily: "Times New Roman",
                        marginTop: 20,
                        color: "#ffa585",
                      }}
                    >
                      Already have an account? Sign in
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            </ScrollView>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "white",
    width: "100%",
    height: 40,
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 10,
    padding: 5,
  },

  textInput2: {
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "white",
    width: "100%",
    height: 40,
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 10,
    padding: 5,
  },

  button: {
    width: "70%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "15%",
    borderRadius: 10,
    backgroundColor: "#ffb788",
    marginTop: 40,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  buttonText: {
    fontFamily: "Times New Roman",
    fontSize: 20,
    marginLeft: 2,
  },
  footer: {
    flex: 1,
    marginTop: 15,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    width: "100%",
  },
});
