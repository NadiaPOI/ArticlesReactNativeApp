import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from "react-native";

export default function Post({ post, handlePress }) {
  return (
    <TouchableHighlight onPress={() => handlePress(post.url)}>
      <View style={styles.item}>
        <Text style={styles.title}>{post.title} </Text>
        <Image style={styles.stretch} source={{ uri: post.imageURL }} />
        <Text>{post.description}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#dfe4ed",
    padding: 30,
    margin: 30
  },
  title: {
    fontSize: 20
  },
  stretch: {
    width: 260,
    height: 100,
    resizeMode: "stretch"
  }
});
