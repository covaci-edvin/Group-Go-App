import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../styles/colors";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectIsAuthLoading } from "../../slices/loadersSlice";
import Loader from "./Loader";

const AddMemberButton = ({ onPress, value, isValid }) => {
  const isAuthLoading = useSelector(selectIsAuthLoading);
  const buttonColor = () => {
    if (value.length !== 0 && !isValid) return Colors.primaryShadeNotActive;
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
        {isAuthLoading ? (
          <Loader />
        ) : (
          <AntDesign name={"adduser"} size={24} color={Colors.primaryDark} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddMemberButton;

const styles = StyleSheet.create({
  button: {
    height: 44,
    // padding: 10,
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
});
