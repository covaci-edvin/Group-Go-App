import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";

const StatusLabel = ({ status, color }) => {
  return (
    <View
      style={[
        { backgroundColor: color },
        tw`items-center justify-center rounded-full h-5 w-18`,
      ]}
    >
      <Text
        style={[
          tw`font-semibold flex-none`,
          { color: Colors.primaryDarkLighter },
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

export default StatusLabel;

const styles = StyleSheet.create({
  adminLabel: {
    backgroundColor: Colors.amber,
  },
});
