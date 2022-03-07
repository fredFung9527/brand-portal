import { MyInputProps } from '../../@types/input'
import useTranslation from 'next-translate/useTranslation'
import { checkRequired } from '../../utils/rules'
import MyListInput from '../MyListInput'
import MyAutocomplete from '../select/MyAutocomplete'
import { demoDimensionTypes } from '../../demo/product'
import SubTitle from '../SubTitle'
import { Box, Grid } from '@mui/material'
import MyTextField from '../form/MyTextField'
import { debounce, filter, find, forEach, includes, map } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'

const emptyItem = {
  type: null,
  value: '',
}

export default function ProductSizeDetailsInput({value, onChange, ...otherProps}: MyInputProps & {showError: boolean, onValid: any}) {
  const { t } = useTranslation('products')
  const basicSizeKeys = ['ID Φ', 'OD Φ', 'Webbing']
  const [basicSizes, setBasicSizes] = useState(filter(value, it => includes(basicSizeKeys, it.type)))
  const [dimensions, setDimensions] = useState(filter(value, it => !includes(basicSizeKeys, it.type)))

  const getBasicSizeValue = useCallback((type) => {
    return find(basicSizes, it => it.type === type)?.value || ''
  }, [basicSizes])
  const setBasicSizeValue = useCallback((v, type) => {
    if (v) {
      let newList = []
      let exist = false
      forEach(basicSizes, it => {
        if (it.type === type) {
          exist = true
          newList.push({...it, value: v})
        } else {
          newList.push(it)
        }
      })
      if (!exist) {
        newList.push({type, value: v})
      }
      setBasicSizes(newList)
    } else {
      setBasicSizes(filter(basicSizes, it => it.type !== type))
    }
  }, [basicSizes])
 
  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current
  useEffect(() => {
    onChangeDebounce([...basicSizes, ...dimensions])
  }, [basicSizes, dimensions])

  return (
    <>
      <SubTitle noMT>{t('productSizeDetails')}</SubTitle>

      <Box
        sx={(theme) => 
          ({
            backgroundColor: theme.palette.grayBg.main,
            borderRadius: theme.spacing(2),
            p: 2,
            mb: 2
          })
        }
      >
        <Grid container columnSpacing={2} alignItems='flex-end'>
          {map(basicSizeKeys, key =>
            <Grid item xs={12} sm={6} key={key}>
              <MyTextField type='number' label={key} value={getBasicSizeValue(key)} onChange={(v) => setBasicSizeValue(v, key)}/>
            </Grid>
          )}
        </Grid>

        <MyListInput
          {...otherProps}
          value={dimensions}
          onChange={setDimensions}
          label={t('dimensions')}
          defaultValue={emptyItem}
          items={[
            {
              key: 'type',
              label: t('type'),
              rules: [checkRequired(t('error:required'))],
              type: 'custom',
              component: <MyAutocomplete items={demoDimensionTypes}/>,
              grid: { xs: 12, sm: 6 }
            },
            {
              key: 'value',
              label: t('value'),
              rules: [checkRequired(t('error:required'))],
              type: 'text',
              grid: { xs: 12, sm: 6 }
            },
          ]}
        />
      </Box>
    </>
  )
}