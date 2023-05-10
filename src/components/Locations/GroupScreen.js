import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import io from "socket.io-client";

const socket = io("https://group-go-app-api.onrender.com/api/v1");

const GroupScreen = ({ groupId, userId }) => {
  const [members, setMembers] = useState([]);
  const [locations, setLocations] = useState({});

  useEffect(() => {
    // Join the group room when the component mounts
    socket.emit("join-group", groupId);

    // Listen for the 'members' event and update state
    socket.on("members", (members) => {
      setMembers(members);
    });

    // Listen for the 'locations-update' event and update state
    socket.on("locations-update", (locations) => {
      setLocations(locations);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("members");
      socket.off("locations-update");
    };
  }, []);

  const handleShareLocation = () => {
    // Get the user's current location data (using whatever location library you prefer)
    const location = { latitude, longitude };

    // Emit the 'share-location' event with the location data
    socket.emit("share-location", { groupId, userId, location });
  };

  return (
    <View>
      <Text>Group ID: {groupId}</Text>
      <Text>User ID: {userId}</Text>
      <Text>Members:</Text>
      {members.map((member) => (
        <Text key={member}>{member}</Text>
      ))}
      <Text>Locations:</Text>
      {Object.entries(locations).map(([member, location]) => (
        <Text key={member}>
          {member}: {location.latitude}, {location.longitude}
        </Text>
      ))}
      <Button title="Share Location" onPress={handleShareLocation} />
    </View>
  );
};

export default GroupScreen;
