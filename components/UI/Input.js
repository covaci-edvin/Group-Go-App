import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../styles/colors";

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const refInput = props.refInput ? props.refInput : useRef();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => refInput.current.focus()}
      style={[
        tw`flex-row items-start justify-between p-3 rounded-md`,
        styles.inputContainer,
        { height: props.height ? props.height : 50 },
        isFocused ? styles.inputFocus : styles.inputBlur,
      ]}
    >
      <View style={tw`flex-row items-center gap-3`}>
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
          ref={refInput}
          placeholder={props.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            props.onBlur;
          }}
          onChangeText={props.onChangeText}
          style={[styles.input]}
          value={props.value}
          multiline={props.multiline}
          autoFocus={props.autoFocus}
          defaultValue={props.defaultValue}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 15,
    marginBottom: 5,
    // borderRadius: 10,
    color: Colors.primaryDark,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.primaryDark,
    paddingTop: 0,
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
