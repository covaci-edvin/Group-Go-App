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
  setTransport,
} from "../../slices/navigationSlice";

const TransportOption = ({ icon, transport }) => {
  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useDispatch();

  const onPressHandler = () => {
    if (icon === "walk") {
      dispatch(setTransport("WALKING"));
    } else if (icon === "car") {
      dispatch(setTransport("DRIVING"));
    } else if (icon === "bike") {
      dispatch(setTransport("BICYCLING"));
    }
  };

  useEffect(() => {
    icon === transport ? setIsSelected(true) : setIsSelected(false);
  }, [transport]);
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View
        style={[
          tw`items-center justify-center`,
          styles.container,
          {
            borderColor: isSelected
              ? Colors.primaryDarkEvenLighter
              : "transparent",
          },
        ]}
      >
        <MaterialIcons
          name={`directions-${icon}`}
          size={30}
          color={
            isSelected ? Colors.primaryLight : Colors.primaryDarkEvenLighter
          }
        />
      </View>
    </TouchableOpacity>
  );
};

export default TransportOption;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
});
