import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../styles/colors";
import tw from "twrnc";
import Dash from "./Dash";

const Dashes = () => {
  return (
    <View style={tw`flex-row`}>
      <Dash />
      <Dash />
      <Dash />
      <Dash />
      <Dash />
      <Dash />
      <Dash />
      <Dash />
      <Dash />
    </View>
  );
};

export default Dashes;

const styles = StyleSheet.create({});
