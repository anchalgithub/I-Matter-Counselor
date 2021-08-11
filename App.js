import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

import LoginScreen from "./loginscreens/LoginScreen";
import SignUpScreen from "./loginscreens/SignUpScreen";
import Dashboard from "./loginscreens/Dashboard";
import LoadingScreen from "./loginscreens/LoadingScreen";
import ForgotPassword from "./loginscreens/ForgotPassword";
import ResetPWDScreen from "./loginscreens/ResetPWDScreen";
import Profile from "./loginscreens/Profile";
import AnsweredDetails from "./loginscreens/AnsweredDetails";
import PendingDetails from "./loginscreens/PendingDetails";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Times New Roman": require("./assets/times.ttf"),
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return <AppContainer />;
    }
  }
}
const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: { screen: Dashboard },
    Profile: { screen: Profile },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const routeName = navigation.state.routeName;
        if (routeName === "Dashboard") {
          return <Icon name="home" size={25} color="#ffa585" />;
        } else if (routeName === "Profile") {
          return <Icon name="user" size={25} color="#ffa585" />;
        }
      },
    }),
  }
);

const AppNavigator = createSwitchNavigator({
  LoadingScreen: { screen: LoadingScreen },
  LoginScreen: { screen: LoginScreen },
  TabNavigator: { screen: TabNavigator },
  SignUpScreen: { screen: SignUpScreen },
  ForgotPassword: { screen: ForgotPassword },
  ResetPWDScreen: { screen: ResetPWDScreen },
  AnsweredDetails: { screen: AnsweredDetails },
  PendingDetails: { screen: PendingDetails },
});

const AppContainer = createAppContainer(AppNavigator);
