import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNoBikeRouteError,
  selectTransport,
} from "../../slices/navigationSlice";
import TransportOption from "./TransportOption";

const TransportSelect = () => {
  const transport = useSelector(selectTransport);

  const dispatch = useDispatch();
  const [trasportOption, setTransportOption] = useState();

  useEffect(() => {
    if (transport === "DRIVING") setTransportOption("car");
    if (transport === "WALKING") setTransportOption("walk");
    if (transport === "BICYCLING") setTransportOption("bike");
  }, [transport]);

  // walk, car, bike

  return (
    <View
      style={[tw`flex-row items-center justify-around mt-3`, styles.container]}
    >
      <TransportOption icon={"walk"} transport={trasportOption} />
      <TransportOption icon={"car"} transport={trasportOption} />
      <TransportOption icon={"bike"} transport={trasportOption} />
    </View>
  );
};

export default TransportSelect;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
