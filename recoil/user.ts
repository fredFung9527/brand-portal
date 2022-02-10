import { atom, selector } from 'recoil'
import { User } from '../@types/user'
import { localStorageEffect, sessionStorageEffect } from './storage'

export const recoilRememberMe = atom<boolean>({
  key: 'rememberMe',
  default: true,
  effects_UNSTABLE: [
    localStorageEffect('rememberMe')
  ]
})

export const recoilUserLocal = atom<User>({
  key: 'userLocal',
  default: null,
  effects_UNSTABLE: [
    localStorageEffect('userLocal')
  ]
})

export const recoilUserSession = atom<User>({
  key: 'userSession',
  default: null,
  effects_UNSTABLE: [
    sessionStorageEffect('userSession')
  ]
})

export const recoilUser = selector<User>({
  key: 'user',
  get: ({get}) => {
    return get(recoilRememberMe) ? get(recoilUserLocal) : get(recoilUserSession)
  },
  set: ({set, get}, newValue) => {
    if (!newValue) {
      set(recoilUserLocal, null)
      set(recoilUserSession, null)
    } else if (get(recoilRememberMe)) {
      set(recoilUserLocal, newValue)
    } else {
      set(recoilUserSession, newValue)
    }
  }
})

export const recoilTokenLocal = atom<string>({
  key: 'tokenLocal',
  default: null,
  effects_UNSTABLE: [
    localStorageEffect('tokenLocal')
  ]
})

export const recoilTokenSession = atom<string>({
  key: 'tokenSession',
  default: null,
  effects_UNSTABLE: [
    sessionStorageEffect('tokenSession')
  ]
})

export const recoilToken = selector<string>({
  key: 'token',
  get: ({get}) => {
    return get(recoilRememberMe) ? get(recoilTokenLocal) : get(recoilTokenSession)
  },
  set: ({set, get}, newValue) => {
    if (!newValue) {
      set(recoilTokenLocal, null)
      set(recoilTokenSession, null)
    } else if (get(recoilRememberMe)) {
      set(recoilTokenLocal, newValue)
    } else {
      set(recoilTokenSession, newValue)
    }
  }
})