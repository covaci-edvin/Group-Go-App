import { StyleSheet, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navigationSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Colors } from "../styles/colors";

const DestinationSearch = () => {
  const dispatch = useDispatch();
  return (
    <View>
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
    </View>
  );
};

export default DestinationSearch;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingTop: 5,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#f8fafc",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primaryShade,
    fontSize: 16,
    height: 45,
    paddingHorizontal: 20,
  },

  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  listView: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    height: "100%",
  },
  description: {
    fontSize: 16,
  },
  row: {
    backgroundColor: "transparent",
    paddingVertical: 20,
  },
  separator: {
    backgroundColor: "#BDCDCD",
  },
});
