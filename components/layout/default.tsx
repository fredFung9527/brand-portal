import { AppBar, Container, Grid, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material'
import { useRecoilValue } from 'recoil'
import { recoilTitle } from '../../recoil/common'
import MyAccountButton from '../MyAccountButton'
import HomeIcon from '@mui/icons-material/Home'
import MyIconLink from '../MyIconLink'
import useTranslation from 'next-translate/useTranslation'
import MyDrawerMenu from '../MyDrawerMenu'
import SwitchLanguageButton from '../SwitchLanguageButton'

function HideOnScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  })

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

export default function DefaultLayout({children}) {
  const { t } = useTranslation('common')
  const title = useRecoilValue(recoilTitle)

  return (
    <>
      <HideOnScroll>
        <AppBar>
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
      </HideOnScroll>
      <AppBar position='relative'><Toolbar/></AppBar>

      <Container sx={{p: 2}}>
        {children}
      </Container>
    </>
  )
}