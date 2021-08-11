import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Linking,
  Image,
  Platform,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { Card } from "react-native-paper";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import ParticlesBg from "particles-bg";
import image1 from "../assets/image.jpg";
import * as Animatable from "react-native-animatable";
import bg from "../assets/dashboardBG.jpg";
import call from "react-native-phone-call";

export default class AnsweredDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counselorName: "",
      counselorComments: "",
      issue: "",
      contactInfo: "",
      urgency: "",
      additionalInfo: "",
      userEmail: "",
      email: firebase.auth().currentUser.email,
      docId: "",
    };
  }

  getProfile = async () => {
    var id = this.props.navigation.getParam("docId");
    // console.log(id)
    var temp = await db.collection("requestsForCounselors").doc(id).get();
    console.log("Stuff");
    var obj = temp.data();
    this.setState({
      counselorName: obj.counselorName,
      contactInfo: obj.studentContactInfo,
      counselorComments: obj.counselorComments,
      userEmail: obj.userEmail,
      issue: obj.issue,
      urgency: obj.urgency,
      additionalInfo: obj.additionalInfo,
    });
  };

  componentDidMount = () => {
    this.getProfile();
  };

  onReply = () => {
    var id = this.props.navigation.getParam("docId");
    db.collection("requestsForCounselors").doc(id).update({
      counselorComments: this.state.counselorComments,
      status: "Answered",
    });
    this.props.navigation.navigate("Dashboard");
    alert("Replied!");
  };

  iosCall = () => {
    const args = {
      number: this.state.contactInfo, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  };

  dialCall = () => {
    let phoneNumber = this.state.contactInfo;

    if (Platform.OS === "android") {
      var num = this.state.contactInfo;
      phoneNumber = "tel:${" + num + "}";
    } else {
      phoneNumber = "telprompt:${" + num + "}";
    }

    Linking.openURL(phoneNumber);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={bg} style={{ flex: 1 }}>
          <ScrollView>
            <View
              style={{
                backgroundColor: "#ffa576",
                borderBottomLeftRadius: 90,
                borderBottomRightRadius: 90,
                flex: 1,
                height: 90,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginTop: 40,
                  fontFamily: "Times New Roman",
                  textAlign: "center",
                  color: "brown",
                }}
              >
                {" "}
                Answered Request Details
              </Text>
            </View>

            <ScrollView>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginTop: 40,
                    fontFamily: "Times New Roman",
                    paddingLeft: 55,
                    color: "brown",
                  }}
                >
                  Student Email
                </Text>

                <View style={styles.textInput}>
                  <Text
                    style={{
                      paddingLeft: 10,
                      color: "black",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {this.state.userEmail}
                  </Text>
                </View>

                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginTop: 40,
                    fontFamily: "Times New Roman",
                    paddingLeft: 55,
                    color: "brown",
                  }}
                >
                  Issue
                </Text>

                <View style={styles.textInput}>
                  <Text
                    style={{
                      paddingLeft: 10,
                      color: "black",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {this.state.issue}
                  </Text>
                </View>

                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginTop: 40,
                    fontFamily: "Times New Roman",
                    paddingLeft: 55,
                    color: "brown",
                  }}
                >
                  Urgency - Out of 5
                </Text>

                <View style={styles.textInput}>
                  <Text
                    style={{
                      paddingLeft: 10,
                      color: "black",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {this.state.urgency}
                  </Text>
                </View>

                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginTop: 40,
                    fontFamily: "Times New Roman",
                    paddingLeft: 55,
                    color: "brown",
                  }}
                >
                  Additional Info
                </Text>

                <View style={styles.textInput}>
                  <Text
                    style={{
                      paddingLeft: 10,
                      color: "black",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {this.state.additionalInfo}
                  </Text>
                </View>

                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    marginTop: 40,
                    fontFamily: "Times New Roman",
                    paddingLeft: 55,
                    color: "brown",
                  }}
                >
                  Counselor Comments
                </Text>

                <View style={styles.textInput1}>
                  <Text
                    style={{
                      paddingLeft: 10,
                      color: "black",
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {this.state.counselorComments}
                  </Text>
                </View>

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "#eeeeee",
                    height: 2,
                    marginTop: 25,
                  }}
                ></View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={this.iosCall}
                    activeOpacity={0.7}
                    style={{ marginLeft: "27%" }}
                  >
                    <Text style={{ marginLeft: -5 }}> IOS </Text>
                    <Icon name="phone" size={23} color="#ffa585" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.dialCall}
                    activeOpacity={0.7}
                    style={{ marginLeft: "65%", marginTop: -41 }}
                  >
                    <Text style={{ marginLeft: -20 }}> Android </Text>
                    <Icon name="phone-call" size={22} color="#ffa585" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Dashboard");
                }}
              >
                <View style={styles.button1}>
                  <Text style={styles.buttonText1}>Back</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    width: "70%",
    alignSelf: "center",
    height: 30,
    borderColor: "#ffccb9",
    borderBottomColor: "black",
    marginTop: 5,
  },

  textInput1: {
    borderWidth: 1,
    borderRadius: 10,
    width: "70%",
    alignSelf: "center",
    height: 100,
    borderColor: "#ffccb9",
    borderBottomColor: "black",
    marginTop: 5,
  },

  button1: {
    width: "30%",
    height: 30,
    marginLeft: "34%",
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonText1: {
    fontFamily: "Times New Roman",
    fontSize: 13,
    textAlign: "center",
    marginTop: 5,
  },
});
