import React, { useEffect } from "react";
import { View, ActivityIndicator, StatusBar, AsyncStorage } from "react-native";

export default function AuthLoadingScreen(props) {
  useEffect(() => {
    getAuth();
  });

  async function getAuth() {
    const userToken = await AsyncStorage.getItem("@userToken");
    props.navigation.navigate(userToken ? "Home" : "Login");
  }

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
