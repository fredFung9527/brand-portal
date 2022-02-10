import { DialogProps } from '@mui/material'
import { ReactElement } from 'react'
import { RecoilValue, RecoilState } from 'recoil'

export interface MyRecoilNexus {
  get?: <T>(atom: RecoilValue<T>) => T,
  getPromise?: <T>(atom: RecoilValue<T>) => Promise<T>,
  set?: <T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) => void,
  reset?: (atom: RecoilState<any>) => void
}

export interface MyDialog extends DialogProps {
  type?: 'confirm',
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  reslove?: any, 
  title?: string, 
  content: ReactElement, 
  actions: ReactElement, 
  persistent?: boolean,
  onClose: () => void
}