import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { Feather } from "@expo/vector-icons";
import StatusLabel from "./StatusLabel";
import { useDispatch, useSelector } from "react-redux";
import { setEditGroup } from "../../slices/editGroupSlice";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  resetSelectedGroup,
  selectSelectedGroup,
  setSelectedGroup,
} from "../../slices/selectedGroupSlice";
import {
  selectIsGroupSelected,
  toggleIsGroupSelected,
} from "../../slices/uiToggleSlice";

const Group = ({ name, members, adminId, accountId, group, navigation }) => {
  const dispatch = useDispatch();
  const { selectedGroup } = useSelector(selectSelectedGroup);
  const isGroupSelected = useSelector(selectIsGroupSelected);

  const opacity = useSharedValue(0);
  const height = useSharedValue(90);

  const groupReanimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  }, []);

  const selectGroupAnimationHandler = () => {
    height.value = withTiming(110, { duration: 300 });
  };

  const deselectGroupAnimationHandler = () => {
    height.value = withTiming(90, { duration: 300 });
  };

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);

  const onGroupPressHandler = () => {
    if (isGroupSelected && selectedGroup?.id === group.id) {
      dispatch(resetSelectedGroup());
      dispatch(toggleIsGroupSelected(false));
    } else {
      dispatch(setSelectedGroup(group));
      dispatch(toggleIsGroupSelected(true));
    }
  };

  useEffect(() => {
    if (selectedGroup?.id === group.id) {
      selectGroupAnimationHandler();
    } else if (selectedGroup?.id !== group.id) {
      deselectGroupAnimationHandler();
    }
  }, [selectedGroup]);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  return (
    <Animated.View style={reanimatedStyle}>
      <Animated.View style={groupReanimatedStyle}>
        <TouchableOpacity
          style={[
            styles.flatListItem,
            tw`flex-1 flex-row rounded-md`,
            {
              backgroundColor:
                selectedGroup?.id !== group.id
                  ? Colors.primaryDark
                  : Colors.primaryDarkLighter,
            },
          ]}
          activeOpacity={0.9}
          onPress={onGroupPressHandler}
        >
          <View style={tw`flex-1 p-3 justify-center`}>
            <StatusLabel
              status={"selected"}
              color={Colors.primaryTintLighter}
              display={selectedGroup?.id === group.id ? true : false}
            />

            <Text numberOfLines={1} style={[tw`text-lg`, styles.groupName]}>
              {name}
            </Text>
            <Text style={[tw``, styles.groupMemberCount]}>
              {members} {members === 1 ? "member" : "members"}
            </Text>
          </View>
          <View style={tw`w-12`}>
            <TouchableOpacity
              onPress={() => {
                dispatch(setEditGroup(group));
                navigation.navigate("GroupInfoScreen");
              }}
              activeOpacity={0.85}
              style={[
                tw`items-center justify-center grow rounded-tr-md`,
                { backgroundColor: "transparent" },
              ]}
            >
              {accountId === adminId ? (
                <Feather
                  name="edit"
                  size={20}
                  color={Colors.primaryDarkEvenLighter}
                />
              ) : (
                <Feather
                  name="info"
                  size={20}
                  color={Colors.primaryDarkEvenLighter}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                tw`items-center justify-center grow rounded-br-md`,
                {
                  backgroundColor: "transparent",
                },
              ]}
            >
              <Feather
                name="message-circle"
                size={20}
                color={Colors.primaryDarkEvenLighter}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default Group;

const styles = StyleSheet.create({
  flatListItem: {
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  groupName: {
    color: Colors.primaryDarkEvenLighter,
    fontWeight: 600,
  },
  groupMemberCount: {
    color: Colors.primaryDarkEvenLighter,
    marginTop: 5,
  },
});
