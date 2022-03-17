import { Tooltip } from '@mui/material'
import SensorsIcon from '@mui/icons-material/Sensors'
import { find } from 'lodash'

export default function NeedleDetectionIcon({item}) {
  const result = find(item?.testings, it => it.type === 'Needle Detection' && it.result === 'Yes')
  if (!result) {
    return null
  }

  return (
    <Tooltip title='Needle Detection'>
      <SensorsIcon color='info'/>
    </Tooltip>
  )
}