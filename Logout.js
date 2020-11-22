import React from "react";
import { Button } from "react-native-elements";

export default function Logout({ logout }) {
  return (
    <Button
      title="Logout"
      titleStyle={{ color: "#6e4d94" }}
      type="outline"
      raised
      onPress={() => logout()}
    />
  );
}
