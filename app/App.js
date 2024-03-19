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
import AuthPage from "./src/AuthPage";
import { Challenges } from "./src/Desafios";
import { FreeCode } from "./src/FreeCode";
import { FreeControl } from "./src/FreeControl";
import { WifiSetting } from "./src/WifiSetting";
import { supabase } from "./lib/initSupabase";
import { UserProvider } from "./contexts/UserContext";

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState("AuthPage");

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-SemiBold": Poppins_600SemiBold,
  });

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: dataUser } = await supabase.auth.getUser();

      setInitialRoute(dataUser.user ? "Home" : "AuthPage");
    };

    checkUserSession();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
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
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
          <Stack.Screen
            name="AuthPage"
            options={{ headerShown: false }}
            component={AuthPage}
          />
          <Stack.Screen name="Desafios" component={Challenges} />
          <Stack.Screen name="Programação Livre" component={FreeCode} />
          <Stack.Screen name="Controle Livre" component={FreeControl} />
          <Stack.Screen name="Configurar Wi-Fi" component={WifiSetting} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
