import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectAccount } from "../slices/accountSlice";
import { Colors } from "../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import safeViewAndroid from "../utils/safeViewAndroid";
import { selectIsGroupSelected } from "../slices/uiToggleSlice";
import { selectEditGroup } from "../slices/editGroupSlice";
import Group from "./Group";

const Groups = ({ navigation }) => {
  const { account } = useSelector(selectAccount);
  const isGroupSelected = useSelector(selectIsGroupSelected);
  const data = account.groups;

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
      <FlatList
        style={[tw`px-3 py-3`, styles.flatList]}
        data={data}
        renderItem={({ item }) => (
          <Group
            group={item}
            name={item.name}
            members={item.members.length}
            adminId={item.admin.id}
            accountId={account.id}
            navigation={navigation}
          />
        )}
      />
      <View style={[tw`items-center`, styles.footerContainer]}>
        <TouchableOpacity
          style={[
            tw`flex-row items-center justify-center w-1/2 gap-1 rounded-full h-12`,
            styles.button,
          ]}
          onPress={() => navigation.navigate("CreateGroupScreen")}
        >
          <Text style={[styles.text]}>New group</Text>
          <AntDesign
            name={!isGroupSelected ? "addusergroup" : "adduser"}
            size={30}
            color={Colors.primaryDark}
          />
        </TouchableOpacity>
      </View>
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
  footerContainer: {
    backgroundColor: Colors.primaryLight,
  },
  textHeader: {
    color: Colors.primaryDarkLighter,
    fontWeight: 600,
  },
  flatList: {
    backgroundColor: Colors.primaryLight,
  },
  text: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontWeight: 600,
  },
  button: {
    borderColor: Colors.primaryDark,
    borderWidth: 1,
    marginVertical: 20,
    paddingVertical: 3,
  },
});
