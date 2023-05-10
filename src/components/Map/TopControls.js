import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../styles/colors";
import safeViewAndroid from "../../utils/safeViewAndroid";
import { useSelector } from "react-redux";
import { selectSelectedGroup } from "../../slices/selectedGroupSlice";
import { selectIsGroupSelected } from "../../slices/uiToggleSlice";

const gradientColors = [Colors.primaryDark, Colors.primaryDark];

const TopControls = ({ navigation }) => {
  const { selectedGroup } = useSelector(selectSelectedGroup);
  const isGroupSelected = useSelector(selectIsGroupSelected);

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
        onPress={() => {
          navigation.navigate("Groups");
        }}
      >
        <LinearGradient
          colors={gradientColors}
          style={[tw`flex-1 rounded-3xl`]}
        >
          {!isGroupSelected ? (
            <View style={tw`flex-1 items-center justify-center`}>
              <Text
                numberOfLines={1}
                style={
                  (tw``,
                  { color: `${Colors.primaryLight}` },
                  styles.selectGroup)
                }
              >
                select a group...
              </Text>
            </View>
          ) : (
            <View style={tw`flex-1 flex-row items-center justify-between mx-4`}>
              <Text numberOfLines={1} style={styles.selectGroup}>
                {selectedGroup.name}
              </Text>
              <View
                style={[
                  tw`h-6 w-6 items-center justify-center rounded-full`,
                  styles.membersContainer,
                ]}
              >
                <Text style={styles.membersText}>
                  {selectedGroup.members.length}
                </Text>
              </View>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TopControls;

const styles = StyleSheet.create({
  selectGroup: {
    fontSize: 16,
    color: Colors.primaryDarkEvenLighter,
    fontWeight: 600,
    flexShrink: 1,
  },
  shadow: {
    shadowColor: Colors.primaryDark,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
  },
  accountButton: {
    backgroundColor: Colors.primaryShade,
  },
  membersText: {
    fontWeight: 600,
    color: Colors.primaryDark,
  },
  membersContainer: {
    backgroundColor: Colors.primaryDarkEvenLighter,
  },
});
