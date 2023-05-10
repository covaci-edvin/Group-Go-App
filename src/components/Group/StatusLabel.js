import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { selectIsGroupSelected } from "../../slices/uiToggleSlice";

const StatusLabel = ({ status, color, display }) => {
  const isGroupSelected = useSelector(selectIsGroupSelected);
  const height = useSharedValue(0);
  const marginBottom = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      marginBottom: marginBottom.value,
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  }, []);

  if (display) {
    height.value = withSpring(20, { damping: 40 });
    marginBottom.value = withTiming(5, { duration: 20 });
    scale.value = withDelay(200, withSpring(1, { damping: 8 }));
    opacity.value = withTiming(1, { duration: 20 });
  } else {
    height.value = withSpring(0, { damping: 40 });
    marginBottom.value = withTiming(0, { duration: 20 });
    scale.value = withSpring(1, { damping: 20 });
    opacity.value = withTiming(0, { duration: 300 });
  }

  // useEffect(() => {
  //   if (isGroupSelected) {
  //     height.value = withSpring(20, { damping: 40 });
  //     marginBottom.value = withTiming(5, { duration: 20 });
  //     scale.value = withSpring(1, { damping: 3 });
  //   } else {
  //     height.value = withSpring(0, { damping: 40 });
  //     marginBottom.value = withTiming(0, { duration: 20 });
  //     scale.value = withSpring(0.8, { damping: 3 });
  //   }
  // }, [isGroupSelected]);

  return (
    <Animated.View
      style={[
        { backgroundColor: color },
        reanimatedStyle,
        tw`items-center justify-center rounded-full  w-18`,
      ]}
    >
      <Text
        style={[
          tw`font-semibold flex-none`,
          { color: Colors.primaryDarkLighter },
        ]}
      >
        {status}
      </Text>
    </Animated.View>
  );
};

export default StatusLabel;

const styles = StyleSheet.create({});
