import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-elements";

import Welcome from "../components/Welcome";
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import Users from "../components/Users";
import Profile from "../components/Profile";
import Ligas from "../components/Ligas";
import Match from "../components/Match";
import Record from '../components/Record'
import { Platform } from "react-native";

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: <Icon name="ios-home" type="ionicon" color="white" />,
      },
    },
    Ligas: {
      screen: Ligas,
      navigationOptions: {
        tabBarIcon: <Icon name="ios-people" type="ionicon" color="white" />,
      },
    },
    Jugar: {
      screen: Match,
      navigationOptions: {
        tabBarIcon: (
          <Icon name="ios-add-circle-outline" type="ionicon" color="white" />
        ),
      },
    },
    Historial: {
      screen: Record,
      navigationOptions: {
        tabBarIcon: <Icon name="history" color="white" />,
      },
    },
    Perfil: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: <Icon name="ios-person" type="ionicon" color="white" />,
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#090717",
        ...Platform.select({
          ios: {
            height: 50,
            marginBottom: -30,
          },
        }),
      },
    },
  }
);

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => ({
      headerTitle: 'INICIA SESIÓN',
      headerTransparent: true,
      headerTintColor: "white"
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: () => ({
      headerTitle: 'REGISTRATE',
      headerTransparent: true,
      headerTintColor: "white"
    })
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Welcome,
      Auth: AuthNavigator,
      App: AppNavigator,
    },
    {
      initialRouteName:  "AuthLoading",
      /* initialRouteName: 'Auth', */
      /* initialRouteName: 'App',  */
    },
    {
      defaultNavigationOptions: {
        headerTintColor: "white",
      },
    }
  )
);
