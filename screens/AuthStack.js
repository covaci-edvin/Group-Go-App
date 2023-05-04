import { SafeAreaView, StyleSheet, View, Keyboard } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../styles/colors";
import safeViewAndroid from "../utils/safeViewAndroid";
import ForgotPassword from "../components/Auth/ForgotPassword";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import SignupAndLoginStack from "../components/Auth/SignupAndLoginStack";

const Stack = createNativeStackNavigator();

const AuthStack = (props) => {
  const progress = useSharedValue(190);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      width: progress.value,
      height: progress.value,
    };
  }, []);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      progress.value = withSpring(110, { damping: 30 });
    });
    Keyboard.addListener("keyboardDidHide", () => {
      progress.value = withSpring(190, { damping: 30 });
    });
  }, []);

  return (
    <SafeAreaView
      style={[
        tw`flex-1`,
        styles.rootContainer,
        safeViewAndroid.AndroidSafeArea,
      ]}
    >
      <View style={[tw`items-center`, styles.header]}>
        <Animated.Image
          source={require("../assets/GGo-logo-round.png")}
          style={[
            tw`items-center justify-center`,
            {
              resizeMode: "contain",
            },
            reanimatedStyle,
          ]}
        />
      </View>
      <Stack.Navigator>
        <Stack.Screen
          name="SelectGroupScreen"
          component={SignupAndLoginStack}
          options={{ headerShown: false }}
          navigation={props.navigation}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
          navigation={props.navigation}
        />
      </Stack.Navigator>
      {/* <Tab.Navigator
        style={{ backgroundColor: Colors.primaryLight }}
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 700,
            textTransform: "capitalize",
          },
          tabBarIndicatorStyle: {
            borderRadius: 5,
            backgroundColor: Colors.primaryShade,
            height: 3,
            shadowColor: "#fff",
          },
          tabBarContentContainerStyle: {},
          tabBarActiveTintColor: Colors.primaryShade,
          tabBarInactiveTintColor: Colors.primaryDarkEvenLighter,
          tabBarStyle: {
            backgroundColor: Colors.primaryLight,
          },
          tabBarItemStyle: { borderBottomColor: Colors.primaryDark },
          tabBarBounces: true,
        }}
      >
        <Tab.Screen
          name="Login"
          component={Login}
          navigation={props.navigation}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Sign up"
          component={SignUp}
          navigation={props.navigation}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ForgotPassword"
          component={SignUp}
          navigation={props.navigation}
          options={{ headerShown: false, tsabBarVisible: false }}
        />
      </Tab.Navigator> */}
    </SafeAreaView>
  );
};

export default AuthStack;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryLight,
  },
  rootContainer: {
    backgroundColor: Colors.primaryLight,
    flex: 1,
  },
});
