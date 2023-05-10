import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useContext } from "react";
import Modal from "react-native-modal";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";

const MyResponseModal = ({ message, title }) => {
  const { setAddMemberErrorMessage } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(true);

  const toggleModal = () => {
    setIsVisible((prev) => !prev);
  };

  const closeModalHandler = () => {
    toggleModal();
    const timer = setTimeout(() => {
      setAddMemberErrorMessage("");
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropColor={Colors.primaryDark}
      onBackButtonPress={closeModalHandler}
      onBackdropPress={closeModalHandler}
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
        <Text style={[tw`text-center text-sm mb-4`, styles.message]}>
          {message}
        </Text>
        <View style={tw`flex-row justify-center`}>
          <TouchableOpacity
            onPress={closeModalHandler}
            activeOpacity={0.8}
            style={[
              tw`items-center justify-center rounded-full h-12 w-30`,
              styles.cancelConfirm,
            ]}
          >
            <Text style={[tw`text-base`, styles.cancelConfirmText]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MyResponseModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDark,
    padding: 10,
  },
  warningIcon: {
    backgroundColor: Colors.primaryTint,
  },
  title: {
    color: Colors.primaryLight,
    fontWeight: 700,
  },
  message: {
    color: Colors.primaryDarkEvenLighter,
    fontWeight: 600,
  },
  cancelConfirm: {
    backgroundColor: Colors.primaryTintLighter,
  },
  cancelConfirmText: {
    color: Colors.primaryDarkLighter,
    fontWeight: 600,
  },
});
