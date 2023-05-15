import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "../../styles/colors";
import { useSelector } from "react-redux";
import { selectOrigin } from "../../slices/navigationSlice";
<MaterialIcons name="location-searching" size={24} color="black" />;

const MyLocationButton = ({ mapRef }) => {
  const origin = useSelector(selectOrigin);
  // const currentLocation= useSelector()

  const centerCurrentLocation = () => {
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
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        tw`h-12 w-12 shadow-lg items-center justify-center rounded-full top-1/1.7 right-3`,
        {
          position: "absolute",
          backgroundColor: Colors.primaryDark,
        },
      ]}
      onPress={centerCurrentLocation}
    >
      <MaterialIcons
        name="location-searching"
        size={24}
        color={Colors.primaryLight}
      />
    </TouchableOpacity>
  );
};

export default MyLocationButton;

const styles = StyleSheet.create({});
