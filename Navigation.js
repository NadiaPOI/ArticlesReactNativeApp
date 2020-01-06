import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-elements";

import PostsList from "./PostsList";
import Login from "./Login";
import AddPost from "./AddPost";
import Profil from "./Profil";
import AuthLoadingScreen from "./AuthLoadingScreen";
import Signup from "./Signup";

const tabBarOptions = {
  showLabel: true,
  activeTintColor: "#6e4d94"
};

const authNavigator = createBottomTabNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Login",
        tabBarOptions: tabBarOptions,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="face" size={35} color={tintColor} />
        )
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        title: "Signup",
        tabBarOptions: tabBarOptions,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="input" size={35} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Login"
  }
);

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: PostsList,
      navigationOptions: {
        title: "Home",
        tabBarOptions: tabBarOptions,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={35} color={tintColor} />
        )
      }
    },
    AddPost: {
      screen: AddPost,
      navigationOptions: {
        title: "Add Post",
        tabBarOptions: tabBarOptions,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bookmark" size={35} color={tintColor} />
        )
      }
    },
    Profil: {
      screen: Profil,
      navigationOptions: {
        title: "Profil",
        tabBarOptions: tabBarOptions,
        tabBarIcon: ({ tintColor }) => (
          <Icon name="face" size={35} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthLoadingScreen,
      Home: AppNavigator,
      Login: authNavigator
    },
    {
      initialRouteName: "Auth"
    }
  )
);
