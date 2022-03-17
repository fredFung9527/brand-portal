import { AppBar, Box, Grid, Toolbar, useMediaQuery, useTheme, Zoom } from '@mui/material'
import { isEmpty } from 'lodash'
import NoResultHint from '../../components/NoResultHint'
import ProductDisplay from '../../components/products/ProductDisplay'
import MyTabs from '../../components/MyTabs'
import { useEffect, useRef, useState } from 'react'
import SizeCard from '../../components/products/SizeCard'
import { getProductDetails } from '../../utils/products'
import AppBarText from '../../components/products/AppBarText'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import MyButton from '../../components/MyButton'
import useTranslation from 'next-translate/useTranslation'
import PageActions from '../../components/products/PageActions'

export default function ProductDetail({product}) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const { t } = useTranslation('products')

  const [selectedSize, setSeletcedSize] = useState(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(false)
    setTimeout(() => {
      setOpen(true)
    }, 200)
  }, [selectedSize])

  const productRef = useRef(null)
  const sizeRef = useRef(null)

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
            <AppBarText text={product.name} innerRef={productRef}/>&nbsp;/&nbsp;
            <AppBarText text={selectedSize?.name || '-'} innerRef={sizeRef}/>&nbsp;&nbsp;
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

      <div ref={productRef}>
        <ProductDisplay product={product}/>
      </div>

      <MyTabs 
        onChange={setSeletcedSize} 
        items={product?.sizes}
        textKey='name'
        sx={{mt: 1, mb: -1}}
      />
      <Zoom in={open}>
        <div>
          <SizeCard 
            size={selectedSize} 
            sizeRef={sizeRef}
          />
        </div>
      </Zoom>

      <PageActions 
        editPath='/products/new'
        clonePath='/products/new'
        onRemove={null}
      />
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