import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { AntIcon } from "@/src/components/Icons/EV/AntIcon";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcon } from "../Icons/EV/MaterialIcon";
import { useAlert } from "@/src/core/hooks/useAlert";
import { getUser } from "@/src/core/utils/getUser";
import { hexThemes } from "@/src/core/constants/Theme";
import { useColorScheme } from "nativewind";
import { Spinner } from "../Spinner";
import { ButtonActionParams, ValueChangeParams } from "@/src/core/types/alert";
import { User } from "@/src/core/types";
import { Image, Pressable, Text, View } from "react-native";
import { pushUserToLocalStorage } from "@/src/core/utils/pushUserToLocal";

const ProfileSection = () => {
  const { user } = useUser();
  const [imageUri, setImageUri] = useState<string>(user?.imageUrl as string);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const { Alert } = useAlert();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { colorScheme } = useColorScheme();
  const { foreground } = hexThemes[colorScheme!];

  useEffect(() => {
    setImageUri(user?.imageUrl as string);
  }, [user]);

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
      base64: true,
    });

    if (!pickerResult.canceled) {
      setIsImageUploading(true);
      try {
        const base64Image = `data:image/jpeg;base64,${pickerResult.assets[0].base64}`;
        await user?.setProfileImage({ file: base64Image });
      } catch (err) {
        console.log(err);
      } finally {
        setIsImageUploading(false);
      }
    }
  };

  const handleUsernameChange = async ({
    text,
    setData,
    setErrors,
  }: ValueChangeParams) => {
    setData({ username: text });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      if (!text) {
        setErrors(["Username cannot be empty"]);
        return;
      }

      try {
        const users = await getUser({ username: [text] });
        if (users?.length! > 0) {
          setErrors(["Username not available"]);
        } else {
          setErrors([]);
        }
      } catch (e) {
        console.log(e);
        setErrors(["Something went wrong. Please try again."]);
      }
    }, 500);
  };

  return (
    <View className="flex-col items-center justify-between mt-16">
      <Pressable
        disabled={isImageUploading}
        onPress={handleImagePicker}
        className="relative mb-14"
      >
        {!isImageUploading ? (
          <Image
            className="w-24 h-24 rounded-full bg-muted-foreground/50"
            source={{ uri: imageUri }}
          />
        ) : (
          <View className="w-24 h-24 rounded-full bg-muted-foreground/50 flex items-center justify-center">
            <Spinner color={"white"} size={20} />
          </View>
        )}
        <AntIcon
          name="edit"
          size={14}
          className="absolute top-0 right-0 bg-primary-foreground p-2 rounded-full"
        />
      </Pressable>
      <View className="w-full flex-col gap-4 mb-10">
        <Text className="text-muted-foreground font-bold text-sm">Profile</Text>
        <View className="flex felx-col gap-3">
          <Pressable
            onPress={() => {
              Alert({
                which: "input",
                input: {
                  fields: [
                    [
                      // username input
                      {
                        input: {
                          placeholder: "username",
                          placeholderTextColor: "grey",
                          autoCapitalize: "none",
                          autoCorrect: false,
                          style: {
                            color: foreground,
                            borderRadius: 5,
                            paddingLeft: 35,
                          },
                          onValueChange: ({ text, data, setData, setErrors }) =>
                            handleUsernameChange({
                              text,
                              data,
                              setData,
                              setErrors,
                            }),
                          iconBefore: {
                            icon: MaterialIcon,
                            name: "at",
                            color: foreground,
                          },
                        },
                      },
                    ],
                  ],
                  buttons: [
                    ({ hideModel, data, setData, setErrors }) => (
                      <UpdateUserName
                        hideModel={hideModel}
                        data={data}
                        setData={setData}
                        user={user as User}
                        setErrors={setErrors}
                      />
                    ),
                  ],
                  errorView: {
                    style: { color: "red", fontSize: 13, marginTop: 5 },
                  },
                },
              });
            }}
            className="flex-row items-center gap-3"
          >
            <MaterialIcon
              name="at"
              size={18}
              color="white"
              className="bg-orange-600 rounded-full p-2"
            />
            <View className="flex-col">
              <Text className="text-foreground font-medium text-md">
                Username
              </Text>
              <Text className="text-muted-foreground text-xs">
                {user?.username || ""}
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              Alert({
                which: "input",
                input: {
                  fields: [
                    [
                      // first name input
                      {
                        input: {
                          placeholder: "first name",
                          placeholderTextColor: "grey",
                          autoCapitalize: "none",
                          id: "firstName",
                          autoCorrect: false,
                          defaultValue: user?.firstName || "",
                          style: {
                            color: foreground,
                            borderRadius: 5,
                            paddingLeft: 10,
                          },
                          onValueChange: ({ text, data, setData, setErrors }) =>
                            setData({ ...data, firstName: text }),
                        },
                      },
                      // last name input
                      {
                        input: {
                          placeholder: "last name",
                          placeholderTextColor: "grey",
                          autoCapitalize: "none",
                          id: "lastName",
                          autoCorrect: false,
                          defaultValue: user?.lastName || "",
                          style: {
                            color: foreground,
                            borderRadius: 5,
                            paddingLeft: 10,
                          },
                          onValueChange: ({ text, data, setData, setErrors }) =>
                            setData({ ...data, lastName: text }),
                        },
                      },
                    ],
                  ],
                  buttons: [
                    ({ hideModel, data, setData, setErrors }) => (
                      <UpdateName
                        hideModel={hideModel}
                        data={data}
                        setData={setData}
                        user={user as User}
                        setErrors={setErrors}
                      />
                    ),
                  ],
                  errorView: {
                    style: { color: "red", fontSize: 13, marginTop: 5 },
                  },
                },
              });
            }}
            className="flex-row items-center gap-3"
          >
            <MaterialIcon
              name="person"
              size={18}
              color="white"
              className="bg-rose-500 rounded-full p-2"
            />
            <View className="flex-col">
              <Text className="text-foreground font-medium text-md">Name</Text>
              <Text className="text-muted-foreground text-xs">
                {user?.fullName || ""}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const UpdateUserName: React.FC<ButtonActionParams & { user: User }> = ({
  hideModel,
  data,
  user,
  setErrors,
}) => {
  const [isUpdating, setUpdating] = useState<boolean>(false);
  const { colorScheme } = useColorScheme();
  const { foreground, accent } = hexThemes[colorScheme!];

  const handleUpdate = async () => {
    if (isUpdating) return;
    setUpdating(true);
    try {
      await user.update({ username: data?.username });
      hideModel();
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err?.message === "That username is taken. Please try another.") {
          setErrors(["Username not available"]);
        }
      } else {
        setErrors(["Something went wrong. Please try again."]);
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Pressable
      disabled={
        isUpdating ||
        !data?.username ||
        data?.username === user?.username ||
        data?.username.length <= 3
      }
      onPress={handleUpdate}
      style={{ backgroundColor: accent + "60" }}
      className={`px-4 py-2.5 rounded-full flex items-center justify-center mt-20 disabled:opacity-50`}
    >
      {isUpdating ? (
        <MaterialIcon
          name="loading"
          size={17}
          color={foreground}
          className="animate-spin"
        />
      ) : (
        <Text style={{ color: foreground }}>Update</Text>
      )}
    </Pressable>
  );
};

const UpdateName: React.FC<ButtonActionParams & { user: User }> = ({
  hideModel,
  data,
  user,
  setErrors,
}) => {
  const [isUpdating, setUpdating] = useState<boolean>(false);
  const { colorScheme } = useColorScheme();
  const { foreground, accent } = hexThemes[colorScheme!];

  const handleUpdate = async () => {
    if (isUpdating) return;
    setUpdating(true);
    try {
      const updatedUser = await user.update({
        firstName: data?.firstName,
        lastName: data?.lastName,
      });
      pushUserToLocalStorage(updatedUser as User);
      hideModel();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Update failed:", err.message);
      }
      setErrors(["Something went wrong. Please try again."]);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Pressable
      disabled={
        isUpdating ||
        !data?.firstName ||
        !data?.lastName ||
        (data?.firstName === user?.firstName &&
          data?.lastName === user?.lastName)
      }
      onPress={handleUpdate}
      style={{ backgroundColor: accent + "60" }}
      className="px-4 py-2.5 rounded-full flex items-center justify-center mt-20 disabled:opacity-50"
    >
      {isUpdating ? (
        <MaterialIcon
          name="loading"
          size={17}
          color={foreground}
          className="animate-spin"
        />
      ) : (
        <Text style={{ color: foreground }}>Update</Text>
      )}
    </Pressable>
  );
};

export default ProfileSection;
