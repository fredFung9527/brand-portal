import { atom } from 'recoil'
import { localStorageEffect } from './storage'

export const recoilDarkMode = atom<boolean>({
  key: 'darkMode',
  default: false,
  effects_UNSTABLE: [
    localStorageEffect('darkMode')
  ]
})

export const recoilTestMode = atom<boolean>({
  key: 'testMode',
  default: false,
  effects_UNSTABLE: [
    localStorageEffect('testMode')
  ]
})