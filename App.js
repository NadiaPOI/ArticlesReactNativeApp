import React from "react";
import { StyleSheet } from "react-native";
import PostsList from "./PostsList";

export default function App() {
  return <PostsList style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
