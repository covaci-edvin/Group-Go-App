import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import Modal from "react-native-modal";
import { Colors } from "../../styles/colors";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";

const MyAlertModal = ({
  message,
  isVisible,
  toggleModal,
  title,
  name,
  onConfirmHandler,
  cancelButtonMessage,
  confirmButtonMessage,
}) => {
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
          <Feather name="alert-triangle" size={35} color={Colors.red} />
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
            { color: Colors.primaryDark },
          ]}
        >
          {name}
        </Text>

        <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            onPress={toggleModal}
            activeOpacity={0.8}
            style={[
              tw`items-center justify-center rounded-full h-12 w-30`,
              styles.button,
              styles.cancelConfirm,
            ]}
          >
            <Text style={[tw`text-base`, styles.cancelConfirmText]}>
              {cancelButtonMessage ? cancelButtonMessage : "No, Keep!"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              toggleModal();
              onConfirmHandler();
            }}
            activeOpacity={0.8}
            style={[
              tw`items-center justify-center rounded-full h-12 w-30`,
              styles.button,
              styles.deleteConfirm,
            ]}
          >
            <Text style={[tw`text-base`, styles.deleteConfirmText]}>
              {confirmButtonMessage ? confirmButtonMessage : "Yes, Delete!"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MyAlertModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight,
    padding: 10,
  },
  warningIcon: {
    backgroundColor: Colors.redLight,
  },
  button: {
    // borderWidth: 1,
  },
  deleteConfirm: {
    backgroundColor: Colors.red,
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
    color: Colors.primaryDark,
    fontWeight: 700,
  },
  message: {
    color: Colors.primaryDarkLighter,
    fontWeight: 600,
  },
});
