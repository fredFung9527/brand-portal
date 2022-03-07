import { Button, Grid, Paper, Typography } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import MyForm from '../../components/form/MyForm'
import ProductStatusPicker from '../../components/products/ProductStatusPicker'
import MyAutocomplete from '../../components/select/MyAutocomplete'
import SubTitle from '../../components/SubTitle'
import { demoIndustries } from '../../demo/product'
import { checkRequired } from '../../utils/rules'
import MyFilePicker from '../../components/MyFilePicker'
import MyImage from '../../components/MyImage'
import My3DViewer from '../../components/My3DViewer'
import ProductMarketCodeInput from '../../components/products/ProductMarketCodeInput'
import { MyInputProps } from '../../@types/input'
import { useRef } from 'react'
import { debounce } from 'lodash'

export default function ProductBasicInput({
  value, onChange, showError, onValid
}: MyInputProps & {showError: boolean, onValid: any}) {
  const { t } = useTranslation('products')

  function setStaus(v) {
    onChange && onChange({ ...value, status: v })
  }
  function handleInput(v) {
    onChangeDebounce({...value, ...v})
  }
  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current

  if (!value) {
    return null
  }
  return (
    <>
      <ProductStatusPicker 
        label={<Typography variant='h6'>{t('status')}</Typography>} 
        value={value.status} 
        onChange={setStaus}
      />

      <SubTitle>{t('basic')}</SubTitle>
      <Paper sx={{p: 2}}>
        <MyForm
          onChange={handleInput}
          onValid={onValid}
          items={[
            {
              key: 'name',
              default: value.name,
              label: t('name'),
              rules: [checkRequired(t('error:required'))],
              type: 'text',
              grid: { xs: 12, sm: 6 }
            },
            ...value.target === 'Custom' ? 
              [{
                  key: 'limitedMarketCodes',
                  default: value.limitedMarketCodes,
                  label: t('marketCodes'),
                  rules: [checkRequired(t('error:required'))],
                  type: 'custom',
                  grid: { xs: 12, sm: 6 },
                  component: <ProductMarketCodeInput/>
              }] as any : 
              [],
            {
              key: 'industries',
              default: value.industries,
              label: t('industries'),
              type: 'custom',
              rules: [checkRequired(t('error:required'))],
              grid: { xs: 12, sm: 6 },
              component: <MyAutocomplete multiple items={demoIndustries}/>
            },
            {
              key: 'description',
              default: value.description,
              label: t('description'),
              rules: null,
              type: 'textArea',
              grid: { xs: 12 },
            },
            {
              key: 'remarks',
              default: value.remarks,
              label: t('remarks'),
              rules: null,
              type: 'textArea',
              grid: { xs: 12 },
            },
          ]}
          showError={showError}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography sx={(theme) => ({color: theme.palette.grayLabelText.main})}>
              {t('photo')}
            </Typography>
            <Button fullWidth>
              <MyFilePicker onChange={(v) => handleInput({photo: v})}>
                <MyImage src={value.photo || '/images/photo.png'} width={150} height={150}/>
              </MyFilePicker>
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography sx={(theme) => ({color: theme.palette.grayLabelText.main})}>
              {t('threeDPhoto')}
            </Typography>
            <Button fullWidth>
              <MyFilePicker onChange={(v) => handleInput({threeDPhoto: v})} accept='.gltf'>
                {Boolean(value.threeDPhoto) ?
                  <My3DViewer src={value.threeDPhoto} height={150}/> : 
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