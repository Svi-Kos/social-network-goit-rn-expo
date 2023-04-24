import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { useIsFocused } from "@react-navigation/core";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const CreateScreen = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [urlFromDb, setUrlFromDb] = useState(null);

  const { userId, nickname } = useSelector((s) => s.auth);

  const isFocused = useIsFocused();

  const storage = getStorage();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ textAlign: "center" }}>Дати доступ до камери</Text>

        <Button onPress={requestPermission} title="Дозволити" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
      setPhoto(photo.uri);

      // console.log(location.coords.latitude);
      // console.log(location.coords.longitude);
    } catch (error) {
      console.error;
    }
  };

  const savePhoto = async () => {
    try {
      if (photo) {
        await uploadPostToServer();
        navigation.navigate("Default");
        // uploadPhotoToServer();

        setComment("");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const url = await uploadPhotoToServer();
      const docRef = await addDoc(collection(db, "posts"), {
        photo: url,
        comment,
        location: location.coords,
        userId,
        nickname,
      });
      console.log("Document written with ID: ", docRef.id);
      return url;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const uploadPhotoToServer = async () => {
    const uniquePostId = Date.now().toString();
    let downloadedURL;
    await fetch(photo)
      .then((response) => response.blob())
      .then(async (imageBlob) => {
        const storageRef = ref(storage, `images/${uniquePostId}`);
        await uploadBytes(storageRef, imageBlob)
          .then(async (snapshot) => {
            // console.log("Uploaded a blob or file!");
            await getDownloadURL(ref(storage, `images/${uniquePostId}`))
              .then((url) => {
                downloadedURL = url;
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
              });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    return downloadedURL;
  };

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera style={styles.camera} type={type} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoComtainer}>
              <Image
                source={{ uri: photo }}
                style={{ height: 200, width: 200 }}
              />
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
              <Text style={styles.text}>SNAP</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write something..."
          onChangeText={setComment}
          value={comment}
        />
      </View>
      <TouchableOpacity style={styles.sendContainer} onPress={savePhoto}>
        <Text style={styles.sendLabel}>SAVE TO GALLERY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "70%",
    marginTop: 40,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
    margin: 40,
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  snapContainer: {
    borderWidth: 2,
    borderColor: "#4169e1",
    borderRadius: 50,
    width: 70,
    height: 70,

    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoComtainer: {
    position: "absolute",
    top: 100,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
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

export default CreateScreen;
