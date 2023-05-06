import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import safeViewAndroid from "../utils/safeViewAndroid";
import { Colors } from "../styles/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectEditGroup } from "../slices/editGroupSlice";
import MyAlertModal from "../components/UI/MyAlertModal";
import EditGroup from "../components/Group/EditGroup";
import Members from "../components/Group/Members";
import AddMember from "../components/Group/AddMember";
import { AuthContext } from "../context/AuthContext";
import MyResponseModal from "../components/UI/MyResponseModal";
import GroupHeaderInfo from "../components/Group/GroupHeaderInfo";

const GroupInfo = ({ navigation }) => {
  const { group } = useSelector(selectEditGroup);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteGroupModalVisible, setIsDeleteGroupModalVisible] =
    useState(false);
  const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
  const [deleteMemberName, setDeleteMemberName] = useState();
  const [deleteMemberEmail, setDeleteMemberEmail] = useState();
  const {
    addMemberErrorMessage,
    userInfo,
    deleteMember,
    deleteGroup,
    leaveGroup,
  } = useContext(AuthContext);

  const toggleDeleteMemberModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDeleteGroupModal = () => {
    setIsDeleteGroupModalVisible(!isDeleteGroupModalVisible);
  };

  const toggleLeaveModal = () => {
    setIsLeaveModalVisible(!isLeaveModalVisible);
  };

  const setDeleteMemberHandler = (name, email) => {
    setDeleteMemberName(name);
    setDeleteMemberEmail(email);
  };

  const deleteMemberHandler = () => {
    deleteMember(group.id, deleteMemberEmail);
  };

  const goBackAfterOneSecond = () => {
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  const deleteGroupHandler = () => {
    deleteGroup(group.id);
    goBackAfterOneSecond();
  };

  const leaveGroupHandler = () => {
    leaveGroup(group.id, userInfo.user.email);
    goBackAfterOneSecond();
  };

  return (
    <SafeAreaView style={[styles.container, safeViewAndroid.AndroidSafeArea]}>
      {addMemberErrorMessage && (
        <MyResponseModal
          message={
            "We have sent an email just to let him know that you need him here 🙂"
          }
          title={"User does not exist!"}
        />
      )}
      <MyAlertModal
        onConfirmHandler={deleteMemberHandler}
        title={`Delete Member`}
        message={`You're going to delete:`}
        name={deleteMemberName}
        isVisible={isModalVisible}
        toggleModal={toggleDeleteMemberModal}
      />
      <MyAlertModal
        onConfirmHandler={deleteGroupHandler}
        title={`Delete Group`}
        message={`You're going to delete:`}
        name={group.name}
        isVisible={isDeleteGroupModalVisible}
        toggleModal={toggleDeleteGroupModal}
      />
      <MyAlertModal
        onConfirmHandler={leaveGroupHandler}
        title={`Leave Group`}
        message={`You're going to leave group:`}
        name={group.name}
        isVisible={isLeaveModalVisible}
        toggleModal={toggleLeaveModal}
        confirmButtonMessage={"Yes, Leave!"}
        cancelButtonMessage={"No, Stay!"}
      />
      <View
        style={[
          tw`flex-row items-center justify-between`,
          styles.headerContainer,
        ]}
      >
        <TouchableOpacity
          style={tw`h-10 w-10 items-center justify-center`}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={Colors.primaryDarkLighter}
          />
        </TouchableOpacity>
        {userInfo.user.id === group.admin.id ? (
          <TouchableOpacity
            style={tw`h-10 w-10 items-center justify-center`}
            onPress={() => {
              toggleDeleteGroupModal();
            }}
          >
            <MaterialIcons
              name="delete-outline"
              size={24}
              color={Colors.primaryDarkLighter}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={tw`h-10 w-10 items-center justify-center`}
            onPress={() => {
              toggleLeaveModal();
            }}
          >
            <Ionicons
              name="exit-outline"
              size={24}
              color={Colors.primaryDarkLighter}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={tw`flex-1`}>
        {userInfo.user.id === group.admin.id ? (
          <EditGroup group={group} />
        ) : (
          <GroupHeaderInfo group={group} />
        )}
        <Members
          groupId={group.id}
          accountUserId={userInfo.user.id}
          toggleModal={toggleDeleteMemberModal}
          setDeleteMember={setDeleteMemberHandler}
        />
        {userInfo.user.id === group.admin.id && (
          <AddMember groupId={group.id} />
        )}
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
  headerContainer: {
    marginHorizontal: 10,
  },
});
