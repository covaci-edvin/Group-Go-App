import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { object, string } from "yup";
import { Formik } from "formik";
import { Colors } from "../../styles/colors";
import { Feather } from "@expo/vector-icons";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

let loginValidationSchema = object({
  email: string()
    .email("Enter a valid email")
    .required("Please enter a email address"),
});

const Login = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: Colors.primaryDark }}>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => console.log(values)}
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
            </View>
            <View style={tw`flex-1 items-center gap-2 mt-5 mx-5`}>
              <AuthButton
                isValid={isValid}
                onPress={handleSubmit}
                icon={"send"}
              />
              <Text
                style={[tw`mt-2`, styles.signUpLink]}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
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
