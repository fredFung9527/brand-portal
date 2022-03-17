import { Button, Grid, Paper, Typography } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import MyAutocomplete from '../select/MyAutocomplete'
import SubTitle from '../SubTitle'
import { demoIndustries } from '../../demo/product'
import MyFilePicker from '../MyFilePicker'
import MyImage from '../MyImage'
import My3DViewer from '../My3DViewer'
import MarketCodeInput from './MarketCodeInput'
import { MyInputProps } from '../../@types/input'
import { useEffect, useRef, useState } from 'react'
import MyTextField from '../form/MyTextField'
import MySelect from '../select/MySelect'
import { debounce } from 'lodash'

export default function ProductInput({
  value, onChange, showError, onValid, salesMode, disableEditProduct, disableEditSize
}: MyInputProps & {showError: boolean, onValid: any, salesMode?: boolean, disableEditProduct?: boolean, disableEditSize?: boolean}) {
  const { t } = useTranslation('products')

  const [name, setName] = useState(value?.name || '')
  const [status, setStatus] = useState(value?.status || 'Completed')
  const [description, setDescription] = useState(value?.description || '')
  const [remarks, setRemarks] = useState(value?.remarks || '')
  const [target, setTarget] = useState(value?.target || 'Custom')
  const [limitedMarketCodes, setLimitedMarketCodes] = useState(value?.limitedMarketCodes || [])
  const [photo, setPhoto] = useState(value?.photo || null)
  const [threeDPhoto, setThreeDPhoto] = useState(value?.threeDPhoto || null)
  const [industries, setIndustries] = useState(value?.industries || [])
  const [newProductName, setNewProductName] = useState(value?.newProductName || '')
  const [designer, setDesigner] = useState(value?.designer || '')

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
      name, status, description, remarks, limitedMarketCodes, 
      photo, threeDPhoto, industries, newProductName, designer
    })
    onValidDebounce(name && status && (salesMode || industries.length) &&
      (target !== 'Custom' || limitedMarketCodes.length)
    )
  }, [name, status, description, remarks, limitedMarketCodes, photo, threeDPhoto, industries, newProductName, designer])

  return (
    <>
      {!salesMode && <SubTitle>{t('product')}</SubTitle>}
      <Paper sx={{p: 2}}>
        <Grid container columnSpacing={2} alignItems='flex-end'>
          <Grid item xs={12} sm={6}>
            <MyTextField
              label={t('name')}
              value={name}
              onChange={setName}
              error={showError && !Boolean(name)}
              helperText={showError && !Boolean(name) && t('error:required')}
              required
              disabled={disableEditProduct}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MySelect
              label={t('status')}
              value={status}
              onChange={setStatus}
              required
              items={['Completed', 'Processing', 'Testing']}
              disabled={disableEditProduct}
            />
          </Grid>
          {salesMode &&
            <Grid item xs={12} sm={6}>
              <MyTextField
                label={t('newProductName')}
                value={newProductName}
                onChange={setNewProductName}
              />
            </Grid>
          }
          {target === 'Custom' && 
            <Grid item xs={12} sm={6}>
              <MarketCodeInput
                label={t('limitedMarketCodes')}
                value={limitedMarketCodes}
                onChange={setLimitedMarketCodes}
                error={showError && !Boolean(limitedMarketCodes.length)}
                helperText={showError && !Boolean(limitedMarketCodes.length) && t('error:required')}
                required
                disabled={disableEditProduct}
              />
            </Grid>
          }
          {salesMode ?
            <Grid item xs={12} sm={6}>
              <MyTextField
                label={t('designer')}
                value={designer}
                onChange={setDesigner}
                disabled={disableEditSize}
              />
            </Grid> :
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
              />
            </Grid>
          }
          <Grid item xs={12}>
            <MyTextField
              label={t('description')}
              value={description}
              onChange={setDescription}
              multiline
              disabled={disableEditProduct}
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextField
              label={t('remarks')}
              value={remarks}
              onChange={setRemarks}
              multiline
              disabled={disableEditProduct}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography sx={(theme) => ({color: theme.palette.grayLabelText.main})}>
              {t('photo')}
            </Typography>
            <Button fullWidth disabled={disableEditProduct}>
              <MyFilePicker onChange={setPhoto}>
                <MyImage src={photo || '/images/photo.png'} width={150} height={150}/>
              </MyFilePicker>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={(theme) => ({color: theme.palette.grayLabelText.main})}>
              {t('threeDPhoto')}
            </Typography>
            <Button fullWidth disabled={disableEditProduct}>
              <MyFilePicker onChange={setThreeDPhoto} accept='.gltf'>
                {Boolean(threeDPhoto) ?
                  <My3DViewer src={threeDPhoto} height={150}/> : 
                  <MyImage src='/images/3d.png' width={150} height={150}/>
                }
              </MyFilePicker>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}