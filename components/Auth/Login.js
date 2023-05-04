import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { object, string } from "yup";
import { Formik } from "formik";
import { Colors } from "../../styles/colors";
import { SimpleLineIcons } from "@expo/vector-icons";
import AuthInput from "./AuthInput";
import { AuthContext } from "../../context/AuthContext";

let loginValidationSchema = object({
  email: string()
    .email("Enter a valid email")
    .required("Please enter a email address"),
  password: string()
    .min(8, ({ min }) => `Password too short (min ${min} characters)`)
    .required("Please enter the password")
    .matches(
      /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase and one number!"
    ),
});

const Login = ({ navigation }) => {
  const { login, loginErrorMessage } = useContext(AuthContext);
  const onSumbitHandler = (data) => {
    login(data.email, data.password);
  };
  return (
    <ScrollView style={{ backgroundColor: Colors.primaryLight }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSumbitHandler}
        validateOnMount={true}
        validationSchema={loginValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <View style={styles.formContainer}>
            <View style={tw`mx-4 mt-5`}>
              <AuthInput
                placeholder="Email"
                type="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              <AuthInput
                placeholder="Password"
                type="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.errors}>{errors.password}</Text>
              )}
            </View>
            <View style={tw`flex-1 items-center gap-2 mt-2 mx-5`}>
              <View style={tw`flex-row w-full justify-end`}>
                <Text
                  style={[tw``, styles.signUpLink, styles.forgotPasswordLink]}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  Forgot Password
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  tw`bg-slate-50 shadow-lg h-14 w-24 rounded-full flex items-center justify-center`,
                ]}
                activeOpacity={0.6}
                onPress={handleSubmit}
                //   disabled={!isValid}
              >
                <SimpleLineIcons
                  name="login"
                  size={24}
                  color={
                    !isValid
                      ? Colors.primaryDarkEvenLighter
                      : Colors.primaryShade
                  }
                />
              </TouchableOpacity>
              <Text
                style={[tw`mt-2`, styles.signUpLink]}
                onPress={() => navigation.navigate("Sign up")}
              >
                Sign Up
              </Text>
              {loginErrorMessage && (
                <Text style={[styles.errors, tw`mt-3`]}>
                  {loginErrorMessage}
                </Text>
              )}
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: Colors.primaryLight,
  },
  signUpLink: {
    color: Colors.primaryShade,
    textDecorationColor: Colors.primaryShade,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    fontSize: 14,
  },
  forgotPasswordLink: {
    fontSize: 12,
  },
  errors: {
    fontSize: 14,
    color: Colors.red,
    marginHorizontal: 23,
  },
});