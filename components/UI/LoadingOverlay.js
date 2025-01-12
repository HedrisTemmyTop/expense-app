import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import React, { Component } from "react";
import { GlobalStyles } from "../../constants/styles";

export default class LoadingOverlay extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
