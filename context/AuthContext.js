import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccount } from "../slices/accountSlice";
import { API_BASE_URL } from "@env";
import { setGroups } from "../slices/groupsSlice";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [componentIsLoading, setComponentIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();

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
        // console.log(res.data.data.data.groups);
        dispatch(setGroups(res.data.data.data.groups));
      })
      .catch((err) => {
        console.log("getGroupsError");
        console.log(err.response.data.message);
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
        setCurrentAccount(userToken);
      })
      .catch((err) => {
        console.log("createGroupError");
        console.log(err.response.data);
      });
    setIsLoading(false);
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
    axios
      .patch(
        `${API_BASE_URL}/groups/${groupId}`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        setCurrentAccount(userToken);
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

      if (userToken) {
        setUserToken(userToken);
        console.log(userToken);
        setUserInfo(userInfo);
        setCurrentAccount(userToken);
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
        getGroups,
        userInfo,
        setCurrentAccount,
        isLoading,
        componentIsLoading,
        userToken,
        loginErrorMessage,
        signupErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
