import { StyleSheet, Text, View, Button } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import tw from "twrnc";
import { Colors } from "../../styles/colors";

const Loader = () => {
  return (
    <LottieView
      autoPlay
      style={[
        {
          height: 75,
          width: 75,
        },
      ]}
      // Find more Lottie files at https://lottiefiles.com/featured
      source={require("../../assets/loaders/loader.json")}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
