import { ReactElement } from 'react'

export interface GridViewItemsProps {
  items: any[],
  keyKey?: string,
  init?: () => void,
  renderItem: (item: any) => ReactElement,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number
}

export interface TableViewItemsProps {
  headers: string[],
  page: number,
  pageSize: number,
  total: number,
  items: any[],
  keyKey?: string,
  init?: () => void,
  renderItem: (item: any) => ReactElement,
  onPage: (v: number) => void,
  onPageSize: (v: number) => void,
}