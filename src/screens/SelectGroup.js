import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { Colors } from "../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import safeViewAndroid from "../utils/safeViewAndroid";
import GroupsList from "../components/Group/GroupsList";
import Button from "../components/UI/Button";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedGroup } from "../slices/selectedGroupSlice";

const Groups = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const { componentIsLoading } = useContext(AuthContext);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[styles.container, safeViewAndroid.AndroidSafeArea]}>
      <View
        style={[
          tw`flex-row items-center justify-between px-6`,
          styles.headerContainer,
        ]}
      >
        <Text style={[tw`text-lg`, styles.textHeader]}>Groups</Text>

        <TouchableOpacity
          style={tw`h-10 w-10 items-end justify-center`}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color={Colors.primaryDarkLighter} />
        </TouchableOpacity>
      </View>
      <View style={tw`items-center`}>
        <Text style={[tw`text-sm `, styles.instructions]}>
          tap a group to select
        </Text>
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
    backgroundColor: Colors.primaryDark,
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 3,
  },

  textHeader: {
    color: Colors.primaryDarkLighter,
    fontWeight: 600,
  },
  instructions: {
    color: Colors.primaryDarkLighter,
    fontWeight: 400,
  },
});
