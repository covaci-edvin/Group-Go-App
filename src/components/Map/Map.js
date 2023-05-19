import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
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
import {
  selectJoinedMembers,
  selectJoinedMembersCoordinates,
} from "../../slices/invitedRouteSlice";
import { AuthContext } from "../../context/AuthContext";
import {
  selectGroupRouteStarted,
  selectRouteStarted,
} from "../../slices/uiToggleSlice";
import GroupRoutes from "./GroupRoutes";
import GroupMarker from "./GroupMarker";

const Map = ({ mapRef, setRouteCoordinates, centerRoute }) => {
  const destination = useSelector(selectDestination);
  const { userInfo } = useContext(AuthContext);
  const transport = useSelector(selectTransport);
  const origin = useSelector(selectOrigin);
  const joinedMembersCoordinates = useSelector(selectJoinedMembersCoordinates);
  const joinedMembers = useSelector(selectJoinedMembers);
  const [hasLoaded, setHasLoaded] = useState();
  const dispatch = useDispatch();
  const groupRouteStarted = useSelector(selectGroupRouteStarted);
  const routeStarted = useSelector(selectRouteStarted);
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

  const onUserLocationChange = (location) => {
    // console.log("🚀");
    // setOrigin({
    //   coordinates: {
    //     latitude: location.nativeEvent.coordinate.latitude,
    //     longitude: location.nativeEvent.coordinate.longitude,
    //   },
    // });
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
        style={tw`flex-1`}
        mapPadding={mapPadding}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        loadingEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={false}
        loadingBackgroundColor={Colors.primaryDark}
        loadingIndicatorColor={Colors.primaryShade}
        onUserLocationChange={onUserLocationChange}
        onPress={(e) => {
          !groupRouteStarted &&
            !routeStarted &&
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
          !groupRouteStarted &&
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
        <GroupRoutes
          joinedMembers={joinedMembersCoordinates}
          members={joinedMembers}
          destination={destination.coordinates}
        />
        <GroupMarker joinedMembers={joinedMembersCoordinates} />

        {origin && destination.coordinates.latitude && (
          <MapViewDirections
            key={userInfo.user.id}
            origin={origin.coordinates}
            destination={destination.coordinates}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={6}
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
