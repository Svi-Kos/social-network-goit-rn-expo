import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";
import { doc, collection, addDoc, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { db } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const isFocused = useIsFocused();

  const { postId } = route.params;
  const { nickname } = useSelector((s) => s.auth);

  useEffect(() => {
    getAllComments();
  }, [isFocused]);

  const createComment = async () => {
    try {
      const commentsRef = doc(db, "posts", `${postId}`);
      await addDoc(collection(commentsRef, "comments"), { comment, nickname });

      getAllComments();
      setComment("");
      Keyboard.dismiss();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const getAllComments = async () => {
    try {
      let arr = [];

      const commentsRef = doc(db, "posts", `${postId}`);

      const querySnapshot = await getDocs(collection(commentsRef, "comments"));
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data() });
      });

      setAllComments(arr);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginHorizontal: 20 }}
        data={allComments}
        renderItem={({ item }) => (
          <View>
            <Text>
              <Text style={{ fontWeight: "bold" }}>{item.nickname}</Text>:{" "}
              {item.comment}
            </Text>
          </View>
        )}
        keyExtractor={(item, idx) => idx.toString()}
      />
      <View style={{ marginBottom: 30 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write something..."
            onChangeText={setComment}
            value={comment}
          />
        </View>
        <TouchableOpacity style={styles.sendContainer} onPress={createComment}>
          <Text style={styles.sendLabel}>ADD COMMENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  sendContainer: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#4169e1",
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#4169e1",
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: "#4169e1",
  },
});

export default CommentsScreen;
