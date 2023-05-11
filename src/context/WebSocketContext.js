import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { selectGroups } from "../slices/groupsSlice";

export const WebSocketContext = createContext();

let socket;

export const WebSocketProvider = ({ children }) => {
  const { userToken, userInfo } = useContext(AuthContext);
  const { groups } = useSelector(selectGroups);

  const joinRooms = () => {
    groups.forEach((group) => {
      console.log(group.id);
      socket.emit("join-room", group.id, group.name);
    });
  };

  const sendInvitation = (groupId, userName, groupName) => {
    socket.emit("send-invitation", groupId, userName, groupName);
  };

  const deleteGroup = (groupId) => {
    socket.emit("delete-group", groupId);
  };

  const leaveGroup = (groupId) => {
    socket.emit("leave-group", groupId);
  };

  const socketDisconnect = () => {
    socket.disconnect();
  };

  const onGroupSelect = (groupId) => {
    socket.emit("connect-to-the-room", groupId);
  };

  useEffect(() => {
    socket = io("http://127.0.0.1:3000", {
      auth: { token: userToken },
    });
    socket.on("connect", () => {
      console.log(`${userInfo.user.name} connected with id: ${socket.id}`);
    });

    socket.on("receive-invitation", (userName, groupName) => {
      console.log(
        `${userInfo.user.name}: ${userName} invites you the the ${groupName} Name`
      );
    });
  }, []);
  return (
    <WebSocketContext.Provider
      value={{
        socketDisconnect,
        sendInvitation,
        joinRooms,
        deleteGroup,
        leaveGroup,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
