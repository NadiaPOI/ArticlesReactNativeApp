import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Card, Icon } from "react-native-elements";

export default function Post({ post, handlePressPost, handlePressFavorite }) {
  return (
    <TouchableOpacity onPress={() => handlePressPost(post.url)}>
      <Card
        containerStyle={styles.container}
        title={post.title}
        titleStyle={{ fontSize: 20, textAlign: "left" }}
      >
        <View style={styles.content}>
          <Image style={styles.image} source={{ uri: post.imageURL }} />
          <View style={styles.description_container}>
            <Text style={styles.description}>{post.description}</Text>
          </View>
        </View>
        <Icon
          raised
          name="heart"
          type="font-awesome"
          color="#6e4d94"
          onPress={() => handlePressFavorite(post.url)}
          containerStyle={{ alignSelf: "flex-end" }}
        />
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#6e4d94",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 50,
    shadowOffset: { width: 30, height: 20 },
    shadowColor: "black",
    shadowOpacity: 1.0,
    elevation: 7
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  image: {
    width: 120,
    height: 160,
    resizeMode: "stretch"
  },
  description_container: {
    flex: 3
  },
  description: {
    fontStyle: "italic",
    color: "#666666",
    padding: 15
  }
});
