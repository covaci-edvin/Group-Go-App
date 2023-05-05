import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  View,
} from "react-native";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectIsGroupSelected } from "../slices/uiToggleSlice";
import { Colors } from "../styles/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const BottomControls = ({ navigation }) => {
  const isGroupSelected = useSelector(selectIsGroupSelected);
  const insets = useSafeAreaInsets();

  const [containerHeight, setContainerHeight] = useState();

  const progress = useSharedValue(75 + insets.bottom);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      height: progress.value,
    };
  }, []);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      progress.value = withSpring(75, { damping: 30 });
    });
    Keyboard.addListener("keyboardWillHide", () => {
      progress.value = withSpring(75 + insets.bottom, { damping: 30 });
    });
  }, []);

  // useEffect(() => {
  //   Keyboard.addListener("keyboardDidShow", () => {
  //     setContainerHeight(75);
  //   });
  //   Keyboard.addListener("keyboardDidHide", () => {
  //     setContainerHeight(75 + insets.bottom);
  //   });
  // }, []);

  return (
    <Animated.View
      style={[
        tw`absolute w-full z-10 bottom-0 rounded-t-3xl`,
        styles.container,
        reanimatedStyle,
      ]}
    >
      <LinearGradient
        colors={[Colors.gradientBlueLight, Colors.gradientBlue]}
        style={[tw`flex-1 rounded-t-3xl`]}
      >
        {/* <View style={tw`mx-10 flex-1 flex-row items-center justify-between`}>
        <TouchableOpacity style={tw`w-15 h-15 justify-center items-center`}>
          <Feather name="info" size={35} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-15 h-15 justify-center items-center`}>
          <Feather name="message-circle" size={35} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          tw`bg-slate-50 shadow-lg h-24 w-24 rounded-full flex items-center justify-center absolute left-1/2`,
          { transform: [{ translateX: -48 }, { translateY: -48 }] },
        ]}
      >
        <AntDesign
          name={!isGroupSelected ? "addusergroup" : "adduser"}
          size={50}
          color={Colors.primary}
        />
      </TouchableOpacity> */}

        <SafeAreaView
          style={tw`mx-10 flex-1 flex-row items-center justify-between`}
        >
          <TouchableOpacity style={tw`w-15 h-15 justify-center items-center`}>
            <Feather name="info" size={30} color={"#f8fafc"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`bg-slate-50 shadow-lg h-14 w-24 rounded-full flex items-center justify-center`,
            ]}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Groups")}
          >
            <AntDesign
              name={!isGroupSelected ? "addusergroup" : "adduser"}
              size={35}
              color={Colors.primaryDark}
            />
          </TouchableOpacity>
          <TouchableOpacity style={tw`w-15 h-15 justify-center items-center`}>
            <Feather name="message-circle" size={30} color={"#f8fafc"} />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
};

export default BottomControls;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: { height: -5, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});
