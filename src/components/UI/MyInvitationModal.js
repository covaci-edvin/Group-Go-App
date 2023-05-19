import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Modal from "react-native-modal";
import { Colors } from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";

import tw from "twrnc";
import { WebSocketContext } from "../../context/WebSocketContext";
import { useSelector } from "react-redux";
import {
  selectInvitedRouteAdminId,
  selectInvitedRouteGroupId,
} from "../../slices/invitedRouteSlice";
import { selectSelectedGroup } from "../../slices/selectedGroupSlice";
import { selectOrigin } from "../../slices/navigationSlice";

const MyInvitationModal = ({
  isVisible,
  toggleModal,
  message,
  title,
  name,
  onJoinHandler,
  onDeclineHandler,
}) => {
  const { joinGroupRoute, responseLocationBroadCast } =
    useContext(WebSocketContext);
  const invitedRouteAdminId = useSelector(selectInvitedRouteAdminId);
  const invitedRouteGroupId = useSelector(selectInvitedRouteGroupId);
  const selectedGroup = useSelector(selectSelectedGroup);
  const origin = useSelector(selectOrigin);

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={Colors.primaryDark}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
    >
      <View
        style={[tw`rounded-md shadow-lg w-70 self-center `, styles.container]}
      >
        <View
          style={[
            tw`self-center w-15 h-15 rounded-full items-center justify-center`,
            styles.warningIcon,
          ]}
        >
          <Ionicons
            name="notifications"
            size={40}
            color={Colors.primaryShade}
          />
        </View>
        <Text style={[tw`text-center text-lg mb-1 mt-2`, styles.title]}>
          {title}
        </Text>
        <Text style={[tw`text-center text-sm mb-1`, styles.message]}>
          {message}
        </Text>
        <Text
          style={[
            tw`mb-3 text-center text-sm font-bold`,
            { color: Colors.primaryLight },
          ]}
        >
          {name}
        </Text>

        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            onPress={() => {
              onDeclineHandler();
            }}
            activeOpacity={0.8}
            style={[
              tw`items-center justify-center rounded-full h-12 w-30`,
              styles.button,
              styles.cancelConfirm,
            ]}
          >
            <Text style={[tw`text-base`, styles.cancelConfirmText]}>
              Decline
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onJoinHandler();
              joinGroupRoute(invitedRouteAdminId);
              // responseLocationBroadCast(
              //   invitedRouteGroupId,
              //   origin.coordinates
              // );
            }}
            activeOpacity={0.8}
            style={[
              tw`items-center justify-center rounded-full h-12 w-30`,
              styles.button,
              styles.deleteConfirm,
            ]}
          >
            <Text style={[tw`text-base`, styles.deleteConfirmText]}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MyInvitationModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDark,
    padding: 10,
  },
  warningIcon: {
    backgroundColor: Colors.primaryTint,
  },
  deleteConfirm: {
    backgroundColor: Colors.primaryShade,
  },
  deleteConfirmText: {
    color: Colors.primaryLight,
    fontWeight: 600,
  },
  cancelConfirm: {
    backgroundColor: Colors.primaryTintLighter,
  },
  cancelConfirmText: {
    color: Colors.primaryDarkLighter,
    fontWeight: 600,
  },
  title: {
    color: Colors.primaryLight,
    fontWeight: 700,
  },
  message: {
    color: Colors.primaryDarkEvenLighter,
    fontWeight: 600,
  },
});
