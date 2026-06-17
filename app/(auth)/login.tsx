import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "../components/appButton/AppButton";
import AppInput from "../components/appInput/AppInput";

const login = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("johnd");
  const [password, setPassword] = useState<string>("m38rmF$");

  const handleSubmit = async () => {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result?.token) {
      await AsyncStorage.setItem("user", JSON.stringify(result.token));
      router.replace("/(tabs)");
    }
  };

  return (
    <View style={styles.container}>
      <AppInput placeholder={"username"} onChangeText={(t) => setUsername(t)} />
      <AppInput
        placeholder={"password"}
        onChangeText={(t) => setPassword(t)}
        secureTextEntry
      />
      <AppButton
        title={"Log In"}
        handlePress={handleSubmit}
        hitSlop={20}
        disabled={username.length == 0 || password.length === 0}
      />
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
});
