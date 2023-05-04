import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Map from "../components/Map";
import BottomControls from "../components/BottomControls";
import BottomSheet from "../components/BottomSheet";
import TopControls from "../components/TopControls";
import Account from "../components/Account";

const MapScreen = (props) => {
  return (
    <View style={tw`flex-1`}>
      <TopControls navigation={props.navigation} />
      <Map />
      <BottomSheet />
      <BottomControls navigation={props.navigation} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
