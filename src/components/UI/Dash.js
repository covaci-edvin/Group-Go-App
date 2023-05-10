import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../styles/colors";
import tw from "twrnc";

const Dash = () => {
  return (
    <View
      style={[
        tw` w-1 m-1`,
        { backgroundColor: Colors.primaryDarkEvenLighter, height: 2 },
      ]}
    ></View>
  );
};

export default Dash;

const styles = StyleSheet.create({});
