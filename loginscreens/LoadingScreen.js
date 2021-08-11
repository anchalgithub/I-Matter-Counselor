import React, { Component } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends React.Component {
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Dashboard');
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  };

  componentDidMount = () => {
    this.checkIfLoggedIn();
  };

  render() {
    return (
      <View style={{ justifyContent: 'center', flex: 1, marginTop: 30 }}>
        <ActivityIndicator color= "#fedfc9"size="large" />
      </View>
    );
  }
}
