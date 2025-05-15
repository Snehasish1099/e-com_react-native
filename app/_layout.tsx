import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import Header from '@/components/Header';
import { CartProvider } from '@/contexts/CartContext';
import colorScheme from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const router = useRouter()

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <Stack
          screenOptions={{
            header: () => <Header />,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
              headerRight: () => (
                <TouchableOpacity onPress={() => router.push('/cart')} style={{ marginRight: 15 }}>
                  <Ionicons name="cart-outline" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="cart"
            options={{
              title: "Cart",
              headerRight: () => (
                <TouchableOpacity onPress={() => router.push('/')} style={{ marginRight: 15 }}>
                  <Ionicons name="home-outline" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="product" options={{ title: "Product Details" }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </CartProvider>
    </ThemeProvider>
  );
}
