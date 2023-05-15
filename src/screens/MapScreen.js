import { StyleSheet, View } from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import tw from "twrnc";
import Map from "../components/Map/Map";
import BottomControls from "../components/Map/BottomControls";
import BottomSheet from "../components/Map/BottomSheet";
import TopControls from "../components/Map/TopControls";
import MyLocationButton from "../components/Map/MyLocationButton";
import ShowRouteButton from "../components/Map/ShowRouteButton";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navigationSlice";
import { WebSocketContext } from "../context/WebSocketContext";
import { selectGroups } from "../slices/groupsSlice";
import SideGroupRouteStatusBar from "../components/Map/SideGroupRouteStatusBar";
import { selectGroupRouteStarted } from "../slices/uiToggleSlice";

const MapScreen = (props) => {
  const destination = useSelector(selectDestination);
  const { groups } = useSelector(selectGroups);
  const { joinRooms } = useContext(WebSocketContext);
  const origin = useSelector(selectOrigin);
  const groupRouteStarted = useSelector(selectGroupRouteStarted);

  const [routeCoordinates, setRouteCoordinates] = useState();
  const mapRef = useRef();

  useEffect(() => {
    joinRooms(groups);
  }, [groups]);

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
      <BottomSheet mapRef={mapRef} />
      {!destination.coordinates.latitude && (
        <BottomControls navigation={props.navigation} />
      )}
      {groupRouteStarted && <SideGroupRouteStatusBar />}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
