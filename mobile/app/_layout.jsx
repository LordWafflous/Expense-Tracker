import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";
import SafeScreen from "@/components/SafeScreen"
import { Clerk, ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'

export default function RootLayout() {
  //return <Stack screenOptions={{headerShown: false}} />;
  return  <ClerkProvider tokenCache={tokenCache}>
            <SafeScreen>
              <Slot />
            </SafeScreen>
           </ClerkProvider>;
// <Stack />
}
