import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { DrawerItemList } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { selectAccount } from "../slices/accountSlice";
import tw from "twrnc";
import safeViewAndroid from "../utils/safeViewAndroid";

import { Colors } from "../styles/colors";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const Account = (props) => {
  const { account } = useSelector(selectAccount);
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={[styles.container, safeViewAndroid.AndroidSafeArea]}>
      <View style={tw`flex-1`}>
        <View style={[tw`h-23 justify-end gap-1`, styles.account]}>
          <Text numberOfLines={1} style={[tw`text-3xl`, styles.name]}>
            {account.name}
          </Text>
          <Text style={[styles.email]}>{account.email}</Text>

          <TouchableOpacity style={[tw`absolute top-2 right-2`, styles.edit]}>
            <Feather name="edit" size={20} color={Colors.primaryDark} />
          </TouchableOpacity>
        </View>
        <DrawerItemList {...props} />
        <TouchableOpacity
          style={[
            tw`flex-row items-center justify-center gap-2 rounded-full w-25 mt-5`,
            styles.logoutContainer,
          ]}
          onPress={() => logout()}
        >
          <SimpleLineIcons
            name="logout"
            size={23}
            color={Colors.primaryDarkLighter}
          />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  account: {
    marginHorizontal: 10,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 20,
    backgroundColor: Colors.primaryLight,
  },
  name: {
    color: Colors.primaryDark,
    fontWeight: 600,
  },
  email: {
    color: Colors.primaryDark,
    fontWeight: 500,
  },
  edit: {
    // transform: [{ translateY: 10 }],
  },
  logoutContainer: {
    marginHorizontal: 10,

    padding: 8,
    backgroundColor: Colors.primaryDarkEvenLighter,
  },
  logoutText: {
    color: Colors.primaryDarkLighter,
    // fontSize: 16,
  },
});
