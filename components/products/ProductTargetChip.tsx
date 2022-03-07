import { Grid } from '@mui/material'
import PublicIcon from '@mui/icons-material/Public'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

export default function ProductTargetChip({target, noText=false}) {
  if (target === 'Custom') {
    return (
      <Grid container alignItems='center'>
        <SupportAgentIcon color='primary' sx={{mr: 1}}/>{noText ? '' : target}
      </Grid>
    )
  }
  if (target === 'General') {
    return (
      <Grid container alignItems='center'>
        <PublicIcon color='success' sx={{mr: 1}}/>{noText ? '' : target}
      </Grid>
    )
  }
  return target
}