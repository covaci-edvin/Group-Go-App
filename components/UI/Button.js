import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { AntDesign } from "@expo/vector-icons";

const Button = ({ onPress, text }) => {
  return (
    <View style={[tw`items-center`, styles.footerContainer]}>
      <TouchableOpacity
        style={[
          tw`flex-row items-center justify-center w-1/2 gap-2 rounded-md h-12`,
          styles.button,
        ]}
        onPress={onPress}
      >
        <Text style={[styles.text]}>{text}</Text>
        <AntDesign
          name={"addusergroup"}
          size={30}
          color={Colors.primaryLight}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: Colors.primaryLight,
  },
  text: {
    fontSize: 16,
    color: Colors.primaryLight,
    fontWeight: 600,
  },
  button: {
    // borderColor: Colors.primaryDark,
    // borderWidth: 1,
    backgroundColor: Colors.primaryShade,
    marginVertical: 20,
    paddingVertical: 3,
  },
});