import React from "react";
import { TextInputProps, TextProps, TextStyle, ViewProps } from "react-native";
import {
  ExpoAntIconType,
  ExpoFAIconType,
  ExpoIonIconType,
  ExpoMatIconType,
} from "./icon";
import { MaterialIcon } from "@/src/components/Icons/EV/MaterialIcon";
import { FaIcon } from "@/src/components/Icons/EV/FaIcon";
import { IonIcon } from "@/src/components/Icons/EV/IonIcon";
import { AntIcon } from "@/src/components/Icons/EV/AntIcon";

export interface AlertContextProps {
  /**
   * Function to trigger an alert or input dialog with the provided configuration.
   */
  Alert: (config: AlertConfig) => void;
}

export interface AlertConfig {
  /**
   * Specifies the type of dialog
   * @model alert | input | bottomSheet
   * @default alert
   */
  which: "alert" | "input" | "bottomSheet";
  /**
   * Configuration for an alert dialog (optional).
   */
  alert?: AlertModelProps;
  /**
   * Configuration for an input dialog (optional).
   */
  input?: InputModelProps;
  /**
   * Configuration for a bottom sheet dialog (optional).
   */
  bottomSheet?: BottomSheetProps;
}

export type AlertModelProps = {
  /**
   * Title of the alert dialog.
   */
  title: string;
  /**
   * Message to be displayed in the alert dialog.
   */
  message: string;
  /**
   * Text for the confirmation button (optional).
   */
  buttonText?: string;
  /**
   * Function to execute when the confirmation button is pressed (optional).
   */
  onConfirm?: () => void;
  /**
   * Additional buttons for the alert dialog (optional).
   */
  additionalButtons?: AdditionalButtonProps[];
};

export type ValueChangeParams = {
  /**
   * The text value entered by the user.
   */
  text: string;

  /**
   * The current form data, stored as a record of key-value pairs.
   * This represents the state of all fields in the form.
   * @model Input - Works only within the input model.
   */
  data: Record<string, string>;

  /**
   * Function to update the form data.
   * This function is used to update the form's state with new values.
   * @model Input - Works only within the input model.
   */
  setData: React.Dispatch<React.SetStateAction<Record<string, string>>>;

  /**
   * Function to update the error state.
   * This function sets the error messages related to the field.
   * @model Input - Works only within the input model.
   */
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

export type InputProps = TextInputProps & {
  /**
   * Custom value change handler, with error setting capability.
   */
  onValueChange?: ({
    text,
    data,
    setData,
    setErrors,
  }: ValueChangeParams) => void;
};

export type FieldsProps = {
  /**
   * Custom container style and properties for the field.
   */
  container?: ViewProps;
  /**
   * Header configuration for the input field (optional).
   */
  header?: TextProps & { title: string };
  /**
   * The input configuration, including optional icons.
   */
  input: InputProps & {
    /**
     * Icon displayed before the input field (optional).
     */
    iconBefore?: (
      | ExpoAntIconType
      | ExpoMatIconType
      | ExpoIonIconType
      | ExpoFAIconType
    ) & {
      icon:
        | typeof MaterialIcon
        | typeof FaIcon
        | typeof IonIcon
        | typeof AntIcon;
    };
    /**
     * Icon displayed after the input field (optional).
     */
    iconAfter?: (
      | ExpoAntIconType
      | ExpoMatIconType
      | ExpoIonIconType
      | ExpoFAIconType
    ) & {
      icon:
        | typeof MaterialIcon
        | typeof FaIcon
        | typeof IonIcon
        | typeof AntIcon;
    };
  };
};

export interface ButtonActionParams
  extends Pick<ValueChangeParams, "data" | "setErrors" | "setData"> {
  hideModel: () => void;
}

export type ButtonFunction = ({
  hideModel,
  data,
  setData,
  setErrors,
}: ButtonActionParams) => React.ReactNode;

export type InputModelProps = {
  /**
   * Title of the input dialog (optional).
   */
  title?: string;
  /**
   * Array of field configurations, can be a 2D array or 1D array.
   */
  fields?: FieldsProps[][] | FieldsProps[];
  /**
   * Style configuration for the error view (optional).
   */
  errorView?: TextProps;
  /**
   * Container style for the error messages (optional).
   */
  errorsContainer?: ViewProps;
  /**
   * Container style for the buttons (optional).
   */
  buttonsContainer?: ViewProps;
  /**
   * Array of button configurations for the dialog.
   */
  buttons?:
    | AdditionalButtonProps[]
    | React.ReactNode[]
    | ButtonFunction[]
    | (AdditionalButtonProps | React.ReactNode | ButtonFunction)[];
};

export type AdditionalButtonProps = {
  /**
   * The text or node to be displayed on the button.
   */
  buttonText: string | React.ReactNode;
  /**
   * Function to execute when the button is pressed.
   */
  onPress: ({
    hideModel,
    data,
    setData,
    setErrors,
  }: ButtonActionParams) => void;
  /**
   * Custom style for the button (optional).
   */
  style?: TextStyle;
};

export interface BottomSheetProps {
  /**
   * Props for the bottom sheet container. (optional)
   * Used to customize styles, accessibility, and event handling.
   */
  containerProps?: ViewProps;

  /**
   * The content to be displayed inside the bottom sheet. (optional)
   * Can include any valid React components.
   */
  children?: React.ReactNode;

  /**
   * The minimum height of the bottom sheet. (optional)
   * @defaults auto.
   */
  minHeight?: string;
}