import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ProgressBarAndroid,
  AsyncStorage,
  ScrollView,
  Alert
} from "react-native";

import { Linking } from "expo";

import Post from "./Post";
import HeaderApp from "./HeaderApp";

export default function PostsList({ navigation }) {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    fetchPosts();
    getUser();
  }, []);

  async function fetchPosts() {
    const response = await fetch("http://192.168.1.23:8800/posts");
    const data = await response.json();

    setIsLoading(false);
    setPosts(data);
  }

  async function getUser() {
    const userToken = await AsyncStorage.getItem("@userToken");

    if (userToken) {
      const user = JSON.parse(userToken);
      setUser(user);
      Alert.alert(`Welcome, ${user.username} !`, "Happy to see you :-)");
    }
  }

  async function updateUser(userUpdated) {
    await AsyncStorage.setItem("@userToken", JSON.stringify(user), () => {
      AsyncStorage.mergeItem("@userToken", JSON.stringify(userUpdated), () => {
        AsyncStorage.getItem("@userToken", (err, result) => {
          setUser(result);
        });
      });
    });
  }

  function handlePressPost(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  function handlePressFavorite(url) {
    const userId = user._id;

    fetch(`http://192.168.1.23:8800/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: url
      })
    })
      .then(res => {
        if (res.status === 201) {
          res.json().then(data => {
            updateUser(data.user);
            Alert.alert("Succes", data.text);
          });
        }

        if (res.status === 405) {
          res.json().then(data => {
            Alert.alert("Error", data.text);
          });
        }
      })
      .catch(err => {
        console.error(err);
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
    <ScrollView>
      <HeaderApp asyncStorage={AsyncStorage} navigation={navigation} />
      <FlatList
        keyExtractor={post => post._id}
        data={posts}
        renderItem={({ item }) => (
          <Post
            handlePressPost={handlePressPost}
            post={item}
            handlePressFavorite={handlePressFavorite}
          />
        )}
      />
    </ScrollView>
  );
}
