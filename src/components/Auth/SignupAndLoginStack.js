import { StyleSheet } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../../styles/colors";
import Login from "./Login";
import SignUp from "./SignUp";
const Tab = createMaterialTopTabNavigator();

const SignupAndLoginStack = (props) => {
  return (
    <Tab.Navigator
      style={{ backgroundColor: Colors.primaryLight }}
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 700,
          textTransform: "capitalize",
        },
        tabBarIndicatorStyle: {
          borderRadius: 5,
          backgroundColor: Colors.primaryShade,
          height: 3,
          shadowColor: "#fff",
        },
        tabBarContentContainerStyle: {},
        tabBarActiveTintColor: Colors.primaryShade,
        tabBarInactiveTintColor: Colors.primaryDarkEvenLighter,
        tabBarStyle: {
          backgroundColor: Colors.primaryLight,
        },
        tabBarItemStyle: { borderBottomColor: Colors.primaryDark },
        tabBarBounces: true,
      }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        navigation={props.navigation}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Sign up"
        component={SignUp}
        navigation={props.navigation}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default SignupAndLoginStack;

const styles = StyleSheet.create({});
