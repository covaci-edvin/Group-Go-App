import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { selectGroups } from "../slices/groupsSlice";
import { setIsUserInvited } from "../slices/uiToggleSlice";
import {
  setInvitedRouteAdminName,
  setInvitedRouteDestination,
  setInvitedRouteGroupName,
  setInvitedRouteAdminId,
  setInvitedRouteGroupId,
} from "../slices/invitedRouteSlice";
import { setSelectedGroup } from "../slices/selectedGroupSlice";
import { selectSocketId, setSocketId } from "../slices/socketIoSlice";

export const WebSocketContext = createContext();

let socket;

export const WebSocketProvider = ({ children }) => {
  const { userToken, userInfo } = useContext(AuthContext);
  const { groups } = useSelector(selectGroups);
  const socketId = useSelector(selectSocketId);
  const dispatch = useDispatch();

  const joinRooms = () => {
    console.log("joining");
    groups.forEach((group) => {
      socket.emit("join-room", group.id, group.name);
    });
  };

  const sendInvitation = (groupId, userName, groupName, destination) => {
    socket.emit(
      "send-invitation",
      groupId,
      userName,
      groupName,
      destination,
      socketId
    );
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

  const joinGroupRoute = (adminId) => {
    socket.emit("joined-group-route", userInfo.user, adminId);
  };

  const onGroupSelect = (groupId) => {
    socket.emit("connect-to-the-room", groupId);
  };

  const setInvitationDataHandler = (
    groupId,
    userName,
    groupName,
    destination,
    adminSocketId
  ) => {
    dispatch(setInvitedRouteAdminName(userName));
    dispatch(setInvitedRouteAdminId(adminSocketId));
    dispatch(setInvitedRouteGroupName(groupName));
    dispatch(setInvitedRouteDestination(destination));
    dispatch(setInvitedRouteGroupId(groupId));
    dispatch(setIsUserInvited(true));
  };

  useEffect(() => {
    socket = io("http://127.0.0.1:3000", {
      auth: { token: userToken },
    });

    socket.on("connect", () => {
      // socket.emit("custom-id", userInfo.user.id);
      console.log(`${userInfo.user.name} connected with id: ${socket.id}`);
      dispatch(setSocketId(socket.id));
    });

    socket.on(
      "receive-invitation",
      (groupId, userName, groupName, destination, socketId) => {
        {
          // console.log(userName);
          console.log("✅", socketId, socket.id);

          setInvitationDataHandler(
            groupId,
            userName,
            groupName,
            destination,
            socketId
          );
        }
      }
    );

    socket.on("joined", (user) => {
      console.log(userInfo.user.name, " 🙃 ", user);
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
        joinGroupRoute,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
