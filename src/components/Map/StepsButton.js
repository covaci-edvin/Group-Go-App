import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";

const StepsButton = () => {
  return (
    <TouchableOpacity
      style={[
        tw`items-center justify-center rounded-3xl shadow-md`,
        styles.button,
      ]}
    >
      <Text style={[tw`text-base`, styles.text]}>Steps</Text>
    </TouchableOpacity>
  );
};

export default StepsButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 130,
    backgroundColor: Colors.primaryDarkLighter,
  },
  text: {
    fontWeight: 600,
    color: Colors.primaryDarkEvenLighter,
  },
});
