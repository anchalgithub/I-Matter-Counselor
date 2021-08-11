import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground
} from "react-native";
import firebase from "firebase";
import { Icon } from "react-native-elements";
import bg from '../assets/bg.webp'
import * as Animatable from 'react-native-animatable'

export default class ResetPWDScreen extends React.Component{

constructor(){
super()
this.state={
email:''
}
}

render(){
return(
<View style={{ flex:1}}>
<ImageBackground source={bg} style={{flex:1}}>

<Text style={{textAlign:'center', fontSize:20, fontFamily:'Times New Roman', marginTop:40, color:'black'}}>Password Recovery</Text>

<View style={styles.footer}>
<Animatable.View animation="fadeInUpBig">


<Text style= {{color:"#ffa585", fontSize:18,marginTop:20, textAlign:'center'}}>Enter Registered Email</Text>
<TextInput style = {styles.textBox} placeholder = "Your email" placeholderTextColor="grey" onChangeText={(text)=>{this.setState({email:text})}}/>

<TouchableOpacity style = {styles.button} onPress = {()=>{
firebase.auth().sendPasswordResetEmail(this.state.email);
alert("Password reset email sent!")
}}>
<Text style = {styles.buttonText}>Send password reset</Text>
</TouchableOpacity>

   <TouchableOpacity
          onPress={async () => {
            this.props.navigation.navigate('LoginScreen');
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontFamily:'Times New Roman',
              marginTop: 20,
              color:'#ffa585'
            }}>
           Already have an account? Sign in
          </Text>

        </TouchableOpacity>

</Animatable.View>
</View>

</ImageBackground>
</View>
)
}
}

const styles = StyleSheet.create({

textBox: {
  borderWidth: 1,
  borderRadius: 40,
  borderColor:'white',
  width: '100%',
  height: 40,
  flexDirection: 'row',
  marginTop: 10,
  textAlign:'center',
},

button: {
    width: '70%',
    height: 30,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#ffb788',
    marginTop: 40,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  buttonText: {
    fontFamily: 'Times New Roman',
    fontSize: 17,
    textAlign:'center',
    marginTop:5
  },

footer:{
  flex:1,
  marginTop:20,
  backgroundColor:"white",
  borderTopLeftRadius:30,
  borderTopRightRadius:30,
  paddingVertical:50,
  paddingHorizontal:30,
  width:'100%',
  height:500,
  alignSelf:'center'
  }
})