import axios from 'axios'

const API_KEY = 'AIzaSyDiuHEIBzG4tMBh6J6QnCu9WD860QxwusI'
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

export async function createUser(email, password) {
  const response = await axios.post(URL, {
    email,
    password,
    returnSecureToken: true,
  })
}
