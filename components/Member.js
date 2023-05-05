import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { Colors } from "../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";

const Member = ({ item, adminId, toggleModal, setDeleteMemberName }) => {
  const toggleAndSetNameHandler = () => {
    toggleModal();
    setDeleteMemberName(item.name);
  };
  return (
    <View
      style={[
        tw`rounded-md flex-row justify-between items-center`,
        styles.container,
      ]}
    >
      <View style={tw`flex-row items-center gap-3 flex-1`}>
        <Text style={[tw`text-base`, styles.name]}>{item.name}</Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[tw`text-sm shrink`, styles.email]}
        >
          {item.email}
        </Text>
      </View>
      {adminId !== item.id && (
        <TouchableOpacity style={tw``} onPress={toggleAndSetNameHandler}>
          <MaterialIcons name="delete-outline" size={24} color={Colors.red} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Member;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderColor: Colors.primaryShade,
    borderWidth: 1,
    padding: 10,
  },
  name: {
    color: Colors.primaryDark,
    fontWeight: 500,
  },
  email: {
    color: Colors.primaryDarkLighter,
  },
});
