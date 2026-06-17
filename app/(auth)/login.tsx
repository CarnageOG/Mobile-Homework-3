import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "../components/appButton/AppButton";
import AppInput from "../components/appInput/AppInput";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState<string>("johnd");
  const [password, setPassword] = useState<string>("m38rmF$");

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result?.token) {
        const userResponse = await fetch("https://fakestoreapi.com/users/1");
        const user = await userResponse.json();
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({ token: result.token, data: user }),
        );
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AppInput
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />

      <AppInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppButton
        title="Log In"
        handlePress={handleSubmit}
        hitSlop={20}
        disabled={!username || !password}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
});
