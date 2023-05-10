import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { object, string, ref } from "yup";
import { Formik } from "formik";
import { Colors } from "../../styles/colors";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import AuthInput from "./AuthInput";
import { AuthContext } from "../../context/AuthContext";

let loginValidationSchema = object({
  name: string().required("Please enter a username"),
  email: string()
    .email("Enter a valid email")
    .required("Please enter a email address"),
  password: string()
    .min(8, ({ min }) => `Password too short (min ${min} characters)`)
    .required("Please enter the password")
    .matches(
      /^.*(?=.{8,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase and one number!"
    ),
  passwordConfirmation: string().oneOf(
    [ref("password"), null],
    "Passwords must match"
  ),
  password: string(),
});

const Login = ({ navigation }) => {
  const { signup, signupErrorMessage } = useContext(AuthContext);
  const onSubmitHandler = (data) => {
    signup(data.name, data.email, data.password, data.passwordConfirmation);
  };
  return (
    <ScrollView style={{ backgroundColor: Colors.primaryDark }}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        onSubmit={onSubmitHandler}
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
                placeholder="Name"
                type="name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {errors.name && touched.name && (
                <Text style={styles.errors}>{errors.name}</Text>
              )}
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
              <AuthInput
                placeholder="Password Confirm"
                type="password"
                onChangeText={handleChange("passwordConfirmation")}
                onBlur={handleBlur("passwordConfirmation")}
                value={values.passwordConfirmation}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation && (
                <Text style={styles.errors}>{errors.passwordConfirmation}</Text>
              )}
            </View>
            <View style={tw`flex-1 items-center gap-2 mt-5`}>
              <TouchableOpacity
                style={[
                  tw`bg-slate-50 shadow-lg h-14 w-24 rounded-full flex items-center justify-center`,
                ]}
                activeOpacity={0.6}
                onPress={handleSubmit}
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
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
              {signupErrorMessage && (
                <Text style={[styles.errors, tw`mt-3`]}>
                  An account with this email already exists!
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
    backgroundColor: Colors.primaryDark,
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
