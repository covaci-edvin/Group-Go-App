import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Member = ({
  item,
  adminId,
  toggleModal,
  setDeleteMember,
  accountUserId,
}) => {
  const toggleAndSetNameHandler = () => {
    toggleModal();
    setDeleteMember(item.name, item.email);
  };

  const opacity = useSharedValue(0);
  const padding = useSharedValue(0);
  const borderWidth = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      padding: padding.value,
      borderWidth: borderWidth.value,
    };
  }, []);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 750 });
    borderWidth.value = withTiming(1, { duration: 750 });
    padding.value = withSpring(10, { damping: 30 });
  }, []);

  return (
    <Animated.View
      style={[
        tw`rounded-md flex-row justify-between items-center`,
        styles.container,
        reanimatedStyle,
      ]}
    >
      <View style={tw`flex-row items-center gap-3 flex-1`}>
        <Text style={[tw`text-base`, styles.name]}>{item.name}</Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[tw`text-sm shrink`, styles.email]}
        >
          {item.email}
        </Text>
      </View>
      {adminId !== item.id ? (
        adminId === accountUserId && (
          <TouchableOpacity
            style={tw``}
            onPress={() => {
              toggleAndSetNameHandler();
            }}
          >
            <MaterialIcons name="delete-outline" size={24} color={Colors.red} />
          </TouchableOpacity>
        )
      ) : (
        <Text style={[tw`font-bold`, { color: Colors.primaryShade }]}>
          admin
        </Text>
      )}
    </Animated.View>
  );
};

export default Member;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderColor: Colors.primaryShade,
  },
  name: {
    color: Colors.primaryDark,
    fontWeight: 500,
  },
  email: {
    color: Colors.primaryDarkLighter,
  },
});
