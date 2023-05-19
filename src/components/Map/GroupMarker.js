import { StyleSheet, View } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import tw from "twrnc";
import { Colors } from "../../styles/colors";

const GroupMarker = ({ joinedMembers }) => {
  return joinedMembers.map((member) => {
    return (
      <Marker key={member.id} coordinate={member.coordinates} draggable={true}>
        <View
          style={[
            tw`h-3 w-3 rounded-full`,
            {
              backgroundColor: member.color,
              borderColor: Colors.primaryLight,
              borderWidth: 2,
            },
          ]}
        ></View>
      </Marker>
    );
  });
};

export default GroupMarker;

const styles = StyleSheet.create({});
