import axios from 'axios'

const API_KEY = 'AIzaSyDiuHEIBzG4tMBh6J6QnCu9WD860QxwusI'

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  })
}

export async function createUser(email, password) {
  await authenticate('signUp', email, password)
}

export async function login(email, password) {
  await authenticate('signInWithPassword', email, password)
}
