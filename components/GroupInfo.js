import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import safeViewAndroid from "../utils/safeViewAndroid";
import { Colors } from "../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectEditGroup } from "../slices/editGroupSlice";
import MyModal from "./UI/MyModal";
import EditGroup from "./EditGroup";
import Members from "./Members";
import AddMember from "./AddMember";

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

  return (
    <SafeAreaView style={[styles.container, safeViewAndroid.AndroidSafeArea]}>
      <MyModal
        title={`Delete Member`}
        message={`You're going to delete:`}
        name={deleteMemberName}
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
      <View style={tw`flex-1`}>
        <EditGroup group={group} />
        <Members
          group={group}
          toggleModal={toggleModal}
          setDeleteMemberName={setDeleteMemberNameHandler}
        />
        <AddMember />
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
  textHeader: {
    color: Colors.primaryDarkLighter,
    fontWeight: 600,
  },
});
