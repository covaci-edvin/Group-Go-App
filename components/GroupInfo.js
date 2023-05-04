import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useCallback } from "react";
import safeViewAndroid from "../utils/safeViewAndroid";
import { Colors } from "../styles/colors";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { object, string } from "yup";
import { Formik } from "formik";

let editGroupValidationSchema = object({
  groupName: string().required("Please enter a group name"),
  groupDescription: string(),
});

import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectEditGroup } from "../slices/editGroupSlice";
import Member from "./Member";
import MyModal from "./UI/MyModal";
import Input from "./UI/Input";
import EditGroup from "./EditGroup";

const GroupInfo = ({ navigation }) => {
  const { group } = useSelector(selectEditGroup);
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteMemberName, setDeleteMemberName] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const setDeleteMemberNameHandler = (payload) => {
    setDeleteMemberName(payload);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <Member
        item={item}
        adminId={group.admin.id}
        toggleModal={toggleModal}
        setDeleteMemberName={setDeleteMemberNameHandler}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <SafeAreaView style={[styles.container, safeViewAndroid.AndroidSafeArea]}>
      <MyModal
        title={`Delete Member`}
        message={`You're going to delete ${deleteMemberName} from this group. Are you sure?`}
        isVisible={isModalVisible}
        toggleModal={toggleModal}
      />
      <View style={tw`flex-row items-center justify-between mx-6`}>
        <Text style={[tw`text-xl`, styles.textHeader]}>About</Text>
        <TouchableOpacity
          style={tw`h-10 w-10 items-end justify-center`}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color={Colors.primaryDarkLighter} />
        </TouchableOpacity>
      </View>
      <EditGroup group={group} />
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
      <View style={[tw`items-center`, styles.buttonContainer]}>
        <TouchableOpacity
          style={[
            tw`flex-row items-center justify-center w-full gap-1 rounded-md`,
            styles.button,
          ]}
        >
          <AntDesign name={"adduser"} size={24} color={Colors.primaryLight} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GroupInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight,
    flex: 1,
  },
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
  textHeader: {
    color: Colors.primaryDarkLighter,
    fontWeight: 600,
  },
  groupName: {
    color: Colors.primaryLight,
    fontWeight: 600,
  },
  groupDescription: {
    color: Colors.primaryLight,
    fontWeight: 500,
  },
  button: {
    backgroundColor: Colors.primaryShade,
    padding: 10,
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
});
