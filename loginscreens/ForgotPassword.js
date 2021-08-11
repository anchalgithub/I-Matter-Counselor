import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import firebase from "firebase";
import { Icon } from "react-native-elements";

export default class ForgotPassword extends React.Component{
render(){
return(
<View style={{justifyContent:'center',alignItems:'center',padding:10}}>

<Text style={{textAlign:'center', fontSize:20, fontFamily:'Papyrus', marginTop:20}}>I-Matter</Text>

<Image style ={{width :330,height:300,marginTop:10}}source ={require ('../assets/bak.png')}/>

<TextInput style = {styles.textBox} placeholder = "Username" placeholderTextColor="black" />

<TextInput style = {styles.textBox2} placeholder = "Password" placeholderTextColor="black" secureTextEntry = {true}/>

<Text style={{textAlign:'center', fontSize:15, fontFamily:'Papyrus', marginTop:20}}>Forgot Password? </Text>

<TouchableOpacity style = {styles.button} onPress = {async()=>{
this.props.navigation.navigate('ScoreScreen')
alert("Welcome to iMatter!")
}}>
<Text style = {styles.buttonText}>Login</Text>
</TouchableOpacity>

<TouchableOpacity onPress = {async()=>{
this.props.navigation.navigate('ScoreScreen')
alert("Welcome to iMatter!")
}}>
<Text style={{textAlign:'center', fontSize:15, fontFamily:'Papyrus', marginTop:20}}>Don't have an account? Sign Up </Text>
</TouchableOpacity>

</View>
)
}
}

const styles = StyleSheet.create({

textBox: {
width: "75%",
height:40,
justifyContent: "center",
alignItems: "center",
borderRadius: 10,
backgroundColor: "#FCE5D4",
marginTop:20,
shadowColor: "#FFFFCC",
paddingLeft:10,
shadowOffset: {
width: 0,
height: 8,
},
shadowOpacity: 0.44,
shadowRadius: 10.32,
elevation: 16,
},

textBox2: {
width: "75%",
height:40,
justifyContent: "center",
alignItems: "center",
borderRadius: 10,
backgroundColor: "#FCE5D4",
marginTop:30,
paddingLeft:10,
shadowColor: "#FFFFCC",
shadowOffset: {
width: 0,
height: 8,
},
shadowOpacity: 0.44,
shadowRadius: 10.32,
elevation: 16,
},

button: {
width: "75%",
height:30,
justifyContent: "center",
alignItems: "center",
borderRadius: 1,
backgroundColor: "#FCE5D4",
marginTop:40,
shadowColor: "#FFFFCC",
shadowOffset: {
width: 0,
height: 8,
},
shadowOpacity: 0.44,
shadowRadius: 10.32,
elevation: 16,
},

buttonText:{
fontFamily: 'Times New Roman',
fontSize:20,
marginLeft:2
},

})