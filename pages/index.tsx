import { Container, Grid } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import ProductQuickSearch from '../components/home/ProductQuickSearch'
import SalesQuickSearch from '../components/home/SalesQuickSearch'
import SubTitle from '../components/SubTitle'

export default function Index() {
  const { t } = useTranslation('common')

  return (
    <Container maxWidth='sm'>
      <Grid container>
        <Grid item xs={12}>
          <SubTitle noMT>{t('pages./products')}</SubTitle>
        </Grid>
        <Grid item xs={12}>
          <ProductQuickSearch/>
        </Grid>

        <Grid item xs={12}>
          <SubTitle>{t('pages./sales')}</SubTitle>
        </Grid>
        <Grid item xs={12}>
          <SalesQuickSearch/>
        </Grid>
      </Grid>
    </Container>
  )
}

Index.needLogin = true