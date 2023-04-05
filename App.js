import React from "react";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";

import { store } from "./redux/store";

import Main from "./components/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
    justifyContent: "center",
  },
});
