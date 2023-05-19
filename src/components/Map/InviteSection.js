import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { Colors } from "../../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { WebSocketContext } from "../../context/WebSocketContext";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedGroup } from "../../slices/selectedGroupSlice";
import { AuthContext } from "../../context/AuthContext";
import { selectJoinedMembers } from "../../slices/invitedRouteSlice";
import Loader from "../UI/Loader";
import {
  selectInvitationSent,
  setGroupRouteStarted,
  setIsUserInvited,
  setRouteStarted,
} from "../../slices/uiToggleSlice";
import StartRouteButton from "./StartRouteButton";
import WaitingToJoin from "./WaitingToJoin";
import { selectOrigin } from "../../slices/navigationSlice";

const InviteSection = ({ destination }) => {
  const { sendInvitation, groupRouteStarted, broadcastLocationData } =
    useContext(WebSocketContext);
  const { userInfo } = useContext(AuthContext);
  const { selectedGroup } = useSelector(selectSelectedGroup);
  const joinedMembers = useSelector(selectJoinedMembers);
  const origin = useSelector(selectOrigin);
  const isInvitationSent = useSelector(selectInvitationSent);
  const dispatch = useDispatch();

  const handleGroupRouteStart = () => {
    groupRouteStarted(selectedGroup.id);
    dispatch(setGroupRouteStarted(true));
    dispatch(setRouteStarted(true));
    broadcastLocationData(selectedGroup.id, origin);
  };

  return (
    <View
      style={[tw`flex-row justify-between items-center `, styles.container]}
    >
      <View style={tw`w-1/1.7`}>
        {isInvitationSent ? (
          <WaitingToJoin />
        ) : (
          <Text
            numberOfLines={2}
            style={[tw`text-xs text-center`, styles.message]}
          >
            Send a join route invitation to the group members
          </Text>
        )}
      </View>

      {joinedMembers.length === 0 ? (
        <TouchableOpacity
          style={[
            tw`items-center justify-center rounded-3xl shadow-md flex-row gap-1`,
            styles.button,
          ]}
          disabled={isInvitationSent}
          onPress={() => {
            sendInvitation(
              selectedGroup.id,
              userInfo.user.name,
              selectedGroup.name,
              destination
            );
          }}
        >
          <MaterialIcons
            name="send"
            size={20}
            color={
              isInvitationSent ? Colors.primaryDarkLighter : Colors.primaryLight
            }
          />
        </TouchableOpacity>
      ) : (
        <StartRouteButton onPress={handleGroupRouteStart} />
      )}
    </View>
  );
};

export default InviteSection;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  button: {
    height: 50,
    width: 130,
    borderColor: Colors.primaryShade,
    borderRightWidth: 2,
    borderLeftWidth: 2,

    backgroundColor: Colors.primaryDark,
  },
  text: {
    fontWeight: 600,
    color: Colors.primaryLight,
  },
  message: {
    color: Colors.primaryDarkEvenLighter,
  },
});
