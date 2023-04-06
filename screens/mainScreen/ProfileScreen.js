import React from "react";
import { Text, View, StyleSheet, Button, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOut } from "../../redux/auth/authOperation";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Button title="sign out" onPress={() => dispatch(authSignOut())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default ProfileScreen;
