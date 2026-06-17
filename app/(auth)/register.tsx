import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "../components/appButton/AppButton";
import AppInput from "../components/appInput/AppInput";

const Register = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return;
    }

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();
      console.log(result);
      router.replace("/(auth)/login");
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

      <AppInput
        placeholder="confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <AppButton
        title="Register"
        handlePress={handleRegister}
        hitSlop={20}
        disabled={!username || !password || !confirmPassword}
      />

      <Link style={styles.link} href={"/(auth)/login"}>
        Already have an account? Log In
      </Link>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },

  link: {
    marginTop: 20,
    alignSelf: "center",
    color: "#070D0D",
  },
});
