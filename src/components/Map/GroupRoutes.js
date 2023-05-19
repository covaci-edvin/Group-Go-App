import { StyleSheet } from "react-native";
import React from "react";
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from "react-native-maps-directions";

const GroupRoutes = ({ joinedMembers, destination }) => {
  return joinedMembers.map((member) => {
    return (
      <MapViewDirections
        key={member.id}
        origin={member.coordinates}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeColor={member.color}
        timePrecision="now"
        precision="high"
        strokeWidth={3}
      />
    );
  });
};

export default GroupRoutes;

const styles = StyleSheet.create({});
