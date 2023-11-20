import { useContext, useEffect, useState, useCallback } from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SplashScreen from 'expo-splash-screen'

import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import { Colors } from './constants/styles'
import AuthContextProvider, { AuthContext } from './store/auth-context'
import IconButton from './components/ui/IconButton'

const Stack = createNativeStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
      />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext)

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

function Root() {
  const authCtx = useContext(AuthContext)
  const [isTryingLogin, setIsTryingLogin] = useState(true)

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token')

      if (storedToken) {
        authCtx.authenticate(storedToken)
      }
      setIsTryingLogin(false)
    }

    fetchToken()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (!isTryingLogin) {
      await SplashScreen.hideAsync()
    }
  }, [isTryingLogin])

  if (isTryingLogin) {
    return null
  }

  return (
    <View
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  )
}

export default function App() {
  SplashScreen.preventAutoHideAsync()

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  )
}
