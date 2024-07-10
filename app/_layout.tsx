import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import AppContainer from 'components/Shared/App/AppContainer';
import { DefaultNavigatorOptions, Variables } from "@style";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '@shared/Auth/AuthProvider';
import { Stack } from 'expo-router';

const queryClient = new QueryClient();

const AppTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: Variables.colors.primary,
    background: Variables.colors.background,
    text: Variables.colors.headerText,
    card: Variables.colors.primary,
  },
};

export default function Root() {
  return (
    <ThemeProvider value={AppTheme}>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <AuthProvider>
            <Stack
              screenOptions={{
                ...DefaultNavigatorOptions.screenOptions,
                contentStyle: {
                  backgroundColor: Variables.colors.background,
                },
                headerTintColor: Variables.colors.headerText,
              }}
            >
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="auth/register" options={{}} />
            </Stack>
          </AuthProvider>
        </AppContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
