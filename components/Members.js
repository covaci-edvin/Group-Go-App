import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useCallback } from "react";
import { Colors } from "../styles/colors";
import tw from "twrnc";
import Member from "./Member";

const Members = ({ group, toggleModal, setDeleteMemberName }) => {
  const renderItem = useCallback(
    ({ item }) => (
      <Member
        item={item}
        adminId={group.admin.id}
        toggleModal={toggleModal}
        setDeleteMemberName={setDeleteMemberName}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);
  return (
    <View style={tw`shrink`}>
      <View style={tw`flex-row justify-end`}>
        <Text style={[tw`text-sm`, styles.membersCount]}>
          {group.members.length}{" "}
          {group.members.length === 1 ? "member" : "members"}
        </Text>
      </View>
      <FlatList
        style={[tw`grow-0`, styles.flatlist]}
        data={group.members}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Members;

const styles = StyleSheet.create({
  membersCount: {
    marginTop: 10,
    marginHorizontal: 10,
    fontWeight: 500,
    color: Colors.primaryDarkLighter,
  },
  flatlist: {
    marginTop: 5,
    marginHorizontal: 10,
  },
});
