import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ProgressBarAndroid
} from "react-native";
import { Linking } from "expo";

import Post from "./Post";

export default function PostsList() {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const response = await fetch("http://192.168.1.23:8800/posts");
    const data = await response.json();

    setIsLoading(false);
    setPosts(data);
    return data;
  }

  function handlePress(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  if (isLoading) {
    return (
      <View>
        <ProgressBarAndroid />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={post => post._id}
        data={posts}
        renderItem={({ item }) => (
          <Post handlePress={handlePress} post={item} />
        )}
      />
    </View>
  );
}
