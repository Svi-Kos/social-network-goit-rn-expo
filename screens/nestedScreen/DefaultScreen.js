import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();

  const getAllPosts = async () => {
    try {
      let arr = [];
      const querySnapshot = await getDocs(collection(db, "posts"));
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

  useEffect(() => {
    getAllPosts();
  }, [isFocused]);

  const postsToRender = posts.filter((e) => e !== undefined);

  return (
    <View style={styles.container}>
      <FlatList
        data={postsToRender}
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
                  backgroundColor: "#8b008b",
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
                  backgroundColor: "#2e8b57",
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
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

export default PostsScreen;
