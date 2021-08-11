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

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      pwd: "",
      secureTextEntry: true,
    };
  }

  createTwoButtonAlert = () =>
    Alert.alert("Error", "User does not exist!", [
      {
        text: "Okay",
        onPress: () => console.log("Okay pressed"),
        style: "cancel",
      },
    ]);

  changeSecureText = () => {
    this.setState({ secureTextEntry: !this.state.secureTextEntry });
  };

  login = async (email, pwd) => {
    var query = await db
      .collection("counselorAccounts")
      .where("email", "==", email)
      .get();
    console.log(query.docs.length);
    if (query.docs.length === 1) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pwd)
        .then((userCredential) => {
          this.props.navigation.navigate("Dashboard");
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    } else {
      alert("User does not exist!");
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={bg} style={styles.container}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <Image
              style={{
                width: 150,
                height: 150,
                marginTop: 130,
                alignSelf: "center",
              }}
              source={require("../assets/bak.png")}
            />

            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: 20,
                fontWeight: "bold",
                fontFamily: "Times New Roman",
              }}
            >
              I-Matter - Counselors
            </Text>

            <ScrollView>
              <View style={styles.footer}>
                <Animatable.View animation="fadeInUpBig">
                  <Text
                    style={{ color: "#ffa585", fontSize: 18, marginLeft: 10 }}
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

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("ResetPWDScreen");
                    }}
                  >
                    <Text
                      style={{
                        marginLeft: 13,
                        fontSize: 15,
                        fontFamily: "Times New Roman",
                        color: "#ffa585",
                        marginTop: 5,
                      }}
                    >
                      Forgot password?
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "#eeeeee",
                      height: 2,
                      marginTop: 30,
                    }}
                  ></View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.login(this.state.email, this.state.pwd);
                    }}
                  >
                    <Text style={styles.buttonText}>Sign in</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={async () => {
                      this.props.navigation.navigate("SignUpScreen");
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
                      Don't have an account? Sign up{" "}
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            </ScrollView>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
    marginTop: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    width: "100%",
    height: 500,
  },
});
