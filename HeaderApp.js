import React from "react";
import { Header } from "react-native-elements";

import Logout from "./Logout";

export default function HeaderApp({ asyncStorage, navigation }) {
  async function logout() {
    await asyncStorage.clear();
    navigation.navigate("Login");
  }

  return (
    <Header
      placement="left"
      leftComponent={{ icon: "code", color: "#fff" }}
      centerComponent={{ text: "My Articles App", style: { color: "#fff" } }}
      rightComponent={<Logout logout={logout} />}
      containerStyle={{
        backgroundColor: "#6e4d94",
        justifyContent: "space-around"
      }}
    />
  );
}
