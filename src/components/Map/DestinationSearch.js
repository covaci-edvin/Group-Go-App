import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import tw from "twrnc";
import { useDispatch } from "react-redux";
import { setDestination } from "../../slices/navigationSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Colors } from "../../styles/colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DestinationSearch = () => {
  const dispatch = useDispatch();

  const opacity = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  return (
    <Animated.View style={reanimatedStyle}>
      <GooglePlacesAutocomplete
        styles={toInputBoxStyles}
        fetchDetails={true}
        minLength={2}
        onPress={(data, details = null) => {
          dispatch(
            setDestination({
              coordinates: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
              description: data.description,
            })
          );
        }}
        textInputProps={{
          placeholderTextColor: Colors.primaryDarkEvenLighter,
          color: Colors.primaryLight,
        }}
        returnKeyType={"search"}
        enablePoweredByContainer={false}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        placeholder="Where to?"
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
      />
    </Animated.View>
  );
};

export default DestinationSearch;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingTop: 3,
    flex: 0,
  },
  textInput: {
    backgroundColor: "transparent",
    borderRadius: 24,
    borderWidth: Platform.OS === "ios" ? 0 : 0,
    borderBottomWidth: Platform.OS === "ios" ? 0 : 2,
    borderTopWidth: Platform.OS === "ios" ? 0 : 0,
    borderLeftWidth: Platform.OS === "ios" ? 1 : 0,
    borderRightWidth: Platform.OS === "ios" ? 1 : 0,
    borderColor: Colors.primaryDarkEvenLighter,
    fontSize: 16,
    height: 40,
    paddingHorizontal: 20,
  },

  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  listView: {
    // marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "transparent",
    height: "100%",
  },
  description: {
    fontSize: 16,
    color: Colors.primaryLight,
  },
  row: {
    backgroundColor: "transparent",
    paddingVertical: 10,
  },
  separator: {
    backgroundColor: "#BDCDCD",
  },
});
