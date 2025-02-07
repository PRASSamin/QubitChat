import React, {createContext, useState} from "react";
import {StyleSheet, Text, TextStyle, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";
import {useColorScheme} from "nativewind";

interface AlertConfig {
    title: string;
    message: string;
    buttonText?: string;
    onConfirm?: () => void;
    additionalButtons?: AdditionalButtonsProps[];
}

interface AlertContextProps {
    Alert: (config: AlertConfig) => void;
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);

type AdditionalButtonsProps = {
    buttonText: string;
    onPress: () => void;
    style?: TextStyle;
}

interface AlertProps {
    title: string;
    message: string;
    buttonText?: string;
    hideAlert: () => void;
    onConfirm?: () => void;
    additionalButtons?: AdditionalButtonsProps[];
}

const AlertView: React.FC<AlertProps> = ({title, message, buttonText = "OK", hideAlert, onConfirm, additionalButtons}) => {
    const {colorScheme} = useColorScheme();
    const styles = getStyles(colorScheme || "light")
    return (
        <View>
            <Modal isVisible={true} onBackdropPress={hideAlert}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
                <View style={styles.buttonContainer}>
                    {additionalButtons && (
                        additionalButtons.map((button, i) => (
                            <TouchableOpacity activeOpacity={0.7} key={i} onPress={button.onPress}>
                                <Text style={button.style ? button.style : styles.okButtonText}>{button.buttonText}</Text>
                            </TouchableOpacity>
                        ))
                    )}
                    <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        if (onConfirm) onConfirm();
                        hideAlert();
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

const getStyles = (theme: "light" | "dark") =>
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
            marginTop: 20
        },
        okButton: {
            borderRadius: 5,
        },
        okButtonText: {
            color: "#4d7fff",
            fontWeight: "bold",
        },
    });


export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [alertConfig, setAlertConfig] = useState<AlertConfig | null>(null);

    const Alert = (config: AlertConfig) => setAlertConfig(config);
    const hideAlert = () => setAlertConfig(null);

    return (
        <AlertContext.Provider value={{Alert}}>
            {alertConfig && <AlertView {...alertConfig} hideAlert={hideAlert}/>}
            {children}
        </AlertContext.Provider>
    );
};