import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../styles/colors";
import safeViewAndroid from "../../utils/safeViewAndroid";

const gradientColors = [Colors.primaryLight, Colors.primaryLight];

const TopControls = ({ navigation }) => {
  return (
    <SafeAreaView
      style={[
        tw`flex flex-row absolute top-0 z-1 items-center gap-4 justify-between mx-6`,
        safeViewAndroid.AndroidSafeArea,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.openDrawer()}
        style={[
          tw`w-13 h-13 items-center justify-center rounded-3xl`,
          styles.shadow,
          styles.accountButton,
        ]}
      >
        <AntDesign name="user" size={30} color={Colors.primaryDark} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        style={[tw`flex-1`, styles.shadow]}
        onPress={() => navigation.navigate("Groups")}
      >
        <LinearGradient
          colors={gradientColors}
          style={[tw`flex-1 items-center justify-center rounded-3xl`]}
        >
          <Text
            style={(tw``, { color: `${Colors.primary}` }, styles.selectGroup)}
          >
            select a group...
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TopControls;

const styles = StyleSheet.create({
  selectGroup: {
    fontSize: 16,
    color: `${Colors.primaryDark}`,
    fontWeight: 600,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
  },
  accountButton: {
    backgroundColor: Colors.secondaryLight,
  },
});
