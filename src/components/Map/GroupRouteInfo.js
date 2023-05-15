import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext } from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserJoined,
  setUserJoined,
  toggleIsGroupSelected,
} from "../../slices/uiToggleSlice";
import { selectOrigin, setDestination } from "../../slices/navigationSlice";
import Loader from "../UI/Loader";
import { resetSelectedGroup } from "../../slices/selectedGroupSlice";
import { WebSocketContext } from "../../context/WebSocketContext";
import {
  clearInvitedRoute,
  selectInvitedRouteAdminId,
} from "../../slices/invitedRouteSlice";

const GroupRouteInfo = ({ mapRef }) => {
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();
  const invitedRouteAdminId = useSelector(selectInvitedRouteAdminId);
  const { leaveGroupRoute } = useContext(WebSocketContext);

  const leaveGroupRouteHandler = () => {
    dispatch(setUserJoined(false));
    dispatch(toggleIsGroupSelected(false));
    dispatch(resetSelectedGroup());
    leaveGroupRoute(invitedRouteAdminId);
    dispatch(clearInvitedRoute());
    dispatch(
      setDestination({ coordinates: { latitude: null, logitude: null } })
    );
    mapRef.current.animateToRegion(
      {
        latitude: origin.coordinates.latitude,
        longitude: origin.coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      500
    );
  };
  return (
    <View style={[tw`flex-row items-center justify-between`, styles.container]}>
      <View style={tw`w-1/2 flex-row items-center`}>
        <View style={tw`h-10 w-12 flex-row items-center justify-center `}>
          <Loader />
        </View>
        <Text numberOfLines={2} style={[tw`text-sm `, styles.message]}>
          Waiting for the group admin to start the route...
        </Text>
      </View>
      <View style={tw`items-center justify-center`}>
        <TouchableOpacity
          style={[
            tw`flex-row items-center justify-between rounded-full`,
            styles.leaveButtonContainer,
          ]}
          onPress={leaveGroupRouteHandler}
        >
          <MaterialIcons
            name="cancel"
            size={24}
            color={Colors.primaryDarkEvenLighter}
          />
          <Text style={[tw`text-lg`, styles.leaveButtonText]}>Leave</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupRouteInfo;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  message: {
    color: Colors.primaryDarkEvenLighter,
  },
  leaveButtonText: {
    color: Colors.primaryDarkEvenLighter,
    paddingHorizontal: 10,
  },
  leaveButtonContainer: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 4,

    marginRight: 11,
    paddingVertical: 2,
  },
});
