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
  addJoinedMember,
  removeJoinedMember,
  setJoinedMembersCoordinates,
} from "../slices/invitedRouteSlice";
import { selectSocketId, setSocketId } from "../slices/socketIoSlice";
import { selectOrigin } from "../slices/navigationSlice";

export const WebSocketContext = createContext();

let socket;

export const WebSocketProvider = ({ children }) => {
  const { userToken, userInfo } = useContext(AuthContext);
  const { groups } = useSelector(selectGroups);
  const socketId = useSelector(selectSocketId);

  const dispatch = useDispatch();

  const joinRooms = () => {
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

  const joinGroupRoute = (adminId, groupId, origin) => {
    socket.emit("joined-group-route", userInfo.user, adminId);
  };

  const leaveGroupRoute = (adminId) => {
    socket.emit("leave-group-route", userInfo.user.id, adminId);
  };

  const groupRouteStarted = (groupId) => {
    socket.emit("group-route-started", groupId);
  };

  function generateRandomColor() {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }

  const broadcastLocationData = (groupId, origin) => {
    socket.emit(
      "broadcast-location",
      groupId,
      origin,
      userInfo.user.id,
      generateRandomColor()
    );
  };

  const responseLocationBroadcast = (groupId, origin) => {
    socket.emit(
      "broadcast-response-location",
      groupId,
      origin,
      userInfo.user.id,
      generateRandomColor()
    );
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

    socket.on("location", (origin, userId, color) => {
      dispatch(
        setJoinedMembersCoordinates({
          id: userId,
          coordinates: origin.coordinates,
          color: color,
        })
      );
    });

    socket.on("response-location", (origin, userId, color) => {
      dispatch(
        setJoinedMembersCoordinates({
          id: userId,
          coordinates: origin.coordinates,
          color: color,
        })
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
        joinGroupRoute,
        leaveGroupRoute,
        groupRouteStarted,
        broadcastLocationData,
        responseLocationBroadcast,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
