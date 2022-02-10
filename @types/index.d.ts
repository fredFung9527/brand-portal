import { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import { FunctionComponent } from 'react'

export interface MyAppProps extends AppProps {
  Component: NextComponentType & {
    Layout?: FunctionComponent,
    needLogin?: boolean
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    grayBg?: Palette['primary'],
    grayText?: Palette['primary'],
    grayLabelText?: Palette['primary']
  }

  interface PaletteOptions {
    grayBg?: Palette['primary'],
    grayText?: Palette['primary'],
    grayLabelText?: Palette['primary']
  }
}