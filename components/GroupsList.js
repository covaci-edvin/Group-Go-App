import { StyleSheet, FlatList, View } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import Group from "./Group";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectGroups } from "../slices/groupsSlice";

const GroupsList = ({ navigation, accountId }) => {
  const { groups } = useSelector(selectGroups);
  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => prevIndex + 1);
  //   }, 50);
  //   console.log("suiiii");
  //   return () => clearInterval(interval);
  // }, []);

  const renderItem = useCallback(({ item, index }) => {
    // if (index <= currentIndex) {
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
    // } else {
    //   return null;
    // }
  }, []);
  const keyExtractor = useCallback((item) => item.id.toString(), []);

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
