import React from "react";
import { Text, View, StyleSheet } from "react-native";

const CommentScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Comment</Text>
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

export default CommentScreen;
