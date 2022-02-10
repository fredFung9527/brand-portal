import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { recoilTitle } from '../../recoil/common'
import MyAccountButton from '../MyAccountButton'
import HomeIcon from '@mui/icons-material/Home'
import MyIconLink from '../MyIconLink'
import useTranslation from 'next-translate/useTranslation'
import MyDrawerMenu from '../MyDrawerMenu'
import SwitchLanguageButton from '../SwitchLanguageButton'

export default function DefaultLayout({children}) {
  const { t } = useTranslation('common')
  const title = useRecoilValue(recoilTitle)

  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          <Grid container alignItems='center'>
            <Grid item sx={{mr: 2.5}}>
              <MyDrawerMenu/>
            </Grid>
            <Grid item>
              <Typography variant='h6'>
                {title}
              </Typography>
            </Grid>
            <Grid item xs/>
            <Grid item>
              <MyIconLink to='/' title={t('pages./')}>
                <HomeIcon/>
              </MyIconLink>
            </Grid>
            <Grid item>
              <SwitchLanguageButton/>
            </Grid>
            <Grid item>
              <MyAccountButton/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Container sx={{p: 2}}>
        {children}
      </Container>
    </>
  )
}