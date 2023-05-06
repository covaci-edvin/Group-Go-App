import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from "../screens/MapScreen";
import Account from "../screens/Account";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import GroupsStack from "./GroupsStack";
import { AuthContext } from "../context/AuthContext";

const Drawer = createDrawerNavigator();

const AppStack = (props) => {
  const { getGroups } = useContext(AuthContext);

  useEffect(() => {
    getGroups();
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Account {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.primaryLight,
        },
        drawerLabelStyle: { marginLeft: -20, fontSize: 16 },
        drawerActiveBackgroundColor: Colors.primaryShade,
        drawerActiveTintColor: Colors.primaryLight,
      }}
      useLegacyImplementation
      initialRouteName="Map"
    >
      <Drawer.Screen
        name="Map"
        component={MapScreen}
        navigation={props.navigation}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="map-outline" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Groups"
        component={GroupsStack}
        options={{
          drawerIcon: ({ color }) => (
            <Feather name="users" size={25} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
