import axios from 'axios'
import { getRecoil, setRecoil } from '../components/providers/RecoilNexusProvider'
import { demoUser } from '../demo/user'
import { recoilToken, recoilUser } from '../recoil/user'
import { toBase64 } from './file'
import { isEmail } from './rules'

export async function login({account, password}: {account: string, password: string}) {
  if (process.env.demoMode) {
    setRecoil(recoilUser, demoUser)
    setRecoil(recoilToken, 'jwt test')
    return
  }

  if (!account && !password) throw new Error('Insufficient information')
  try {
    const { token, user } = (await axios.post(`${process.env.authURL}/authenticate`, {
      [isEmail(account) ? 'email' : 'username']: account,
      password
    })).data
    setRecoil(recoilUser, user)
    setRecoil(recoilToken, token)
  } catch (e) {
    throw new Error(e.response?.data?.message || e.message)
  }
}

export function logout() {
  setRecoil(recoilUser, null)
  setRecoil(recoilToken, null)
}

export async function getOneTimePassword(account: string) {
  if (process.env.demoMode) {
    return
  }

  if (!account) throw new Error('Insufficient information')
  try {
    return (await axios.post(`${process.env.authURL}/authenticate/one-time-password`, {
      [isEmail(account) ? 'email' : 'username']: account,
    })).data
  } catch (e) {
    throw new Error(e.response?.data?.message || e.message)
  }
}

export async function renewToken() {
  if (process.env.demoMode) {
    return
  }
  
  try {
    const token = getRecoil(recoilToken)
    if (token) {
      const iat = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).iat * 1000
      const oneWeek = 7 * 24 * 60 * 60 * 1000
      if (Date.now() > iat + oneWeek) {
        const result = (await axios.get(`${process.env.authURL}/authenticate/renew`, {
          headers: {
            authorization: `jwt ${token}`
          }
        })).data
        if (result.token) {
          setRecoil(recoilToken, result.token)
        }
      }
    }
  } catch (e) {
    console.log('Refresh Token Error: ' + e.message)
  }
}

export async function updateAvatar(file) {
  if (process.env.demoMode) {
    try {
      const base64 = <string>await toBase64(file)
      const user = getRecoil(recoilUser)
      setRecoil(recoilUser, {...user, avatar: base64})
      return
    } catch (e) {}
  }
  
  try {
    const base64 = <string>await toBase64(file)
    const token = getRecoil(recoilToken)
    const result = (await axios.post(`${process.env.authURL}/users/upload-avatar`, {
      avatar: base64
    }, {
      headers: {
        authorization: `jwt ${token}`
      }
    })).data
    const user = getRecoil(recoilUser)
    setRecoil(recoilUser, {...user, avatar: result.avatar})
  } catch (e) {
    throw new Error(e.response?.data?.message || e.message)
  }
}

export async function changePassword(password) {
  if (!password) {
    return
  }
  if (process.env.demoMode) {
    logout()
    return
  }
  
  try {
    const token = getRecoil(recoilToken)
    await axios.post(`${process.env.authURL}/users/change-password`, {
      password
    }, {
      headers: {
        authorization: `jwt ${token}`
      }
    })
    logout()
  } catch (e) {
    throw new Error(e.response?.data?.message || e.message)
  }
}