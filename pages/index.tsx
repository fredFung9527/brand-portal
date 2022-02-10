import { Grid } from '@mui/material'
import Search from '../components/home/Search'

export default function Index() {
  return (
    <Grid container alignItems='center' justifyContent='center' sx={{my: 2}}>
      <Search/>
    </Grid>
  )
}

Index.needLogin = true