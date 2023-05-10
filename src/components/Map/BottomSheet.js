import { StyleSheet, Keyboard, View, Platform } from "react-native";
import React, { useCallback, useEffect } from "react";
import tw from "twrnc";
import { Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import DestinationSearch from "./DestinationSearch";
import { Colors } from "../../styles/colors";
import { useSelector } from "react-redux";
import { selectDestination } from "../../slices/navigationSlice";
import DestinationInfo from "./DestinationInfo";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomSheet = () => {
  const destination = useSelector(selectDestination);

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const insets = useSafeAreaInsets();

  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 80;
  const MIN_TRANSLATE_Y = -SCREEN_HEIGHT / 5.2 - insets.bottom;
  const MID_TRANSLATE_Y = -SCREEN_HEIGHT / 3.5;
  const scrollTo = useCallback((destination, damping) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: damping });
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      translateY.value = Math.min(translateY.value, MIN_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value < -SCREEN_HEIGHT / 2) {
        scrollTo(MAX_TRANSLATE_Y, 50);
      } else if (translateY.value > -SCREEN_HEIGHT / 2) {
        scrollTo(MIN_TRANSLATE_Y, 50);
      }
    });

  useEffect(() => {
    translateY.value = withSpring(MIN_TRANSLATE_Y);
  }, []);

  useEffect(() => {
    destination.coordinates.latitude
      ? scrollTo(MID_TRANSLATE_Y, 50)
      : scrollTo(MIN_TRANSLATE_Y, 50);
    Keyboard.addListener("keyboardDidShow", () => {
      scrollTo(MAX_TRANSLATE_Y, 50);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      destination.coordinates.latitude
        ? scrollTo(MID_TRANSLATE_Y, 50)
        : scrollTo(MIN_TRANSLATE_Y, 50);
    });
  }, [destination]);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector
      gesture={destination.coordinates.latitude ? Gesture.Tap() : gesture}
    >
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          rBottomSheetStyle,
          tw`rounded-3xl flex-1 shadow-lg`,
        ]}
      >
        <View style={[tw`rounded-3xl overflow-hidden`, styles.container]}>
          <BlurView
            intensity={100}
            style={[tw`flex-1`, styles.blur, styles.shadow]}
          >
            {!destination.coordinates.latitude && (
              <View style={[styles.line]} />
            )}
            {destination.coordinates.latitude ? (
              <DestinationInfo />
            ) : (
              <DestinationSearch />
            )}
          </BlurView>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    zIndex: 10,
    position: "absolute",
    top: SCREEN_HEIGHT,
    backgroundColor: Platform.OS === "ios" ? "transparent" : Colors.primaryDark,
  },
  line: {
    width: 50,
    height: 4,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor:
      Platform.OS === "ios"
        ? Colors.primaryDarkEvenLighter
        : Colors.primaryDarkEvenLighter,
  },
  blur: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { height: -5, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});