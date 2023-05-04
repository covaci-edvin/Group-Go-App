import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../styles/colors";

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        tw`flex-row items-start justify-between p-3 gap-3`,
        styles.inputContainer,
        { height: props.height ? props.height : 50 },
        isFocused ? styles.inputFocus : styles.inputBlur,
      ]}
    >
      {props.type === "name" && (
        <MaterialIcons
          name="group"
          size={25}
          color={isFocused ? Colors.primaryShade : Colors.primaryTint}
        />
      )}
      {props.type === "description" && (
        <MaterialIcons
          name="description"
          size={25}
          color={isFocused ? Colors.primaryShade : Colors.primaryTint}
        />
      )}
      <TextInput
        placeholder={props.placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          props.onBlur;
        }}
        onChangeText={props.onChangeText}
        style={[tw``, styles.input]}
        value={props.value}
        multiline={props.multiline}
        autoFocus={props.autoFocus}
        defaultValue={props.defaultValue}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 24,
    fontSize: 18,
    color: Colors.primaryDark,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: Colors.primaryDark,
  },
  inputFocus: {
    borderColor: Colors.primaryShade,
    borderWidth: 1,
  },
  inputBlur: {
    borderColor: Colors.primaryTint,
    borderWidth: 1,
  },
});
