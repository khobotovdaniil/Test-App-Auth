import AsyncStorage from '@react-native-async-storage/async-storage'
import { createContext, useState } from 'react'

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: token => {},
  logout: () => {},
})

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState()

  function authenticate(token) {
    setAuthToken(token)
    AsyncStorage.setItem('token', token)
  }

  function logout() {
    setAuthToken(null)
    AsyncStorage.removeItem('token')
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
