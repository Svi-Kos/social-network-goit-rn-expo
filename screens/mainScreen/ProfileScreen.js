import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { db } from "../../firebase/config";
import { authSignOut } from "../../redux/auth/authOperation";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const { userId } = useSelector((s) => s.auth);

  useEffect(() => {
    getUserPosts();
  }, [isFocused]);

  const getUserPosts = async () => {
    try {
      let arr = [];
      const q = query(collection(db, "posts"), where("userId", "==", userId));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setPosts(arr);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              margin: 10,
              alignItems: "center",
            }}
          >
            <Image source={{ uri: item.photo }} style={styles.image} />
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Pressable
                style={{
                  ...styles.button,
                  borderBottomLeftRadius: 10,
                  backgroundColor: "#008080",
                }}
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              >
                <Text style={styles.text}>OPEN MAP</Text>
              </Pressable>

              <Pressable
                style={{
                  ...styles.button,
                  borderBottomRightRadius: 10,
                  backgroundColor: "#ff1493",
                }}
                onPress={() =>
                  navigation.navigate("Comment", { postId: item.id })
                }
              >
                <Text style={styles.text}>COMMENTS</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
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
  image: {
    height: 150,
    width: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 75,
    height: 25,
  },
  text: {
    fontSize: 12,
    color: "white",
  },
});

export default ProfileScreen;
