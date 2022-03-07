import { Grid, Paper } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import PCCPicker from '../../components/sales/PCCPicker'
import ProductBasicPicker from '../../components/sales/ProductBasicPicker'
import ProductSizePicker from '../../components/sales/ProductSizePicker'
import SubTitle from '../../components/SubTitle'
import { recoilTargetPCC } from '../../recoil/sales'

export default function SalesTargetPicker({showError}) {
  const { t } = useTranslation('products')
  const [targetPCC, setTargetPCC] = useRecoilState(recoilTargetPCC)

  useEffect(() => {
    setTargetPCC(null)
  }, [])

  const [productBasic, setProductBasic] = useState(null)
  const handleProductBasicInput = useCallback((v) => {
    setProductSize(null)
    setTargetPCC(null)
    setProductBasic(v)
  }, [])
  const [productSize, setProductSize] = useState(null)
  const handleProductSizeInput = useCallback((v) => {
    setTargetPCC(null)
    setProductSize(v)
  }, [])

  return (
    <>
      <SubTitle noMT>{t('target')}</SubTitle>
      <Paper sx={{p: 2}}>
        <Grid container columnSpacing={2} alignItems='flex-end'>
          <Grid item xs={12} sm={6} md={4}>
            <ProductBasicPicker 
              label={t('product')} 
              value={productBasic} 
              onChange={handleProductBasicInput}
              required
              error={showError && !productBasic}
              helperText={showError && !productBasic && t('error:required')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ProductSizePicker 
              label={t('size')} 
              value={productSize} 
              onChange={handleProductSizeInput} 
              productBasicId={productBasic?.id}
              error={showError && !productSize}
              helperText={showError && !productSize && t('error:required')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PCCPicker 
              label={t('pccName')} 
              value={targetPCC} 
              onChange={setTargetPCC} 
              productSizeId={productSize?.id}
              error={showError && !targetPCC}
              helperText={showError && !targetPCC && t('error:required')}
              required
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}