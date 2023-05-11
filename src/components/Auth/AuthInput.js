import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import PasswordIcon from "../../assets/icons/passwordIcon";
import { Colors } from "../../styles/colors";

const AuthInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        tw`flex-row items-center justify-between px-3 gap-3`,
        styles.inputContainer,
        isFocused ? styles.inputFocus : styles.inputBlur,
      ]}
    >
      {props.type === "email" && (
        <MaterialIcons
          name="alternate-email"
          size={25}
          color={isFocused ? Colors.primaryShade : Colors.primaryShadeNotActive}
          style={styles.icon}
        />
      )}
      {props.type === "password" && (
        <PasswordIcon
          size={25}
          color={isFocused ? Colors.primaryShade : Colors.primaryShadeNotActive}
        />
      )}
      {props.type === "name" && (
        <Ionicons
          name="person-outline"
          size={25}
          color={isFocused ? Colors.primaryShade : Colors.primaryShadeNotActive}
        />
      )}
      <TextInput
        keyboardType={props.type === "email" ? "email-address" : "default"}
        secureTextEntry={props.type === "password" && !showPassword && true}
        placeholder={props.placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          props.onBlur;
        }}
        onChangeText={props.onChangeText}
        style={[tw``, styles.input]}
        value={props.value}
        placeholderTextColor={Colors.primaryDarkLighter}
      />
      {props.type === "password" && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={tw`h-full justify-center`}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color={
              isFocused ? Colors.primaryShade : Colors.primaryShadeNotActive
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 50,
    fontSize: 18,
    color: Colors.primaryDark,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: Colors.primaryLight,
  },
  inputFocus: {
    borderColor: Colors.primaryShade,
    borderWidth: 1,
  },
  inputBlur: {
    borderColor: Colors.primaryShadeNotActive,
    borderWidth: 1,
  },
});
