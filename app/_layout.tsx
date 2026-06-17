import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const checkUser = async () => {
    try {
      const result = await AsyncStorage.getItem("user");
      if (!result) return;
      const user = JSON.parse(result);
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) return;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false, title: "AUTH" }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "MENU" }}
        />
        <Stack.Screen
          name="details"
          options={{ headerShown: true, title: "Product Details" }}
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
