import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { useSelector } from "react-redux";
import { selectSelectedGroup } from "../../slices/selectedGroupSlice";
import { selectJoinedMembers } from "../../slices/invitedRouteSlice";
import Loader from "../UI/Loader";

import { Feather } from "@expo/vector-icons";

const WaitingToJoin = () => {
  const { selectedGroup } = useSelector(selectSelectedGroup);
  const joinedMembers = useSelector(selectJoinedMembers);

  return (
    <View style={tw`flex-row items-center gap-3`}>
      <View style={tw`items-center justify-center h-7 w-7`}>
        {joinedMembers.length !== selectedGroup.members.length - 1 ? (
          <Loader />
        ) : (
          <Feather name="check" size={24} color={Colors.primaryDark} />
        )}
      </View>

      <Text style={[tw`text-sm w-1/1.2`, styles.message]}>
        {joinedMembers.length === 0
          ? "Waiting for the group members to join..."
          : `${joinedMembers.length} / ${
              selectedGroup.members.length - 1
            } joined`}
      </Text>
    </View>
  );
};

export default WaitingToJoin;

const styles = StyleSheet.create({
  message: {
    color: Colors.primaryDarkEvenLighter,
  },
});
