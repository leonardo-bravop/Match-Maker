import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Welcome from "../components/Welcome";
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";
import Users from "../components/Users";

const AppNavigator = createBottomTabNavigator(
  {
    //   Profile: {
    //     screen: ProfileScreen,
    //     navigationOptions: {
    //       // some styling for profile screen
    //     }
    //   },
    Home: {
      screen: Home,
    },
    Users: {
      screen: Users,
    },
  },
  {
    // here will be some styling
  }
);

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: () => ({
      headerShown: false,
    }),
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
      initialRouteName: "AuthLoading",
      //initialRouteName: 'Auth',
      //initialRouteName: 'App',
    },
    {
      defaultNavigationOptions: {
        headerTintColor: "white",
      },
    }
  )
);
