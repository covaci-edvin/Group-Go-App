import { StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MapScreen from "../screens/MapScreen";
import Account from "../screens/Account";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "../styles/colors";
import GroupsStack from "./GroupsStack";
import { WebSocketProvider } from "../context/WebSocketContext";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsGroupSelected,
  selectIsUserInvited,
  setIsUserInvited,
  setUserJoined,
  toggleIsGroupSelected,
} from "../slices/uiToggleSlice";
import MyInvitationModal from "../components/UI/MyInvitationModal";
import {
  selectInvitedRouteAdminName,
  selectInvitedRouteDestination,
  selectInvitedRouteGroupName,
  clearInvitedRoute,
  selectInvitedRouteGroupId,
} from "../slices/invitedRouteSlice";
import { setDestination } from "../slices/navigationSlice";
import { setSelectedGroup } from "../slices/selectedGroupSlice";
import { selectGroups } from "../slices/groupsSlice";

const Drawer = createDrawerNavigator();

const AppStack = (props) => {
  const isUserInvited = useSelector(selectIsUserInvited);
  const dispatch = useDispatch();
  const { groups } = useSelector(selectGroups);
  const inviteRouteDestination = useSelector(selectInvitedRouteDestination);
  const inviteRouteAdminName = useSelector(selectInvitedRouteAdminName);
  const inviteRouteGroupName = useSelector(selectInvitedRouteGroupName);
  const inviteRouteGroupId = useSelector(selectInvitedRouteGroupId);

  const onDeclineHandler = () => {
    dispatch(setIsUserInvited(false));
    dispatch(clearInvitedRoute());
  };

  const onJoinHandler = () => {
    dispatch(
      setDestination({
        coordinates: {
          latitude: inviteRouteDestination.coordinates.latitude,
          longitude: inviteRouteDestination.coordinates.longitude,
        },
        description: inviteRouteDestination.description,
      })
    );

    groups.map((group) => {
      if (group.id === inviteRouteGroupId) {
        dispatch(setSelectedGroup(group));
        dispatch(toggleIsGroupSelected(true));
      }
    });
    dispatch(setUserJoined(true));
    dispatch(setIsUserInvited(false));
  };

  useEffect(() => {}, []);
  return (
    <WebSocketProvider>
      <MyInvitationModal
        isVisible={isUserInvited}
        name={inviteRouteGroupName}
        title={"Invitation"}
        message={`${inviteRouteAdminName} invited you to a route`}
        onDeclineHandler={onDeclineHandler}
        onJoinHandler={onJoinHandler}
      />
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
        <Drawer.Screen
          name="Chats"
          component={GroupsStack}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons
                name="chatbubbles-outline"
                size={25}
                color={Colors.primaryLight}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </WebSocketProvider>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
