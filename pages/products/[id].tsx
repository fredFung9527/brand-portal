import { AppBar, Box, Container, Grid, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { isEmpty } from 'lodash'
import NoResultHint from '../../components/NoResultHint'
import ProductBasicPart from '../../components/products/ProductBasicPart'
import MyTabs from '../../components/MyTabs'
import { useRef, useState } from 'react'
import ProductSizeCard from '../../components/products/ProductSizeCard'
import { getProductDetails } from '../../utils/products'
import AppBarText from '../../components/products/AppBarText'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import MyButton from '../../components/MyButton'
import useTranslation from 'next-translate/useTranslation'

export default function ProductDetail({product}) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const { t } = useTranslation('products')

  const [selectedSize, setSeletcedSize] = useState(null)
  const [seletcedPCC, setSeletcedPCC] = useState(null)

  const productBasicRef = useRef(null)
  const productSizeRef = useRef(null)
  const pccRef = useRef(null)

  if (isEmpty(product)) {
    return (
      <NoResultHint/>
    )
  }
  return (
    <Box sx={{mb: isXs ? '56px' : '64px'}}>
      <AppBar color='default' sx={{top: 'auto', bottom: 0}}>
        <Toolbar>
          <Grid container alignItems='center'>
            <AppBarText text={product.name} innerRef={productBasicRef}/>&nbsp;/&nbsp;
            <AppBarText text={selectedSize?.sizeName || '-'} innerRef={productSizeRef}/>&nbsp;/&nbsp;
            <AppBarText text={seletcedPCC?.name || '-'} innerRef={pccRef}/>&nbsp;&nbsp;
            <MyButton
              to='/sales/new'
              size={isXs ? 'small' : 'medium'}
              sx={(theme) => ({
                borderRadius: theme.spacing(2),
              })}
              startIcon={<AttachMoneyIcon/>}
            >
              {t('editSales')}
            </MyButton>
          </Grid>
        </Toolbar>
      </AppBar>

      <div ref={productBasicRef}>
        <ProductBasicPart product={product}/>
      </div>

      <Container maxWidth='md' sx={{p: 0}}>
        <MyTabs 
          onChange={setSeletcedSize} 
          items={product?.sizes}
          textKey='sizeName'
          sx={{mt: 1, mb: -1}}
        />
        <ProductSizeCard 
          size={selectedSize} 
          productMode
          seletcedPCC={seletcedPCC}
          setSeletcedPCC={setSeletcedPCC}
          productSizeRef={productSizeRef}
          pccRef={pccRef}
        />
      </Container>
    </Box>
  )
}

ProductDetail.needLogin = true

export async function getServerSideProps({query}) {
  return {
    props: {
      product: getProductDetails(query?.id)
    }
  }
}