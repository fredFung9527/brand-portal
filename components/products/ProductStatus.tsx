import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import { Grid } from '@mui/material'
import BugReportIcon from '@mui/icons-material/BugReport'

export default function ProductStatus({status, noText=false}) {
  if (status === 'Completed') {
    return (
      <Grid container alignItems='center'>
        <CheckCircleOutlineIcon color='success' sx={{mr: 1}}/>{noText ? null : status}
      </Grid>
    )
  }
  if (status === 'Processing') {
    return (
      <Grid container alignItems='center'>
        <HourglassBottomIcon color='primary' sx={{mr: 1}}/>{noText ? null : status}
      </Grid>
    )
  }
  if (status === 'Testing') {
    return (
      <Grid container alignItems='center'>
        <BugReportIcon color='secondary' sx={{mr: 1}}/>{noText ? null : status}
      </Grid>
    )
  }
  return status
}