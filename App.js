import React, { useContext } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";
import { KeyboardAvoidingView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./context/AuthContext";
import AppNav from "./screens/AppNav";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <MenuProvider>
              <NavigationContainer>
                <AppNav />
              </NavigationContainer>
            </MenuProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
