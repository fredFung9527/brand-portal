import { Tooltip } from '@mui/material'
import SensorsIcon from '@mui/icons-material/Sensors'
import { find } from 'lodash'

export default function NeedleDetectionIcon({pcc}) {
  if (pcc) {
    const item = find(pcc.testings, it => it.type === 'Needle Detection' && it.result === 'Yes')
    if (!item) {
      return null
    }
  }

  return (
    <Tooltip title='Needle Detection'>
      <SensorsIcon color='info'/>
    </Tooltip>
  )
}