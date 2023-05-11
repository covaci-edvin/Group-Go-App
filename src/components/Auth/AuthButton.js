import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectIsAuthLoading } from "../../slices/loadersSlice";
import Loader from "../UI/Loader";

const Icon = ({ icon, isValid }) => {
  return icon === "login" ? (
    <SimpleLineIcons
      name={icon}
      size={24}
      color={!isValid ? Colors.primaryDarkEvenLighter : Colors.primaryLight}
    />
  ) : (
    <Feather
      name={icon}
      size={24}
      color={!isValid ? Colors.primaryDarkEvenLighter : Colors.primaryLight}
    />
  );
};

const AuthButton = ({ isValid, onPress, icon }) => {
  const isAuthLoading = useSelector(selectIsAuthLoading);
  return (
    <TouchableOpacity
      style={[
        tw` shadow-lg h-14 w-24 rounded-full flex items-center justify-center`,
        ,
        {
          backgroundColor: isValid
            ? Colors.primaryShade
            : Colors.primaryShadeNotActive,
        },
      ]}
      activeOpacity={0.6}
      onPress={onPress}
    >
      {isAuthLoading ? <Loader /> : <Icon isValid={isValid} icon={icon} />}
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({});
