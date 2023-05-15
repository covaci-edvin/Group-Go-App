import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";

const SideGroupRouteStatusBar = () => {
  return (
    <View
      style={[
        tw`absolute h-1/1.6 w-2 top-1/4.2 bg-white shadow-lg rounded-full`,
        {
          transform: [{ translateY: -50 }],
        },
        styles.container,
      ]}
    ></View>
  );
};

export default SideGroupRouteStatusBar;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    backgroundColor: Colors.primaryDark,
  },
});
