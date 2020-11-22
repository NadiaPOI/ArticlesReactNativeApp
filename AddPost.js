import React, { useState } from "react";
import {
  View,
  AsyncStorage,
  Alert,
  Clipboard,
  TouchableOpacity
} from "react-native";
import { Input, Button, Text } from "react-native-elements";

import HeaderApp from "./HeaderApp";

export default function AddPost({ navigation }) {
  const [url, setUrl] = useState();

  async function getContentClipboard() {
    var content = await Clipboard.getString();
    setUrl(content);
  }

  function handleSubmit() {
    fetch("http://192.168.1.23:8800/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url
      })
    })
      .then(res => {
        if (res.status === 201) {
          res.json().then(data => {
            Alert.alert("Succes", data.text);
            navigation.navigate("PostsList");
          });
        } else {
          if (res.status === 400) {
            res.json().then(data => {
              Alert.alert("Error", data.text);
            });
          }
          if (res.status === 405) {
            res.json().then(data => {
              Alert.alert("Error", data.text);
            });
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <View>
      <HeaderApp asyncStorage={AsyncStorage} navigation={navigation} />
      <Text h3 h3Style={{ marginVertical: 30, marginLeft: 5 }}>
        Add a new Post
      </Text>
      <TouchableOpacity onLongPress={() => getContentClipboard()}>
        <Input
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            margin: 50
          }}
          placeholder="Enter a valid URL"
          label="Url"
          textContentType="URL"
          autoCapitalize="none"
          value={url}
          onChangeText={url => setUrl(url)}
          onSubmitEditing={() => handleSubmit()}
          leftIcon={{ type: "font-awesome", name: "globe" }}
          leftIconContainerStyle={{ marginRight: 15 }}
        />
      </TouchableOpacity>
      <Button
        buttonStyle={{
          marginTop: 30,
          marginHorizontal: 5,
          borderColor: "#6e4d94",
          borderWidth: 2
        }}
        title="Publish Post"
        titleStyle={{ color: "#6e4d94" }}
        type="outline"
        raised
        onPress={() => handleSubmit()}
      />
    </View>
  );
}
