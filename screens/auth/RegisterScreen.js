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

const RegisterScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [nickname, onChangeNickname] = useState("");

  const user = { nickname, email, password };

  const image = { uri: "https://picsum.photos/id/120/3333/3333" };

  const handleSubmit = () => {
    Keyboard.dismiss();

    onChangeEmail("");
    onChangePassword("");
    onChangeNickname("");
    // dispatch(authSignUp(user));
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
              <Text style={styles.headerTitle}>Registration</Text>
            </View>
            <View>
              <Text style={styles.inputTitle}>NICKNAME</Text>
              <TextInput
                style={styles.input}
                textAlign={"center"}
                value={nickname}
                onChangeText={onChangeNickname}
              />
            </View>
            <View style={{ marginTop: 20 }}>
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
              <Text style={styles.btnTitle}>SIGN UP</Text>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 60 }}>
              <Button
                color="transparent"
                title="Go to Login"
                onPress={() => navigation.navigate("Login")}
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
    borderColor: "#f0ffff",
    height: 40,
    borderRadius: 6,
    color: "#f0ffff",
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
    backgroundColor: "#483d8b",
  },
  inputTitle: {
    color: "#f0ffff",
    marginBottom: 10,
  },
  btnTitle: {
    color: "#f0ffff",
    fontSize: 18,
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  headerTitle: {
    // fontFamily: "Inter-Black",
    fontSize: 28,
    color: "#f0ffff",
  },
});

export default RegisterScreen;
