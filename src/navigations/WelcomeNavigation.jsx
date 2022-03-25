import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../components/Welcome";
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home";

const Stack = createNativeStackNavigator();

const WelcomeNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShow: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeNavigation;
