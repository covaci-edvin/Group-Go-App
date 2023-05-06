import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Formik } from "formik";
import { object, string } from "yup";
import React, { useContext } from "react";
import { Colors } from "../styles/colors";
import { AntDesign } from "@expo/vector-icons";
import safeViewAndroid from "../utils/safeViewAndroid";
import tw from "twrnc";
import Input from "./UI/Input";
import { AuthContext } from "../context/AuthContext";
import Button from "./UI/Button";

let createGroupValidationSchema = object({
  groupName: string().required("Please enter a group name"),
  groupDescription: string(),
});

const Groups = ({ navigation }) => {
  const { createGroup } = useContext(AuthContext);
  const onSumbitHandler = (values) => {
    createGroup(values.groupName, values.groupDescription);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, safeViewAndroid.AndroidSafeArea]}>
      <View style={tw`flex-row items-center justify-between mx-6`}>
        <Text style={[tw`text-xl`, styles.textHeader]}>Create Group</Text>
        <TouchableOpacity
          style={tw`h-10 w-10 items-end justify-center`}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="close" size={24} color={Colors.primaryDarkLighter} />
        </TouchableOpacity>
      </View>
      <Formik
        initialValues={{ groupName: "", groupDescription: "" }}
        onSubmit={onSumbitHandler}
        validateOnMount={true}
        validationSchema={createGroupValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <ScrollView style={tw`px-3`}>
            <Input
              placeholder="Group name"
              type="name"
              onChangeText={handleChange("groupName")}
              onBlur={handleBlur("groupName")}
              value={values.groupName}
              autoFocus={true}
            />
            {errors.groupName && touched.groupName && (
              <Text style={styles.errors}>{errors.groupName}</Text>
            )}
            <Input
              placeholder="Group description (optional)"
              type="description"
              onChangeText={handleChange("groupDescription")}
              onBlur={handleBlur("groupDescription")}
              value={values.groupDescription}
              height={220}
              multiline={true}
            />
            <Button onPress={handleSubmit} text={"Create group"} />
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Groups;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight,
    flex: 1,
  },
  textHeader: {
    color: Colors.primaryDarkLighter,
    fontWeight: 600,
  },
  inputContainer: {
    height: 50,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 50,
    fontSize: 18,
    color: Colors.primaryDark,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: Colors.primaryDark,
  },
  inputFocus: {
    borderColor: Colors.primaryShade,
    borderWidth: 1,
  },
  inputBlur: {
    borderColor: Colors.primaryTint,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontWeight: 600,
  },
  button: {
    borderColor: Colors.primaryDark,
    borderWidth: 1,
    marginVertical: 20,
    paddingVertical: 3,
  },
  errors: {
    fontSize: 14,
    color: Colors.red,
    marginHorizontal: 23,
  },
});
