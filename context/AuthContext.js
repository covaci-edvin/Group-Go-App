import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../slices/accountSlice";
import { API_BASE_URL } from "@env";
import { selectGroups, setGroups } from "../slices/groupsSlice";
import { setEditGroup } from "../slices/editGroupSlice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [componentIsLoading, setComponentIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [addMemberErrorMessage, setAddMemberErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
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

  const setCurrentAccount = async (userToken) => {
    setIsLoading(true);
    await axios
      .get(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        dispatch(setAccount(res.data.data.data));
      })
      .catch((err) => {
        console.log("setCurrentAccountError");
        console.log(err.response.data.message);
      });
    setIsLoading(false);
  };

  const getGroups = async () => {
    setComponentIsLoading(true);
    await axios
      .get(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        dispatch(setGroups(res.data.data.data.groups));
      })
      .catch((err) => {
        console.log("getGroupsError");
        console.log(err);
      });
    setComponentIsLoading(false);
  };

  const login = async (email, password) => {
    setIsLoading(true);
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
        setCurrentAccount(userInfo?.token);
        AsyncStorage.setItem("UserToken", userInfo.token);
        AsyncStorage.setItem("UserInfo", JSON.stringify(userInfo.data));
      })
      .catch((err) => {
        setLoginErrorMessage(err.response?.data.message);
        console.log(`login error ${err}`);
      });
    setIsLoading(false);
  };

  const signup = async (name, email, password, passwordConfirm) => {
    setIsLoading(true);
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
        setCurrentAccount(userInfo.token);
        AsyncStorage.setItem("UserToken", userInfo.token);
        AsyncStorage.setItem("UserInfo", JSON.stringify(userInfo.data));
      })
      .catch((err) => {
        setSignupErrorMessage(err.response.data.message);
        console.log(err);
      });
    setIsLoading(false);
  };

  const addMember = async (groupId, email) => {
    setComponentIsLoading(true);
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
        setAddMemberErrorMessage(err.response.data.message);
      });
    setComponentIsLoading(false);
  };

  const deleteMember = async (groupId, email) => {
    setComponentIsLoading(true);
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
      });
    setComponentIsLoading(false);
  };

  const leaveGroup = async (groupId, email) => {
    setComponentIsLoading(true);
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
        console.log("leaveGroupError", err.data);
      });
    setComponentIsLoading(false);
  };

  const createGroup = async (groupName, groupDescription) => {
    setIsLoading(true);
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
        // setCurrentAccount(userToken);
      })
      .catch((err) => {
        console.log("createGroupError");
        console.log(err.response.data);
      });
    setIsLoading(false);
  };

  const deleteGroup = async (groupId) => {
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
      });
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
        setCurrentAccount,
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
