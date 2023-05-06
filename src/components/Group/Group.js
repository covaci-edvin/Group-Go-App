import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { Feather } from "@expo/vector-icons";
import StatusLabel from "./StatusLabel";
import { useDispatch } from "react-redux";
import { setEditGroup } from "../../slices/editGroupSlice";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Group = ({ name, members, adminId, accountId, group, navigation }) => {
  const dispatch = useDispatch();
  const editAndInfoButtonColor =
    accountId === adminId ? Colors.amber : Colors.primaryTintLighter;

  const opacity = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  return (
    <Animated.View style={reanimatedStyle}>
      <TouchableOpacity
        style={[styles.flatListItem, tw`flex-row rounded-md`]}
        activeOpacity={0.7}
      >
        <View style={tw`flex-1 p-3 justify-center`}>
          {accountId === adminId ? (
            <StatusLabel status={"admin"} color={Colors.amber} />
          ) : (
            <StatusLabel status={"member"} color={Colors.primaryTintLighter} />
          )}
          <Text numberOfLines={1} style={[tw`text-lg`, styles.groupName]}>
            {name}
          </Text>
          <Text style={[tw``, styles.groupMemberCount]}>
            {members} {members === 1 ? "member" : "members"}
          </Text>
        </View>
        <View style={tw`flex-initial justify-between`}>
          <TouchableOpacity
            onPress={() => {
              dispatch(setEditGroup(group));
              navigation.navigate("GroupInfoScreen");
            }}
            activeOpacity={0.85}
            style={[
              tw`items-center justify-center w-14 h-14 rounded-tr-md`,
              { backgroundColor: editAndInfoButtonColor },
            ]}
          >
            {accountId === adminId ? (
              <Feather
                name="edit"
                size={20}
                color={Colors.primaryDarkLighter}
              />
            ) : (
              <Feather
                name="info"
                size={20}
                color={Colors.primaryDarkLighter}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              tw`items-center justify-center w-14 h-14 rounded-br-md`,
              {
                backgroundColor: Colors.primaryTintLighter,
              },
            ]}
          >
            <Feather
              name="message-circle"
              size={20}
              color={Colors.primaryDarkLighter}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Group;

const styles = StyleSheet.create({
  flatListItem: {
    backgroundColor: Colors.primaryShade,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  groupName: {
    color: Colors.primaryLight,
    fontWeight: 600,
    marginTop: 5,
  },
  groupMemberCount: {
    color: Colors.primaryLight,
    marginTop: 5,
  },
});
