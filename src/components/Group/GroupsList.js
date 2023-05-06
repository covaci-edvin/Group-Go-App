import { StyleSheet, FlatList } from "react-native";
import React, { useCallback } from "react";
import Group from "./Group";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectGroups } from "../../slices/groupsSlice";

const GroupsList = ({ navigation, accountId }) => {
  const { groups } = useSelector(selectGroups);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Group
          group={item}
          name={item.name}
          members={item.members.length}
          adminId={item.admin.id}
          accountId={accountId}
          navigation={navigation}
        />
      );
    },
    [groups]
  );
  const keyExtractor = useCallback((item) => item.id.toString(), [groups]);

  return (
    <FlatList
      style={[tw`px-3 py-3`]}
      data={groups}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default GroupsList;

const styles = StyleSheet.create({});
