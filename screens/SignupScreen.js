import { useState } from 'react'
import { Alert } from 'react-native'

import AuthContent from '../components/Auth/AuthContent'
import { createUser } from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      await createUser(email, password)
    } catch (error) {
      Alert.alert(
        'Authenication failed',
        'Could not create user, please check your input and try again later.'
      )
    }
    setIsAuthenticating(false)
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />
  }

  return <AuthContent onAuthenticate={signupHandler} />
}

export default SignupScreen
