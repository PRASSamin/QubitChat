import React, { createContext, useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useColorScheme } from "nativewind";
import { ThemeType } from "../types";
import {
  AdditionalButtonProps,
  AlertConfig,
  AlertContextProps,
  AlertModelProps,
  BottomSheetProps,
  FieldsProps,
  InputModelProps,
} from "../types/alert";
import { hexThemes } from "../constants/Theme";
import { RanString } from "../utils/randomString";

export const AlertContext = createContext<AlertContextProps | undefined>(
  undefined
);

const AlertView: React.FC<AlertModelProps & { hideModel: () => void }> = ({
  title,
  message,
  buttonText = "OK",
  onConfirm,
  additionalButtons,
  hideModel,
}) => {
  const { colorScheme } = useColorScheme();
  const styles = getAlertStyles(colorScheme || "light");
  const [data, setData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);
  return (
    <View>
      <Modal isVisible={true} onBackdropPress={hideModel}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            {additionalButtons &&
              additionalButtons.map((button, i) => (
                <TouchableOpacity
                  hitSlop={2}
                  activeOpacity={0.7}
                  key={i}
                  onPress={() =>
                    button.onPress({ hideModel, data, setData, setErrors })
                  }
                >
                  <Text
                    style={button.style ? button.style : styles.okButtonText}
                  >
                    {button.buttonText}
                  </Text>
                </TouchableOpacity>
              ))}
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={2}
              onPress={() => {
                if (onConfirm) onConfirm();
                hideModel();
              }}
              style={styles.okButton}
            >
              <Text style={styles.okButtonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getAlertStyles = (theme: ThemeType) =>
  StyleSheet.create({
    modalContainer: {
      backgroundColor: "white",
      paddingBlock: 25,
      paddingInline: 20,
      borderRadius: 15,
      alignItems: "flex-start",
    },
    title: {
      fontSize: 20,
      fontWeight: "semibold",
      marginBottom: 5,
      color: "black",
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
      color: "gray",
    },
    buttonContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      gap: 14,
      marginTop: 20,
    },
    okButton: {
      borderRadius: 5,
    },
    okButtonText: {
      color: "#4d7fff",
      fontWeight: "bold",
    },
  });

const InputView: React.FC<InputModelProps & { hideModel: () => void }> = ({
  title,
  fields = [],
  buttons = [],
  buttonsContainer,
  errorsContainer,
  errorView,
  hideModel,
}) => {
  const { colorScheme } = useColorScheme();
  const [errors, setErrors] = useState<string[]>([]);

  const isNestedArray = Array.isArray(fields[0]);
  const normalizedFields: FieldsProps[][] = isNestedArray
    ? (fields as FieldsProps[][])
    : [fields as FieldsProps[]];
  const { muted, foreground, background, border, primaryForeground } =
    hexThemes[colorScheme!];
  const [data, setData] = useState<Record<string, string>>({});

  const handleError = useCallback(
    (
      text: string,
      setError: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
      setError((prev) => {
        if (!text && !prev.includes("Field is required.")) {
          return [...prev, "Field is required."];
        }
        return prev;
      });
    },
    []
  );

  const isAdditionalButtonProps = (
    item: any
  ): item is AdditionalButtonProps => {
    return (
      typeof item === "object" &&
      item !== null &&
      "buttonText" in item &&
      "onPress" in item
    );
  };

  const onHideModel = () => {
    hideModel();
    setData({});
    setErrors([]);
  };

  useEffect(() => {
    fields.forEach((field) => {
      if ("input" in field) {
        if (field?.input?.defaultValue) {
          setData((prev) => ({
            ...prev,
            [field?.input?.id || RanString(10)]: field.input
              .defaultValue as string,
          }));
        }
      } else {
        field.forEach((subField) => {
          if (subField?.input?.defaultValue) {
            setData((prev) => ({
              ...prev,
              [subField?.input?.id || RanString(10)]: subField.input
                .defaultValue as string,
            }));
          }
        });
      }
    });
  }, [fields]);

  return (
    <View>
      <Modal
        isVisible={true}
        style={{ margin: 0, justifyContent: "flex-end" }}
        onBackdropPress={onHideModel}
      >
        <View
          style={{
            backgroundColor: muted,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          className="p-5"
        >
          <View>
            {title && (
              <Text style={{ color: foreground }} className="text-lg font-bold">
                {title}
              </Text>
            )}

            {/* Render Input Fields */}
            {normalizedFields.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flexDirection: isNestedArray ? "row" : "column",
                  justifyContent: "space-between",
                  gap: isNestedArray ? 10 : 15,
                }}
              >
                {row.map((field, colIndex) => {
                  const {
                    container: {
                      style: containerStyle,
                      ...containerProps
                    } = {},
                    header: { title, style: headerStyle, ...headerProps } = {},
                    input: {
                      style: inputStyle,
                      onValueChange,
                      onChangeText,
                      id: inputId,
                      iconAfter: {
                        icon: IconAfter,
                        style: IconAfterStyle,
                        size: IconAfterSize,
                        ...IconAfterProps
                      } = {},
                      iconBefore: {
                        icon: IconBefore,
                        style: IconBeforeStyle,
                        size: IconBeforeSize,
                        ...IconBeforeProps
                      } = {},
                      ...inputProps
                    },
                  } = field;

                  return (
                    <View
                      key={colIndex}
                      style={[
                        { flex: isNestedArray ? 1 : undefined },
                        containerStyle,
                      ]}
                      {...containerProps}
                    >
                      {title && (
                        <Text
                          style={[headerStyle, { color: foreground }]}
                          {...headerProps}
                        >
                          {title}
                        </Text>
                      )}
                      <View
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "auto",
                        }}
                      >
                        {IconBefore && (
                          <IconBefore
                            style={[
                              {
                                position: "absolute",
                                left: 10,
                                top: "50%",
                                transform: [
                                  { translateY: -(IconBeforeSize || 20) / 2 },
                                ],
                              },
                              IconBeforeStyle,
                            ]}
                            {...IconBeforeProps}
                          />
                        )}
                        <TextInput
                          style={[
                            {
                              color: foreground,
                              backgroundColor: background + "50",
                              borderWidth: 1,
                              borderStyle: "solid",
                              borderColor:
                                colorScheme === "dark"
                                  ? border
                                  : primaryForeground + "20",
                              padding: 12,
                              paddingLeft: IconBefore?.name ? 40 : 10,
                            },
                            inputStyle,
                          ]}
                          onChangeText={(text) => {
                            onValueChange
                              ? onValueChange?.({
                                  text,
                                  setErrors,
                                  data,
                                  setData,
                                })
                              : onChangeText
                              ? onChangeText?.(text)
                              : setData({
                                  ...data,
                                  [inputId || RanString(10)]: text,
                                });
                            handleError(text, setErrors);
                          }}
                          {...inputProps}
                        />
                        {IconAfter && (
                          <IconAfter
                            style={[
                              {
                                position: "absolute",
                                right: 6,
                                top: "50%",
                                transform: [
                                  { translateY: -(IconAfterSize || 20) / 2 },
                                ],
                              },
                              IconAfterStyle,
                            ]}
                            {...IconAfterProps}
                          />
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            ))}

            {/* Render Errors */}
            <View {...errorsContainer}>
              {errors.map((error, index) => (
                <Text key={index} {...errorView}>
                  {error}
                </Text>
              ))}
            </View>

            {/* Render Buttons */}
            <View {...buttonsContainer}>
              {buttons.map((button, index) => {
                if (isAdditionalButtonProps(button)) {
                  return (
                    <TouchableOpacity
                      hitSlop={2}
                      key={index}
                      activeOpacity={0.7}
                      onPress={() =>
                        button.onPress({
                          hideModel: onHideModel,
                          data,
                          setData,
                          setErrors,
                        })
                      }
                    >
                      <Text style={[{ color: foreground }, button.style]}>
                        {button.buttonText}
                      </Text>
                    </TouchableOpacity>
                  );
                } else if (typeof button === "function") {
                  return (
                    <React.Fragment key={index}>
                      {button({
                        hideModel: onHideModel,
                        data,
                        setData,
                        setErrors,
                      })}
                    </React.Fragment>
                  );
                } else if (React.isValidElement(button)) {
                  // If it's a React component, clone it and pass hideModel as a prop
                  return React.cloneElement(button, { key: index });
                } else {
                  return null;
                }
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const BottomSheetView: React.FC<
  BottomSheetProps & { hideModel: () => void }
> = ({ hideModel, containerProps = {}, minHeight, children }) => {
  const { colorScheme } = useColorScheme();
  const { muted } = hexThemes[colorScheme!];
  const [isVisible, setIsVisible] = useState(true);
  const {
    style: containerStyle,
    className: containerClassName,
    ...containerRestProps
  } = containerProps;

  return (
    <View>
      <Modal
        isVisible={isVisible}
        style={{ margin: 0, justifyContent: "flex-end" }}
        animationOutTiming={500}
        onBackdropPress={() => {
          setIsVisible(false);
          setTimeout(() => {
            hideModel();
          }, 500);
        }}
      >
        <View
          style={[
            {
              backgroundColor: muted,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              minHeight: minHeight || "auto",
            },
            containerStyle,
          ]}
          className={`p-5 ${containerClassName}`}
          {...containerRestProps}
        >
          {children}
        </View>
      </Modal>
    </View>
  );
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);

  const Alert = (config: AlertConfig) => setAlertConfig(config);
  const hideModel = () => setAlertConfig(null);

  return (
    <AlertContext.Provider value={{ Alert }}>
      {alertConfig &&
        (alertConfig.which === "alert" ? (
          <AlertView {...alertConfig.alert!} hideModel={hideModel} />
        ) : alertConfig.which === "input" ? (
          <InputView {...alertConfig.input!} hideModel={hideModel} />
        ) : alertConfig.which === "bottomSheet" ? (
          <BottomSheetView
            {...alertConfig.bottomSheet!}
            hideModel={hideModel}
          />
        ) : null)}
      {children}
    </AlertContext.Provider>
  );
};
