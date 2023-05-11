import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../styles/colors";

<MaterialIcons name="location-searching" size={24} color="black" />;

const ShowRouteButton = ({ routeCoordinates, centerRoute }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        tw`h-12 w-12 shadow-lg items-center justify-center rounded-full top-1/1.92 right-3`,
        {
          position: "absolute",
          backgroundColor: Colors.primaryDark,
        },
      ]}
      onPress={() => centerRoute(routeCoordinates)}
    >
      <MaterialIcons name="timeline" size={24} color={Colors.primaryLight} />
    </TouchableOpacity>
  );
};

export default ShowRouteButton;

const styles = StyleSheet.create({});
