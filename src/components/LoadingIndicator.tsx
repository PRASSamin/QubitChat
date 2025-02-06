import { View, ActivityIndicator } from "react-native"
import { Spinner } from "stream-chat-expo";

export const LoadingIndicator = () => {
    return (
        <View className={"flex-1 w-full h-full items-center justify-center bg-background"}>
            <Spinner height={20} width={20}  />
        </View>
    );
};