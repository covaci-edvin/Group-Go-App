import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "../styles/colors";

const GroupHeaderInfo = ({ group }) => {
  return (
    <View style={[tw`rounded-md items-center`, styles.container]}>
      <Text style={[tw`text-lg text-center`, styles.name]}>{group.name}</Text>
      <Text style={[tw`text-base text-center`, styles.description]}>
        {group.description}
      </Text>
    </View>
  );
};

export default GroupHeaderInfo;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.primaryShade,
  },
  name: {
    color: Colors.primaryDark,
    fontWeight: 700,
  },
  description: {
    color: Colors.primaryDarkLighter,
    fontWeight: 500,
  },
});
