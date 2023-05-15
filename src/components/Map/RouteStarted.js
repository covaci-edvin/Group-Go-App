import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import {
  selectDistance,
  selectOrigin,
  selectTravelTimeInformation,
  setDestination,
} from "../../slices/navigationSlice";
import { AntDesign } from "@expo/vector-icons";
import {
  setGroupRouteStarted,
  setIsInvitationSent,
  setRouteStarted,
  setUserJoined,
  toggleIsGroupSelected,
} from "../../slices/uiToggleSlice";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { resetSelectedGroup } from "../../slices/selectedGroupSlice";
import { WebSocketContext } from "../../context/WebSocketContext";
import {
  clearInvitedRoute,
  selectInvitedRouteAdminId,
} from "../../slices/invitedRouteSlice";

const RouteStarted = ({ mapRef }) => {
  const duration = useSelector(selectTravelTimeInformation);
  const distance = useSelector(selectDistance);
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();
  const { leaveGroupRoute } = useContext(WebSocketContext);
  const invitedRouteAdminId = useSelector(selectInvitedRouteAdminId);

  const opacity = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);

  const leaveGroupRouteHandler = () => {
    dispatch(setUserJoined(false));
    dispatch(toggleIsGroupSelected(false));
    dispatch(resetSelectedGroup());
    leaveGroupRoute(invitedRouteAdminId);
    dispatch(clearInvitedRoute());
    dispatch(setIsInvitationSent(false));
    dispatch(setRouteStarted(false));
    dispatch(setGroupRouteStarted(false));
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

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  return (
    <Animated.View style={[tw`flex-row`, styles.container, reanimatedStyle]}>
      <View style={[tw`w-1/3 items-start justify-center`]}>
        <View style={[tw`rounded-full`, styles.outerSpeedBorder]}>
          <View
            style={[
              tw`items-center justify-center rounded-full`,
              styles.speedContainer,
            ]}
          >
            <Text style={[tw``, styles.speedNumber]}>0</Text>
            <Text style={[tw``, styles.speedUnit]}>km/h</Text>
          </View>
        </View>
      </View>
      <View style={tw`w-1/3 items-center`}>
        <View style={[tw`flex-row gap-1`]}>
          {duration?.hours > 0 && (
            <Text style={[tw`text-2xl font-medium`, styles.duration]}>
              {duration?.hours}h
            </Text>
          )}
          <Text style={[tw`text-2xl font-medium`, styles.duration]}>
            {duration?.minutes}min
          </Text>
        </View>
        <View style={[tw``, styles.distance]}>
          <Text style={[tw`text-lg font-medium`, styles.distance]}>
            {distance?.toFixed() > 0 ? distance?.toFixed() : "< 1"}km
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[tw`w-1/3 items-end justify-center`]}
        activeOpacity={0.7}
        onPress={leaveGroupRouteHandler}
      >
        <View
          style={[
            tw`rounded-full items-center justify-center`,
            styles.cancelButton,
          ]}
        >
          <AntDesign
            name="close"
            size={25}
            color={Colors.primaryDarkEvenLighter}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RouteStarted;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  duration: {
    color: Colors.primaryLight,
  },
  distance: {
    color: Colors.primaryLight,
  },
  speedContainer: {
    // backgroundColor: Colors.primaryDarkLighter,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    height: 55,
    width: 90,
  },
  outerSpeedBorder: {
    borderColor: Colors.primaryShade,
    borderRightWidth: 2,
    borderLeftWidth: 2,
  },
  speedNumber: {
    color: Colors.primaryLight,
    fontSize: 24,
  },
  speedUnit: {
    color: Colors.primaryLight,
    fontSize: 16,
  },
  cancelButton: {
    borderColor: Colors.primaryDarkEvenLighter,
    borderWidth: 1,
    height: 55,
    width: 90,
  },
});
