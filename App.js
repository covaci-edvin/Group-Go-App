import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/screens/AppNav";
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
