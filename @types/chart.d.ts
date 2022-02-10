import { ReactElement } from 'react'

export interface MyChartProps {
  data: any[], 
  xKey?: string, 
  yKey?: string,
  width?: string | number,
  height?: string | number,
  aspect?: number,
  tooltipContent?: ReactElement
}

export interface MyRadarChartProps extends MyChartProps {
  min?: number,
  max?: number
}