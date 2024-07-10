import { useAuthContext } from "@shared/Auth/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const AppLayout = () => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Redirect href="/login" />
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
};

export default AppLayout;