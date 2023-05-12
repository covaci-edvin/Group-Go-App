import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { WebSocketContext } from "../../context/WebSocketContext";
import { useSelector } from "react-redux";
import { selectSelectedGroup } from "../../slices/selectedGroupSlice";
import { AuthContext } from "../../context/AuthContext";

const InviteSection = ({ destination }) => {
  const { sendInvitation } = useContext(WebSocketContext);
  const { userInfo } = useContext(AuthContext);
  const { selectedGroup } = useSelector(selectSelectedGroup);
  return (
    <View style={tw`flex-row justify-between items-center`}>
      <View style={tw`w-1/1.7`}>
        <Text
          numberOfLines={2}
          style={[tw`text-xs text-center`, styles.message]}
        >
          Send a join route invitation to the group members
        </Text>
      </View>
      <TouchableOpacity
        style={[
          tw`items-center justify-center rounded-3xl shadow-md flex-row gap-1`,
          styles.button,
        ]}
        onPress={() => {
          sendInvitation(
            selectedGroup.id,
            userInfo.user.name,
            selectedGroup.name,
            destination
          );
        }}
      >
        <MaterialIcons name="send" size={20} color={Colors.primaryLight} />
      </TouchableOpacity>
    </View>
  );
};

export default InviteSection;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 130,
    borderColor: Colors.primaryShade,
    borderRightWidth: 2,
    borderLeftWidth: 2,

    backgroundColor: Colors.primaryDark,
  },
  text: {
    fontWeight: 600,
    color: Colors.primaryLight,
  },
  message: {
    color: Colors.primaryDarkEvenLighter,
  },
});
