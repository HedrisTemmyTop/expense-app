import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

const ErrorOverlay = ({ onConfirm, message }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    color: "#fff",
    marginVertical: 10,
    fontSize: 14,
  },
});
