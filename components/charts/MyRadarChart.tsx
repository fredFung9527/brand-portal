import { useTheme } from '@mui/material'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { MyRadarChartProps } from '../../@types/chart'
import { getMyToolTip } from './MyLineChart'

export default function MyRadarChart({data, xKey, yKey, width, height, aspect, min, max, tooltipContent}: MyRadarChartProps) {
  const theme = useTheme()

  return (
    <ResponsiveContainer width={width || '100%'} height={height || 300} aspect={height ? null : (aspect || 1.618)}>
      <RadarChart data={data}>
        <PolarGrid strokeDasharray='5 5'/>
        <PolarAngleAxis dataKey={xKey || 'x'}/>
        <PolarRadiusAxis domain={[min || 0, max || undefined]}/>
        <Radar dataKey={yKey || 'y'} stroke={theme.palette.primary.main} fill={theme.palette.primary.main} fillOpacity={0.6}/>
        <Tooltip content={getMyToolTip(tooltipContent)}/>
      </RadarChart>
    </ResponsiveContainer>
  )
}