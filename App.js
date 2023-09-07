import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RandomPage from "./components/RandomPage";
import HomePage from "./components/HomePage";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { RandomImageProvider } from "./components/RandomImageContext";
import { useNavigation } from "@react-navigation/native";

import homeIcon from "./assets/home-icon.png";

const Tab = createBottomTabNavigator();

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const CustomSidebarContent = () => {
    const navigation = useNavigation();

    return (
      <View style={styles.sidebar}>
        <TouchableOpacity onPress={() => navigation.navigate("Random")}>
          <Text style={[styles.sidebarText, styles.centerText]}>Random</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={[styles.sidebarText, styles.centerText]}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <RandomImageProvider>
      <NavigationContainer>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {isSidebarOpen && (
            <CustomSidebarContent navigation={Tab.Navigation} />
          )}
          <View style={{ flex: 1 }}>
            <Tab.Navigator>
              <Tab.Screen
                name="Random"
                component={RandomPage}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Image
                      source={homeIcon}
                      style={{ width: size, height: size, tintColor: color }}
                    />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Image
                      source={homeIcon}
                      style={{ width: size, height: size, tintColor: color }}
                    />
                  ),
                  headerShown: false,
                }}
              />
            </Tab.Navigator>
          </View>
        </View>
        <TouchableOpacity
          onPress={toggleSidebar}
          style={styles.hamburgerButton}
        >
          <Image
            source={require("./assets/burger-bar.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </NavigationContainer>
    </RandomImageProvider>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 200,
    backgroundColor: "white",
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  tabBarLabel: {
    fontSize: 16,
    textAlign: "center",
  },
  sidebarText: {
    fontSize: 18,
  },
  centerText: {
    marginTop: 30,
  },
  hamburgerButton: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 1,
  },
});

export default App;
