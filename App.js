import React, { useContext, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/screens/AppNav";
import { WebSocketProvider } from "./src/context/WebSocketContext";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <WebSocketProvider>
              <NavigationContainer>
                <AppNav />
              </NavigationContainer>
            </WebSocketProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
