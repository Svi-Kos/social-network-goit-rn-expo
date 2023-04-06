import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUp =
  ({ nickname, email, password }) =>
  (dispatch, getState) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: nickname,
        })
          .then(() => {
            const { displayName, uid } = auth.currentUser;
            dispatch(
              authSlice.actions.updateUserProfile({
                name: displayName,
                id: uid,
              })
            );
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
  };

export const authSignIn =
  ({ email, password }) =>
  (dispatch, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

export const authStateChangeUser = () => (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    // console.log("authStateChangeUser------->", user);
    // console.log("current", auth.currentUser);
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          name: user.displayName,
          id: user.uid,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    } else {
      // User is signed out
      // ...
    }
  });
};

export const authSignOut = () => (dispatch, getState) => {
  signOut(auth)
    .then((r) => {
      dispatch(authSlice.actions.outSignOut());

      return r;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};
