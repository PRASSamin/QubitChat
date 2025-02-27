import { StyleSheet, View } from "react-native";

const Nova = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    backgroundColor: "#f3f3f3",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  responseText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Nova;
