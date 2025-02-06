import React, {createContext, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";
import {useColorScheme} from "nativewind";

interface AlertConfig {
    title: string;
    message: string;
    buttonText?: string;
    onConfirm?: () => void;
}

interface AlertContextProps {
    showAlert: (config: AlertConfig) => void;
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);

interface AlertProps {
    title: string;
    message: string;
    buttonText?: string;
    hideAlert: () => void;
    onConfirm?: () => void;
}

const Alert: React.FC<AlertProps> = ({title, message, buttonText = "OK", hideAlert, onConfirm}) => {
    const {colorScheme} = useColorScheme();
    const styles = getStyles(colorScheme || "light")
    return (
        <View>
            <Modal isVisible={true} onBackdropPress={hideAlert}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
                <TouchableOpacity
                    onPress={() => {
                        if (onConfirm) onConfirm();
                        hideAlert();
                    }}
                    style={styles.okButton}
                >
                    <Text style={styles.okButtonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </Modal></View>
    );
};

const getStyles = (theme: "light" | "dark") =>
    StyleSheet.create({
        modalContainer: {
            backgroundColor: theme === "light" ? "white" : "#1d1d1d",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
            // borderStyle: "solid",
            // borderColor: hexThemes[theme].border,
            // borderWidth: 1,
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            color: theme === "light" ? "black" : "white",
        },
        message: {
            fontSize: 16,
            marginBottom: 20,
            color: theme === "light" ? "gray" : "lightgray",
        },
        okButton: {
            backgroundColor: theme === "light" ? "blue" : "purple",
            padding: 10,
            borderRadius: 5,
        },
        okButtonText: {
            color: "white",
            fontWeight: "bold",
        },
    });


export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);

    const showAlert = (config: AlertConfig) => setAlertConfig(config);
    const hideAlert = () => setAlertConfig(null);

    console.log(alertConfig)
    return (
        <AlertContext.Provider value={{showAlert}}>
            {alertConfig && <Alert {...alertConfig} hideAlert={hideAlert}/>}
            {children}
        </AlertContext.Provider>
    );
};