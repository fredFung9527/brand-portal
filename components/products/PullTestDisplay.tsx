import { Typography } from '@mui/material'
import { numberWithCommas } from '../../utils/common'

export default function PullTestDisplay({value}) {
  if (!value) {
    return null
  }
  return (
    <div>
      <Typography fontWeight='bold' component='span'>
        { numberWithCommas(value) }
      </Typography>
      &nbsp;kg&nbsp;/&nbsp;
      <Typography fontWeight='bold' component='span'>
        {numberWithCommas(Math.round(value * 2.20462262))}
      </Typography>
      &nbsp;lbs
    </div>
  )
}