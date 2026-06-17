import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/appButton/AppButton";

export default function TabTwoScreen() {
  const router = useRouter();
  const handleLougOut = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/(auth)/login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <AppButton title="logout" handlePress={handleLougOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
