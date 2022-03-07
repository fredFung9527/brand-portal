import { Typography } from '@mui/material'

export default function SubTitle({children, noMT=false}) {
  return (
    <Typography variant='h6' sx={{mt: noMT ? 0 : 2, mb: 1}}>{children}</Typography>
  )
}