import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { Colors } from "../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import safeViewAndroid from "../utils/safeViewAndroid";
import { selectIsGroupSelected } from "../slices/uiToggleSlice";
import GroupsList from "../components/Group/GroupsList";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/UI/Button";

const Groups = ({ navigation }) => {
  const isGroupSelected = useSelector(selectIsGroupSelected);
  const { componentIsLoading, userInfo } = useContext(AuthContext);

  return (
    <SafeAreaView style={[styles.container, safeViewAndroid.AndroidSafeArea]}>
      <View
        style={[
          tw`flex-row items-center justify-between px-6`,
          styles.headerContainer,
        ]}
      >
        <Text style={[tw`text-xl`, styles.textHeader]}>Groups</Text>
        <TouchableOpacity
          style={tw`h-10 w-10 items-end justify-center`}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color={Colors.primaryDarkLighter} />
        </TouchableOpacity>
      </View>
      {componentIsLoading ? (
        <Text>is loading</Text>
      ) : (
        <GroupsList accountId={userInfo.user.id} navigation={navigation} />
      )}

      <Button
        onPress={() => navigation.navigate("CreateGroupScreen")}
        text={"New group"}
      />
    </SafeAreaView>
  );
};

export default Groups;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight,
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 3,
  },

  textHeader: {
    color: Colors.primaryDarkLighter,
    fontWeight: 600,
  },
});
