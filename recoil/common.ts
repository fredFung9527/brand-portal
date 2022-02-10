import { atom, selector } from 'recoil'
import { BeforeRouteData } from '../@types/recoil'
import { sessionStorageEffect } from './storage'

export const recoilTitle = atom<string>({
  key: 'title',
  default: '',
})

export const recoilDescription = atom<string>({
  key: 'description',
  default: '',
})

export const recoilAlert = atom<string>({
  key: 'alert',
  default: null,
})

const recoilLoadingCount = atom<number>({
  key: 'loadingCount',
  default: 0
})

export const recoilLoading = selector<boolean>({
  key: 'loading',
  get: ({get}) => {
    return get(recoilLoadingCount) > 0
  },
  set: ({set, get}, newValue) => {
    const currentCount = get(recoilLoadingCount)
    const newCount = currentCount + (newValue ? 1 : -1)
    set(recoilLoadingCount, newCount < 0 ? 0 : newCount)
  }
})

export const recoilBeforeRouteData = atom<BeforeRouteData>({
  key: 'beforeRouteData',
  default: null,
  effects_UNSTABLE: [
    sessionStorageEffect('beforeRouteData')
  ]
})

export const recoilMenu = atom<boolean>({
  key: 'menu',
  default: false,
})