import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "../router";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);

  const routing = useRoute(stateChange);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
