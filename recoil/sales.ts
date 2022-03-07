import { atom } from 'recoil'

export const recoilSalesKeyword = atom<string>({
  key: 'salesKeyword',
  default: '',
})

export const recoilSalesFilterSettings = atom<any>({
  key: 'salesFilterSettings',
  default: null,
})

export const recoilTargetPCC = atom<any>({
  key: 'targetPCC',
  default: null,
})