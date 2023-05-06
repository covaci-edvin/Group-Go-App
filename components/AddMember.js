import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useContext, useRef, useState } from "react";
import AddMemberButton from "./UI/AddMemberButton";
import { Colors } from "../styles/colors";
import tw from "twrnc";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { object, string } from "yup";
import { Formik } from "formik";
import { AuthContext } from "../context/AuthContext";

let editGroupValidationSchema = object({
  email: string()
    .email("Enter a valid email")
    .required("Please enter a email address"),
});

const AddMember = ({ groupId }) => {
  const { addMember } = useContext(AuthContext);
  const refInput = useRef();
  const [addMemberEmail, setAddMemberEmail] = useState();

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
    };
  }, []);

  const animateInput = () => {
    height.value = withSpring(45, { damping: 30 });
    opacity.value = withSpring(1, { damping: 30 });
  };

  const animateCloseInput = () => {
    height.value = withSpring(0, { damping: 30 });
    opacity.value = withSpring(0, { damping: 30 });
  };
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => {
        addMember(groupId, values.email);
      }}
      validateOnMount={true}
      validationSchema={editGroupValidationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
        resetForm,
      }) => (
        <View style={tw``}>
          <Animated.View
            style={[
              tw`rounded-md flex-row items-center shadow-xl`,
              styles.addMemberInputContainer,
              reanimatedStyle,
            ]}
          >
            <TextInput
              ref={refInput}
              editable={true}
              style={[tw``, styles.addMemberInput]}
              onChangeText={(value) => {
                handleChange("email")(value);
                setAddMemberEmail(value);
              }}
              onBlur={(value) => {
                handleBlur("email")(value);
                animateCloseInput();
                resetForm();
              }}
              value={values.email}
              placeholder="Enter user email"
            />
          </Animated.View>
          <View style={[tw`bg-black pt-2`, styles.buttonContainer]}>
            <AddMemberButton
              onPress={() => {
                if (!values.email) {
                  animateInput();
                  refInput.current.focus();
                }
                if (values.email && isValid) {
                  handleSubmit();
                  setTimeout(() => {
                    animateCloseInput();
                    resetForm();
                  }, 1000);
                }
              }}
              isValid={isValid}
              value={values.email}
              touched={touched.email}
              current={addMemberEmail}
            />
          </View>
          {values.email && errors.email && touched.email && (
            <Text style={styles.errors}>{errors.email}</Text>
          )}
        </View>
      )}
    </Formik>
  );
};

export default AddMember;

const styles = StyleSheet.create({
  addMemberInputContainer: {
    borderWidth: 2,
    borderColor: Colors.primaryShade,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: Colors.primaryLight,
  },
  buttonContainer: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 10,
  },
  addMemberInput: {
    height: "100%",
    padding: 11,
    fontSize: 17,
  },
  errors: {
    fontSize: 14,
    color: Colors.red,
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
