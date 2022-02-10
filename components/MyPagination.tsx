import { Grid, Pagination, useMediaQuery, useTheme } from '@mui/material'

export default function MyPagination({value, total, onChange}) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Grid container justifyContent='center'>
      <Pagination
        variant='outlined'
        color='primary'
        page={value}
        count={total}
        onChange={(_, value) => onChange && onChange(value)}
        boundaryCount={isXs ? 0 : 1}
      />
    </Grid>
    
  )
}