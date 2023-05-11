import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";

const StartRouteButton = () => {
  return (
    <TouchableOpacity
      style={[
        tw`items-center justify-center rounded-3xl shadow-md`,
        styles.button,
      ]}
    >
      <Text style={[tw`text-base`, styles.text]}>START</Text>
    </TouchableOpacity>
  );
};

export default StartRouteButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 130,
    borderColor: Colors.primaryShade,
    borderRightWidth: 2,
    borderLeftWidth: 2,

    backgroundColor: Colors.primaryDark,
  },
  text: {
    fontWeight: 600,
    color: Colors.primaryLight,
  },
});
