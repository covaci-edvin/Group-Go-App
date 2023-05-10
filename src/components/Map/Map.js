import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from "react-native-maps-directions";
import tw from "twrnc";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectTransport,
  setDestination,
  setDistance,
  setOrigin,
  setTransport,
  setTravelTimeInformation,
} from "../../slices/navigationSlice";

import { MapStyles } from "../../styles/mapStyles";
import { mapPadding } from "../../styles/mapPadding";
import { Colors } from "../../styles/colors";
import { toHoursAndMinutes } from "../../utils/MinutesToHours";
import MyLocationButton from "./MyLocationButton";

const Map = ({ mapRef, setRouteCoordinates, centerRoute }) => {
  // const mapRef = useRef(null);
  const destination = useSelector(selectDestination);
  const transport = useSelector(selectTransport);
  const origin = useSelector(selectOrigin);
  const [hasLoaded, setHasLoaded] = useState();
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const destinationSelectHandler = (params) => {
    if (
      !origin ||
      (!destination.coordinates.latitude && !destination.coordinates.longitude)
    )
      return;

    dispatch(setTravelTimeInformation(toHoursAndMinutes(params.duration)));
    dispatch(setDistance(params.distance));
    setRouteCoordinates(params.coordinates);
    centerRoute(params.coordinates);
  };

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
      dispatch(
        setOrigin({
          coordinates: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        })
      );
      setHasLoaded(true);
    })();
  }, []);

  return (
    hasLoaded && (
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapStyles}
        // showsCompass={true}
        style={tw`flex-1`}
        mapPadding={mapPadding}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
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
        {origin && destination.coordinates.latitude && (
          <MapViewDirections
            origin={origin.coordinates}
            destination={destination.coordinates}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor={Colors.primaryShade}
            timePrecision="now"
            precision="high"
            onError={(errorMessage) => {
              if (
                errorMessage === "Error on GMAPS route request: ZERO_RESULTS"
              ) {
                dispatch(setTransport("DRIVING"));
              }
              console.log("GOT AN ERROR", errorMessage);
            }}
            onReady={destinationSelectHandler}
            mode={transport}
          />
        )}

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
              pinColor={Colors.gradientBlueLight}
            ></Marker>
          )}
      </MapView>
    )
  );
};

export default Map;

const styles = StyleSheet.create({});
