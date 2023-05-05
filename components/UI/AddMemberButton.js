import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../styles/colors";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";

const AddMemberButton = ({ onPress, value, isValid }) => {
  const buttonColor = () => {
    if (value.length !== 0 && !isValid) return Colors.primaryTint;
    if (value.length === 0) return Colors.primaryShade;
    if (isValid) return Colors.primaryShade;
  };
  return (
    <View style={[tw`items-center shadow-lg`, styles.buttonContainer]}>
      <TouchableOpacity
        style={[
          tw`flex-row items-center justify-center w-full gap-1 rounded-md`,
          styles.button,
          ,
          { backgroundColor: buttonColor() },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <AntDesign name={"adduser"} size={24} color={Colors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
};

export default AddMemberButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  buttonContainer: {
    marginHorizontal: 10,
    backgroundColor: "transparent",
  },
});
