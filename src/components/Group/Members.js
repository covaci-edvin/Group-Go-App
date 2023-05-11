import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useCallback, useContext } from "react";
import { Colors } from "../../styles/colors";
import tw from "twrnc";
import Member from "./Member";
import { useSelector } from "react-redux";
import { selectEditGroup } from "../../slices/editGroupSlice";
import { AuthContext } from "../../context/AuthContext";

const Members = ({ toggleModal, setDeleteMember, accountUserId }) => {
  const { group } = useSelector(selectEditGroup);

  const renderItem = useCallback(
    ({ item }) => (
      <Member
        groupId={group.id}
        item={item}
        adminId={group.admin.id}
        toggleModal={toggleModal}
        setDeleteMember={setDeleteMember}
        accountUserId={accountUserId}
      />
    ),
    [group]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), [group]);
  return (
    <View style={[tw`shrink`]}>
      <View style={tw`flex-row justify-end`}>
        <Text style={[tw`text-sm`, styles.membersCount]}>
          {group.members.length}{" "}
          {group.members.length === 1 ? "member" : "members"}
        </Text>
      </View>
      <View>
        <FlatList
          style={[tw`grow-0`, styles.flatlist]}
          data={group.members}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
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
