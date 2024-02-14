import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Home";
import { Welcome } from "./src/Welcome";
import { Challenges } from "./src/Desafios";
import { FreeCode } from "./src/FreeCode";
import { FreeControl } from "./src/FreeControl";
import { WifiSetting } from "./src/WifiSetting";

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState("Welcome");

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });

  const clearUserName = async () => {
    try {
      await AsyncStorage.removeItem("userName");
      console.log("UserName successfully removed!");
    } catch (error) {
      console.error("Failed to remove the userName.", error);
    }
  };

  useEffect(() => {
    //clearUserName();
    const checkFirstTimeUser = async () => {
      const name = await AsyncStorage.getItem("userName");
      if (name) {
        setInitialRoute("Home");
      }
    };

    checkFirstTimeUser();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f3f3f3",
          },
          headerShadowVisible: false,
          headerTintColor: "#011627", // Cor dos títulos e ícones no header
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
          },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={Welcome}
        />
        <Stack.Screen name="Desafios" component={Challenges} />
        <Stack.Screen name="Programação Livre" component={FreeCode} />
        <Stack.Screen name="Controle Livre" component={FreeControl} />
        <Stack.Screen name="Configurar Wi-Fi" component={WifiSetting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
