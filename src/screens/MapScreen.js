import { StyleSheet, View } from "react-native";
import React from "react";
import tw from "twrnc";
import Map from "../components/Map/Map";
import BottomControls from "../components/Map/BottomControls";
import BottomSheet from "../components/Map/BottomSheet";
import TopControls from "../components/Map/TopControls";

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
