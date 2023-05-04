import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import tw from "twrnc";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { selectDestination, setDestination } from "../slices/navigationSlice";

import { MapStyles } from "../styles/mapStyles";
import { mapPadding } from "../styles/mapPadding";
import { Colors } from "../styles/colors";

const Map = () => {
  const destination = useSelector(selectDestination);
  const [hasLoaded, setHasLoaded] = useState();
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.785834,
    longitude: -122.406417,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setHasLoaded(true);
    })();
  }, []);

  return (
    hasLoaded && (
      <MapView
        provider={PROVIDER_GOOGLE}
        showsCompass={true}
        style={tw`flex-1`}
        mapPadding={mapPadding}
        // customMapStyle={MapStyles}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={(e) => {
          dispatch(
            setDestination({
              coordinates: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              },
              description: e.nativeEvent.name
                ? e.nativeEvent.name
                : `${e.nativeEvent.coordinate.latitude}, ${e.nativeEvent.coordinate.longitude}`,
            })
          );
        }}
        onPoiClick={(e) => {
          dispatch(
            setDestination({
              coordinates: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              },
              description: e.nativeEvent.name,
            })
          );
        }}
      >
        {destination.coordinates.latitude &&
          destination.coordinates.longitude && (
            <Marker
              coordinate={destination.coordinates}
              draggable={true}
              onDragEnd={(e) => {
                dispatch(
                  setDestination({
                    coordinates: {
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    },
                    description: e.nativeEvent.name
                      ? e.nativeEvent.name
                      : "sheesh",
                  })
                );
              }}
              pinColor={Colors.primaryTint}
            ></Marker>
          )}
      </MapView>
    )
  );
};

export default Map;

const styles = StyleSheet.create({});
