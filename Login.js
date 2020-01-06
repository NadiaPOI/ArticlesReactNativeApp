import React, { useState } from "react";
import { View, AsyncStorage, Alert } from "react-native";
import { Input, Button, Text, Header } from "react-native-elements";

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleSubmit() {
    fetch("http://192.168.1.23:8800/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then((res, data) => {
        if (res.status === 200) {
          res.json().then(data => {
            const user = data.user;
            AsyncStorage.setItem("@userToken", JSON.stringify(user));
            Alert.alert("Succes", data.text);
            navigation.navigate("Home");
          });
        } else {
          if (res.status === 404) {
            res.json().then(data => {
              Alert.alert("Error", data.text);
            });
          }
          if (res.status === 401) {
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
      <Header
        placement="left"
        leftComponent={{ icon: "code", color: "#fff" }}
        centerComponent={{ text: "My Articles App", style: { color: "#fff" } }}
        rightComponent={
          <Button
            title="Signup"
            titleStyle={{ color: "#6e4d94" }}
            type="outline"
            raised
            onPress={() => navigation.navigate("Signup")}
          />
        }
        containerStyle={{
          backgroundColor: "#6e4d94",
          justifyContent: "space-around"
        }}
      />
      <Text h3 h3Style={{ marginVertical: 30, marginLeft: 5 }}>
        Please Login
      </Text>
      <Input
        style={{ height: 40, borderColor: "gray", borderWidth: 1, margin: 50 }}
        placeholder="Enter your email"
        label="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={email => setEmail(email.trim())}
        onSubmitEditing={() => handleSubmit()}
        leftIcon={{ type: "font-awesome", name: "envelope" }}
        leftIconContainerStyle={{ marginRight: 15 }}
      />
      <Input
        style={{ height: 40, borderColor: "gray", borderWidth: 1, margin: 50 }}
        placeholder="Enter your password"
        label="password"
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password)}
        onSubmitEditing={() => handleSubmit()}
        leftIcon={{ type: "font-awesome", name: "lock" }}
        leftIconContainerStyle={{ marginRight: 15, paddingLeft: 5 }}
      />
      <View>
        <Button
          buttonStyle={{
            marginTop: 30,
            marginHorizontal: 5,
            borderColor: "#6e4d94",
            borderWidth: 2
          }}
          title="Login"
          titleStyle={{ color: "#6e4d94" }}
          type="outline"
          raised
          onPress={() => handleSubmit()}
        />
      </View>
    </View>
  );
}
