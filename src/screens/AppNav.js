import {
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useContext } from "react";
import AppStack from "../navigation/AppStack";
import AuthStack from "../navigation/AuthStack";
import { AuthContext } from "../context/AuthContext";

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      style={{ flex: 1 }}
    >
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </KeyboardAvoidingView>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
