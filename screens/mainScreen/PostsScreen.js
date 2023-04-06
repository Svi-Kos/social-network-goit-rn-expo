import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "../nestedScreen/DefaultScreen";
import CommentScreen from "../nestedScreen/CommentScreen";
import MapScreen from "../nestedScreen/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="Default" component={DefaultScreen} />
      <NestedScreen.Screen name="Comment" component={CommentScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
