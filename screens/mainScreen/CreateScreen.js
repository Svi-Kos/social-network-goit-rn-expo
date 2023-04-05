import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CreateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Create</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateScreen;
