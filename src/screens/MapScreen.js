import { StyleSheet, View } from "react-native";
import React, { useState, useRef } from "react";
import tw from "twrnc";
import Map from "../components/Map/Map";
import BottomControls from "../components/Map/BottomControls";
import BottomSheet from "../components/Map/BottomSheet";
import TopControls from "../components/Map/TopControls";
import MyLocationButton from "../components/Map/MyLocationButton";
import ShowRouteButton from "../components/Map/ShowRouteButton";
import { useSelector } from "react-redux";
import { selectDestination } from "../slices/navigationSlice";

const MapScreen = (props) => {
  const destination = useSelector(selectDestination);
  const [routeCoordinates, setRouteCoordinates] = useState();
  const mapRef = useRef();

  const centerRoute = (coordinates) => {
    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: { top: 150, right: 50, bottom: 300, left: 50 },
      animated: true,
    });
  };

  return (
    <View style={tw`flex-1`}>
      <TopControls navigation={props.navigation} />
      <Map
        mapRef={mapRef}
        setRouteCoordinates={setRouteCoordinates}
        centerRoute={centerRoute}
      />
      <MyLocationButton mapRef={mapRef} />
      {destination.coordinates.latitude && (
        <ShowRouteButton
          centerRoute={centerRoute}
          routeCoordinates={routeCoordinates}
        />
      )}
      <BottomSheet />
      <BottomControls navigation={props.navigation} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
