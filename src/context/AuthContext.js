import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "@env";
import { selectGroups, setGroups } from "../slices/groupsSlice";
import { setEditGroup } from "../slices/editGroupSlice";
import { setIsAuthLoading } from "../slices/loadersSlice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [componentIsLoading, setComponentIsLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [addMemberErrorMessage, setAddMemberErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { groups } = useSelector(selectGroups);

  const replaceGroup = (groupId, updatedGroup) => {
    try {
      const updatedGroups = groups.map((group) => {
        if (group.id === groupId) {
          dispatch(setEditGroup(updatedGroup));
          return updatedGroup;
        } else return group;
      });
      dispatch(setGroups(updatedGroups));
    } catch (error) {
      console.log(error);
    }
  };

  const removeGroup = (groupId) => {
    const updatedGroups = groups.filter((group) => group.id !== groupId);
    dispatch(setGroups(updatedGroups));
  };

  const login = (email, password) => {
    dispatch(setIsAuthLoading(true));
    axios
      .post(`${API_BASE_URL}/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        let userInfo = res.data;
        token = userInfo.token;
        setUserInfo(userInfo.data);
        setUserToken(userInfo.token);
        AsyncStorage.setItem("UserToken", userInfo.token);
        AsyncStorage.setItem("UserInfo", JSON.stringify(userInfo.data));
      })
      .catch((err) => {
        setLoginErrorMessage(err.response?.data.message);
        console.log(`login error ${err}`);
      })
      .finally(() => dispatch(setIsAuthLoading(false)));
  };

  const signup = async (name, email, password, passwordConfirm) => {
    dispatch(setIsAuthLoading(true));
    axios
      .post(`${API_BASE_URL}/users/signup`, {
        name,
        email,
        password,
        passwordConfirm,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo.data);
        setUserToken(userInfo.token);
        AsyncStorage.setItem("UserToken", userInfo.token);
        AsyncStorage.setItem("UserInfo", JSON.stringify(userInfo.data));
      })
      .catch((err) => {
        setSignupErrorMessage(err.response.data.message);
        console.log(err);
      })
      .finally(() => dispatch(setIsAuthLoading(false)));
  };

  const addMember = async (groupId, email) => {
    dispatch(setIsAuthLoading(true));
    axios
      .post(
        `${API_BASE_URL}/groups/${groupId}/members`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        replaceGroup(groupId, res.data.data.group);
      })
      .catch((err) => {
        console.log("addMemberError");
        setAddMemberErrorMessage(err.response.data.message);
      })
      .finally(() => dispatch(setIsAuthLoading(false)));
  };

  const deleteMember = async (groupId, email) => {
    dispatch(setIsAuthLoading(true));
    axios
      .delete(`${API_BASE_URL}/groups/${groupId}/members`, {
        data: {
          email,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        replaceGroup(groupId, res.data.data.group);
      })
      .catch((err) => {
        console.log("removeMemberError", err.data);
      })
      .finally(() => dispatch(setIsAuthLoading(false)));
  };

  const getGroups = (token) => {
    dispatch(setIsAuthLoading(true));
    axios
      .get(`${API_BASE_URL}/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setGroups(res.data.data.data));
      })
      .catch((err) => {
        console.log("getGroupsError");
        console.log(err.message);
      })
      .finally(() => dispatch(setIsAuthLoading(false)));
  };

  const leaveGroup = async (groupId, email) => {
    dispatch(setIsAuthLoading(true));

    axios
      .delete(`${API_BASE_URL}/groups/${groupId}/members`, {
        data: {
          email,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        removeGroup(groupId);
      })
      .catch((err) => {
        console.log("leaveGroupError", err.message);
      })
      .finally(() => dispatch(setIsAuthLoading(false)));
  };

  const createGroup = async (groupName, groupDescription) => {
    dispatch(setIsAuthLoading(true));
    axios
      .post(
        `${API_BASE_URL}/users/groups`,
        {
          name: groupName,
          description: groupDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log("getttt");
        getGroups(userToken);
      })
      .catch((err) => {
        console.log("createGroupError");
        console.log(err.response);
      })
      .finally(() => dispatch(setIsAuthLoading(false)));
  };

  const deleteGroup = async (groupId) => {
    dispatch(setIsAuthLoading(true));
    axios
      .delete(`${API_BASE_URL}/groups/${groupId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        removeGroup(groupId);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => dispatch(setIsAuthLoading(false)));
  };

  const updateGroup = async (groupId, groupName, groupDescription) => {
    axios
      .patch(
        `${API_BASE_URL}/groups/${groupId}`,
        {
          name: groupName,
          description: groupDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        replaceGroup(groupId, res.data.data.data);
      })
      .catch((err) => {
        console.log("updateGroupError");
        console.log(err.response.data);
      });
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setUserInfo(null);
    AsyncStorage.removeItem("UserToken");
    AsyncStorage.removeItem("UserInfo");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      let userToken = await AsyncStorage.getItem("UserToken");
      let userInfo = await AsyncStorage.getItem("UserInfo");
      userInfo = JSON.parse(userInfo);

      if (userToken && userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
    } catch (error) {
      console.log(`isLoggedIn error ${error}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        createGroup,
        updateGroup,
        deleteGroup,
        addMember,
        deleteMember,
        leaveGroup,
        getGroups,
        userInfo,
        isLoading,
        componentIsLoading,
        userToken,
        loginErrorMessage,
        signupErrorMessage,
        addMemberErrorMessage,
        setAddMemberErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
