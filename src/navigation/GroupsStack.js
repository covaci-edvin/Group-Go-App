import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectGroup from "../screens/SelectGroup";
import CreateGroup from "../screens/CreateGroup";
import GroupInfo from "../screens/GroupInfo";

const Stack = createNativeStackNavigator();

const GroupsStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectGroupScreen"
        component={SelectGroup}
        options={{
          headerShown: false,
        }}
        navigation={props.navigation}
      />
      <Stack.Screen
        name="CreateGroupScreen"
        component={CreateGroup}
        options={{
          headerShown: false,
        }}
        navigation={props.navigation}
      />
      <Stack.Screen
        name="GroupInfoScreen"
        component={GroupInfo}
        options={{
          headerShown: false,
        }}
        navigation={props.navigation}
      />
    </Stack.Navigator>
  );
};

export default GroupsStack;

const styles = StyleSheet.create({});
