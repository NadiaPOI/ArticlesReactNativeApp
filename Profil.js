import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  FlatList,
  AsyncStorage,
  ProgressBarAndroid
} from "react-native";
import { Text, Icon } from "react-native-elements";
import { Linking } from "expo";

import HeaderApp from "./HeaderApp";
import Post from "./Post";

export default function Profil({ navigation }) {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser();
  }, [user]);

  function handlePress(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  async function getUser() {
    const userToken = await AsyncStorage.getItem("@userToken");

    if (userToken) {
      const user = JSON.parse(userToken);
      setUser(user);
    }
  }

  return user ? (
    <ScrollView>
      <HeaderApp asyncStorage={AsyncStorage} navigation={navigation} />
      <Text h3 h3Style={{ marginVertical: 30, textAlign: "center" }}>
        Welcome, {user.username} !
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon raised name="heart" type="font-awesome" color="#6e4d94" />
        <Text h4 h4Style={{ paddingVertical: 30, paddingLeft: 5 }}>
          My favorites articles
        </Text>
      </View>
      {user.favorites.length > 0 ? (
        <FlatList
          keyExtractor={post => post.url}
          data={user.favorites}
          renderItem={({ item }) => (
            <Post
              handlePressPost={handlePress}
              post={item}
              handlePressFavorite={() => console.log("Article deleted")}
            />
          )}
        />
      ) : (
        <Text style={{ textAlign: "center" }}>You don't have favorites</Text>
      )}
    </ScrollView>
  ) : (
    <View>
      <ProgressBarAndroid />
    </View>
  );
}
