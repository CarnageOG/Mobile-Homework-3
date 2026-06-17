import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FFFFFF",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          color: "#000000",
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerTitle: "Login",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
