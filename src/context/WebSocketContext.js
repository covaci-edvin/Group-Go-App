import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { selectGroups } from "../slices/groupsSlice";
import {
  setGroupRouteStarted,
  setIsInvitationSent,
  setIsUserInvited,
} from "../slices/uiToggleSlice";
import {
  setInvitedRouteAdminName,
  setInvitedRouteDestination,
  setInvitedRouteGroupName,
  setInvitedRouteAdminId,
  setInvitedRouteGroupId,
  selectJoinedMembers,
  addJoinedMember,
  selectInvitedRouteAdminId,
  removeJoinedMember,
} from "../slices/invitedRouteSlice";
import { setSelectedGroup } from "../slices/selectedGroupSlice";
import { selectSocketId, setSocketId } from "../slices/socketIoSlice";

export const WebSocketContext = createContext();

let socket;

export const WebSocketProvider = ({ children }) => {
  const { userToken, userInfo } = useContext(AuthContext);
  const { groups } = useSelector(selectGroups);
  const socketId = useSelector(selectSocketId);
  const joinedMembers = useSelector(selectJoinedMembers);
  const dispatch = useDispatch();
  const invitedRouteAdminId = useSelector(selectInvitedRouteAdminId);

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
    dispatch(setIsInvitationSent(true));
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

  const leaveGroupRoute = (adminId) => {
    socket.emit("leave-group-route", userInfo.user.id, adminId);
  };

  const groupRouteStarted = (groupId) => {
    socket.emit("group-route-started", groupId);
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

    socket.on("joined", (member) => {
      dispatch(addJoinedMember(member));
    });

    socket.on("left", (memberId) => {
      dispatch(removeJoinedMember(memberId));
    });

    socket.on("group-route-started", () => {
      dispatch(setGroupRouteStarted(true));
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
        leaveGroupRoute,
        groupRouteStarted,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
