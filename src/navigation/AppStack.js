import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from "../screens/MapScreen";
import Account from "../screens/Account";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import GroupsStack from "./GroupsStack";
import { AuthContext } from "../context/AuthContext";
import { color } from "react-native-reanimated";
import SocketioTest from "../components/Map/SocketioTest";
import { WebSocketProvider } from "../context/WebSocketContext";

const Drawer = createDrawerNavigator();

const AppStack = (props) => {

  useEffect(() => {
  }, []);
  return (
    <WebSocketProvider>
      <Drawer.Navigator
        drawerContent={(props) => <Account {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: Colors.primaryDark,
          },
          drawerLabelStyle: {
            marginLeft: -20,
            fontSize: 16,
            color: Colors.primaryLight,
          },
          drawerActiveBackgroundColor: Colors.primaryShade,
          drawerActiveTintColor: Colors.primaryDark,
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
              <Ionicons
                name="map-outline"
                size={25}
                color={Colors.primaryLight}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Groups"
          component={GroupsStack}
          options={{
            drawerIcon: ({ color }) => (
              <Feather name="users" size={25} color={Colors.primaryLight} />
            ),
          }}
        />
      </Drawer.Navigator>
    </WebSocketProvider>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
