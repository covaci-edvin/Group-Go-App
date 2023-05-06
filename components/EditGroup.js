import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { object, ref, string } from "yup";
import { Formik } from "formik";
import Input from "./UI/Input";
import { Colors } from "../styles/colors";
import tw from "twrnc";
import { AuthContext } from "../context/AuthContext";

let editGroupValidationSchema = object({
  groupName: string().required("Please enter a group name"),
  groupDescription: string(),
});

const EditGroup = ({ group }) => {
  const [groupName, setGroupName] = useState(group.name);
  const [groupDescription, setGroupDescription] = useState(group.description);
  const [isDisabled, setIsDisabled] = useState(true);
  const { updateGroup } = useContext(AuthContext);
  const refNameInput = useRef();
  const refDescriptionInput = useRef();

  const blurInput = (refInput) => {
    refInput.current.blur();
  };
  const height = useSharedValue(16);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  }, []);

  const initialValues = {
    groupName: group.name,
    groupDescription: group.description,
  };

  const resetValuesOnCancel = () => {
    setGroupName(initialValues.groupName);
    setGroupDescription(initialValues.groupDescription);
  };

  useEffect(() => {
    if (
      initialValues.groupName !== groupName ||
      initialValues.groupDescription !== groupDescription
    ) {
      setIsDisabled(false);
      height.value = withSpring(40, { damping: 30 });
    } else {
      setIsDisabled(true);
      height.value = withSpring(16, { damping: 30 });
    }
  }, [groupName, groupDescription, group]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        updateGroup(group.id, values.groupName, values.groupDescription);
        blurInput(refNameInput);
        blurInput(refDescriptionInput);
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
        <View>
          <View style={styles.group}>
            <Input
              refInput={refNameInput}
              type="name"
              onChangeText={(value) => {
                handleChange("groupName")(value);
                setGroupName(value);
              }}
              onBlur={handleBlur("groupName")}
              value={values.groupName}
              placeholder="Group name"
            />
            {errors.groupName && touched.groupName && (
              <Text style={styles.errors}>{errors.groupName}</Text>
            )}
            <Input
              refInput={refDescriptionInput}
              onChangeText={(value) => {
                handleChange("groupDescription")(value);
                setGroupDescription(value);
              }}
              onBlur={handleBlur("groupDescription")}
              value={values.groupDescription}
              type="description"
              height={100}
              multiline={true}
              placeholder="Group description (optional)"
            />
          </View>
          <View style={[tw`flex-row justify-end mt-1`, styles.buttonContainer]}>
            <TouchableOpacity
              style={[tw`items-center`]}
              onPress={() => {
                resetForm();
                resetValuesOnCancel();
              }}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  tw`rounded-full px-5 py-2`,
                  styles.buttonCancel,
                  reanimatedStyle,
                ]}
              >
                <Text style={[tw`text-base`, styles.text]}>Cancel</Text>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[tw`items-center`]}
              activeOpacity={0.7}
              onPress={handleSubmit}
              disabled={isDisabled}
            >
              <Animated.View
                style={[
                  tw`rounded-full px-5 ml-3 py-2`,
                  styles.buttonSave,
                  {
                    backgroundColor: isValid
                      ? Colors.primaryShade
                      : Colors.primaryTint,
                  },
                  reanimatedStyle,
                ]}
              >
                <Text style={[tw`text-base`, styles.textSave]}>Save</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default EditGroup;

const styles = StyleSheet.create({
  group: {
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: Colors.primaryTintLighter,
  },
  buttonSave: {
    backgroundColor: Colors.primaryShade,
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.primaryDarkLighter,
    fontWeight: 600,
  },
  textSave: {
    fontSize: 16,
    color: Colors.primaryLight,
    fontWeight: 600,
  },
  errors: {
    fontSize: 14,
    color: Colors.red,
    marginHorizontal: 23,
  },
});
