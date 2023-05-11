import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectDistance,
  selectOrigin,
  selectTravelTimeInformation,
  setDestination,
} from "../../slices/navigationSlice";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import TransportSelect from "./TransportSelect";
import Dashes from "../UI/Dashes";
import StartRouteButton from "./StartRouteButton";
import StepsButton from "./StepsButton";
import InviteSection from "./InviteSection";
import { selectIsGroupSelected } from "../../slices/uiToggleSlice";

const DestinationInfo = ({ mapRef }) => {
  const distance = useSelector(selectDistance);
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  const duration = useSelector(selectTravelTimeInformation);
  const opacity = useSharedValue(0);
  const dispatch = useDispatch();
  const isGroupSelected = useSelector(selectIsGroupSelected);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);

  const clearDestination = () => {
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
    <Animated.View style={reanimatedStyle}>
      <TransportSelect />
      <View
        style={[
          tw`flex-row items-center justify-between`,
          styles.destinationCancelContainer,
        ]}
      >
        <MaterialIcons
          name="my-location"
          size={24}
          color={Colors.primaryDarkEvenLighter}
        />
        <Dashes />
        <TouchableOpacity onPress={clearDestination} style={tw`w-1/2 `}>
          <View
            style={[
              tw`flex-row items-center justify-between p-1 rounded-full`,
              styles.destinationCancel,
            ]}
          >
            <MaterialIcons
              name="cancel"
              size={24}
              color={Colors.primaryDarkEvenLighter}
            />
            <View style={tw`items-center flex-1`}>
              <Text style={styles.destinationText} numberOfLines={1}>
                {destination.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row items-center justify-center`}>
        <View style={[tw`w-1/2 items-end pr-3`, styles.distance]}>
          <Text style={[tw`text-base font-medium`, styles.distance]}>
            {distance?.toFixed() > 0 ? distance?.toFixed() : "< 1"}km
          </Text>
        </View>
        <View
          style={[
            tw`h-full`,
            { backgroundColor: Colors.primaryDarkEvenLighter, width: 1 },
          ]}
        ></View>
        <View style={[tw`flex-row gap-1 w-1/2 justify-start pl-3`]}>
          {duration?.hours > 0 && (
            <Text style={[tw`text-base font-medium`, styles.duration]}>
              {duration?.hours}h
            </Text>
          )}
          <Text style={[tw`text-base font-medium`, styles.duration]}>
            {duration?.minutes}min
          </Text>
        </View>
      </View>
      <View style={[tw`flex-row justify-center`, styles.buttonsContainer]}>
        {/* <StepsButton /> */}
        {isGroupSelected ? <InviteSection /> : <StartRouteButton />}
      </View>
    </Animated.View>
  );
};

export default DestinationInfo;

const styles = StyleSheet.create({
  destinationCancelContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  destinationCancel: {
    backgroundColor: Colors.primaryDark,
  },
  destinationText: {
    color: Colors.primaryDarkEvenLighter,
    fontWeight: 500,
  },
  duration: {
    color: Colors.primaryDarkEvenLighter,
  },
  distance: {
    color: Colors.primaryDarkEvenLighter,
  },
  buttonsContainer: {
    marginTop: 15,
    marginHorizontal: 10,
  },
});
