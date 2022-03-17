import { LoadingButtonTypeMap } from '@mui/lab'
import { ButtonProps } from '@mui/material'
import { ReactElement } from 'react'
import { MyMouseEvent } from './input'

export interface MyButtonProps extends ButtonProps {
  to?: string,
  loading?: boolean
}

export interface MyMenuButtonItem {
  text?: string,
  to?: string,
  onClick?: (event: MyMouseEvent) => void
  component?: ReactElement
}

export interface MyMenuButtonProps {
  title?: string,
  button: ReactElement,
  items: MyMenuButtonItem[],
  right?: number
}

export interface DeleteButtonProps {
  title?: ReactElement,
  content?: ReactElement,
  onRemove: () => void,
  disabled?: boolean
}

export interface MyIconLinkProps {
  title?: string,
  color?: 'primary' | 'secondary',
  to: string,
  innerRef?: any,
  children?: ReactElement
}