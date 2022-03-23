import { Grid, Paper } from '@mui/material'
import { debounce } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useRef, useState } from 'react'
import { MyInputProps } from '../../@types/input'
import MyTextField from '../form/MyTextField'
import MarketCodeInput from '../product-input/MarketCodeInput'
import SeasonInput from '../product-input/SeasonInput'
import MyAutocomplete from '../select/MyAutocomplete'
import SubTitle from '../SubTitle'
import { demoIndustries } from '../../demo/product'
import { checkSeasonOrYear } from '../../utils/rules'
import MyDropzone from '../MyDropzone'

export default function SalesPartInput({
  value, onChange, showError, onValid, disableEditProduct, disableEditSize
}: MyInputProps & {showError: boolean, onValid: any, disableEditProduct?: boolean, disableEditSize?: boolean}) {
  const { t } = useTranslation('products')

  const [marketCode, setMarketCode] = useState(value?.marketCode || null)
  const [brandRefCode, setBrandRefCode] = useState(value?.brandRefCode || '')
  const [devSeason, setDevSeason] = useState(value?.devSeason || '')
  const [industries, setIndustries] = useState(value?.industries || [])
  const [remarks, setRemarks] = useState(value?.remarks || '')
  const [documents, setDocuments] = useState(value?.documents || [])

  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current
  const onValidDebounce = useRef(
    debounce((v) => {
      onValid && onValid(Boolean(v))
    }, 500)
  ).current
  useEffect(() => {
    onChangeDebounce({
      marketCode, brandRefCode, devSeason, industries, remarks, documents
    })
    onValidDebounce(marketCode && brandRefCode && industries.length && (!devSeason || checkSeasonOrYear(devSeason)))
  }, [marketCode, brandRefCode, devSeason, industries, remarks, documents])

  return (
    <>
      <SubTitle noMT>{t('sales')}</SubTitle>
      <Paper sx={{p:2}}>
        <Grid container columnSpacing={2} alignItems='flex-end'>
          <Grid item xs={12} sm={6}>
            <MarketCodeInput
              label={t('marketCode')}
              value={marketCode}
              onChange={setMarketCode}
              error={showError && !Boolean(marketCode)}
              helperText={showError && !Boolean(marketCode) && t('error:required')}
              required
              single
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextField
              label={t('brandRefCode')}
              value={brandRefCode}
              onChange={setBrandRefCode}
              error={showError && !Boolean(brandRefCode)}
              helperText={showError && !Boolean(brandRefCode) && t('error:required')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SeasonInput
              label={t('devSeason')}
              value={devSeason}
              onChange={setDevSeason}
              error={showError && Boolean(devSeason) && !checkSeasonOrYear(devSeason)}
              helperText={showError && Boolean(devSeason) && !checkSeasonOrYear(devSeason) && t('error:invalidSeason')}
              disabled={disableEditSize}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyAutocomplete
              label={t('industries')}
              value={industries}
              onChange={setIndustries}
              error={showError && !Boolean(industries.length)}
              helperText={showError && !Boolean(industries.length) && t('error:required')}
              required
              multiple
              items={demoIndustries}
              disabled={disableEditProduct}
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextField
              label={t('remarks')}
              value={remarks}
              onChange={setRemarks}
              multiline
            />
          </Grid>
        </Grid>

        <MyDropzone 
          label={t('attachments')} 
          value={documents} 
          onChange={setDocuments}
          listView
        />
      </Paper>
    </>
  )
}