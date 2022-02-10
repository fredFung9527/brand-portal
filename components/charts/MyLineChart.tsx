import { Paper, useTheme } from '@mui/material'
import { cloneElement } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { MyChartProps } from '../../@types/chart'

export function getMyToolTip(content) {
  return function MyToolTip(props: TooltipProps<any, any>) {
    if (props?.active && props?.payload?.length) {
      const data = props.payload[0]
      return (
        <Paper sx={{p: 1}}>
          {Boolean(content) ? 
            cloneElement(content, props) :
            <>
              {props?.label}:<br/>
              <span style={{color: data?.color}}>{data?.value}</span>
            </>
          }
        </Paper>
      )
    }
  
    return null
  }
}

export default function MyLineChart({data, xKey, yKey, width, height, aspect, tooltipContent}: MyChartProps) {
  const theme = useTheme()

  return (
    <ResponsiveContainer width={width || '100%'} height={height || 300} aspect={height ? null : (aspect || 1.618)}>
      <LineChart data={data}>
        <Line type='monotone' dataKey={yKey || 'y'} stroke={theme.palette.primary.main}/>
        <CartesianGrid strokeDasharray='5 5'/>
        <XAxis dataKey={xKey || 'x'}/>
        <YAxis/>
        <Tooltip content={getMyToolTip(tooltipContent)}/>
      </LineChart>
    </ResponsiveContainer>
  )
}