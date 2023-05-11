import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import io from "../../../node_modules/socket.io-client/dist/socket.io";
import { AuthContext } from "../../context/AuthContext";

// socket.on("connect", () => {
//   console.log(`You connected with id: ${socket.id}`);
// });
let socket;

const SocketioTest = () => {
  const { userToken } = useContext(AuthContext);
  const [msg, setMsg] = useState();

  useEffect(() => {
    socket = io("http://127.0.0.1:3000", { auth: { token: userToken } });
    socket.on("connect", () => {
      console.log(`You connected with id: ${socket.id}`);
    });

    if (!userToken) {
      socket.disconnect();
    }

    socket.on("receive-message", (msg) => {
      console.log(`${socket.id} says: ${msg}`);
      setMsg(msg);
    });
  }, [userToken]);
  //   return <SafeAreaView></SafeAreaView>;
};

export default SocketioTest;

const styles = StyleSheet.create({});
