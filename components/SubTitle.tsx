import { Typography } from '@mui/material'

export default function SubTitle({children}) {
  return (
    <Typography variant='h6' sx={{mt: 2, mb: 1}}>{children}</Typography>
  )
}