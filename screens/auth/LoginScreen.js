import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignIn } from "../../redux/auth/authOperation";

const LoginScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const dispatch = useDispatch();

  const image = { uri: "https://picsum.photos/id/457/3333/3333" };

  const user = { email, password };

  const handleSubmit = () => {
    Keyboard.dismiss();

    onChangeEmail("");
    onChangePassword("");

    dispatch(authSignIn(user));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <TouchableWithoutFeedback onPress={handleSubmit}>
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Hello again, </Text>
              <Text style={styles.headerTitle}>Welcome back!</Text>
            </View>
            <View>
              <Text style={styles.inputTitle}>EMAIL</Text>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                value={email}
                onChangeText={onChangeEmail}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.inputTitle}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                secureTextEntry={true}
                value={password}
                onChangeText={onChangePassword}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={handleSubmit}
            >
              <Text style={styles.btnTitle}>SIGN IN</Text>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 60 }}>
              <Button
                color="transparent"
                title="Go to Register"
                onPress={() => navigation.navigate("Register")}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#696969",
    height: 40,
    borderRadius: 6,
    color: "#696969",
  },
  form: {
    marginHorizontal: 40,
  },
  btn: {
    height: 40,
    borderRadius: 6,
    marginTop: 40,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff8c00",
  },
  inputTitle: {
    color: "#696969",
    marginBottom: 10,
  },
  btnTitle: {
    color: "#696969",
    fontSize: 18,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  headerTitle: {
    // fontFamily: "Inter-Black",
    fontSize: 28,
    color: "#696969",
  },
});

export default LoginScreen;
