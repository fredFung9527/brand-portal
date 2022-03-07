import { Box, Divider, Paper } from '@mui/material'
import { cloneDeep, debounce, every, isEmpty, map, omit, slice } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MyInputProps } from '../../@types/input'
import { demoIncoTerms } from '../../demo/sales'
import { addTempId } from '../../utils/common'
import { checkRequired } from '../../utils/rules'
import MyForm from '../form/MyForm'
import CardActions from '../products/CardActions'
import ProductMarketCodeInput from '../products/ProductMarketCodeInput'
import MyAutocomplete from '../select/MyAutocomplete'
import SubTitle from '../SubTitle'
import SalesPriceInput from './SalesPriceInput'

const emptySales = {
  'marketCode': null,
  'brandRefCode': '',
  'newProductName': '',
  'newSizeName': '',
  'remarks': '',
  extraInfomations: {}, 
  'prices': []
}

const emptyExtraInformation = {
  'moldCharge': '',
  'bulkLeadtime': '',
  'bulkOrderMOQ': '',
  'bulkColorMOQ': '',
  'incoTerm': null
}

function SingleItem({
  value, onChange, showError, onValid, onAdd, onClone, onRemove
}: MyInputProps & {
  showError: boolean, onValid: any,
  onAdd: any, onClone: any, onRemove: any
}) {
  const { t } = useTranslation('products')

  const [pccForSales, setPccForSales] = useState(omit(value, 'extraInfomations', 'prices'))
  const [pccForSalesIsValid, setPccForSalesIsValid] = useState(false)
  const [extraInfomations, setExtraInfomations] = useState(cloneDeep(isEmpty(value.extraInfomations) ? emptyExtraInformation : value.extraInfomations))
  const [extraInfomationsIsValid, setExtraInfomationsIsValid] = useState(false)
  const [prices, setPrices] = useState(cloneDeep(value.prices))
  const [pricesIsValid, setPricesIsValid] = useState(false)

  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current
  useEffect(() => {
    onChangeDebounce({...pccForSales, extraInfomations, prices})
  }, [pccForSales, extraInfomations, prices])

  const onValidDebounce = useRef(
    debounce((v) => {
      onValid && onValid(v)
    }, 500)
  ).current
  useEffect(() => {
    onValidDebounce(pccForSalesIsValid && extraInfomationsIsValid && pricesIsValid)
  }, [pccForSalesIsValid, extraInfomationsIsValid, pricesIsValid])

  return (
    <Paper sx={{px: 2, pt:2, pb: 1}}>
      <MyForm
        onChange={setPccForSales}
        onValid={setPccForSalesIsValid}
        items={[
          {
            key: 'marketCode',
            default: pccForSales.marketCode,
            label: t('marketCode'),
            rules: [checkRequired(t('error:required'))],
            type: 'custom',
            component: <ProductMarketCodeInput single/>,
            grid: { xs: 12, sm: 6 }
          },
          {
            key: 'brandRefCode',
            default: pccForSales.brandRefCode,
            label: t('brandRefCode'),
            rules: [checkRequired(t('error:required'))],
            type: 'text',
            grid: { xs: 12, sm: 6 }
          },
          {
            key: 'newProductName',
            default: pccForSales.newProductName,
            label: t('newProductName'),
            rules: null,
            type: 'text',
            grid: { xs: 12, sm: 6 }
          },
          {
            key: 'newSizeName',
            default: pccForSales.newSizeName,
            label: t('newSizeName'),
            rules: null,
            type: 'text',
            grid: { xs: 12, sm: 6 }
          },
          {
            key: 'remarks',
            default: pccForSales.remarks,
            label: t('remarks'),
            rules: null,
            type: 'textArea',
            grid: { xs: 12 },
          },
        ]}
        showError={showError}
      />

      <Divider variant='middle' sx={{mb: 2}}/>
      <SalesPriceInput value={prices} onChange={setPrices} showError={showError} onValid={setPricesIsValid}/>
      
      <Divider variant='middle' sx={{my: 2}}/>
      <MyForm
        onChange={setExtraInfomations}
        onValid={setExtraInfomationsIsValid}
        items={[
          {
            key: 'moldCharge',
            default: extraInfomations.moldCharge,
            label: t('moldCharge'),
            rules: null,
            type: 'text',
            grid: { xs: 12, sm: 6 }
          },
          {
            key: 'bulkLeadtime',
            default: extraInfomations.bulkLeadtime,
            label: t('bulkLeadtimeInput'),
            rules: null,
            type: 'number',
            grid: { xs: 12, sm: 6 }
          },
          {
            key: 'bulkOrderMOQ',
            default: extraInfomations.bulkOrderMOQ,
            label: t('bulkOrderMoq'),
            rules: null,
            type: 'text',
            grid: { xs: 12, sm: 6 }
          },
          {
            key: 'bulkColorMOQ',
            default: extraInfomations.bulkColorMOQ,
            label: t('bulkColorMoq'),
            rules: null,
            type: 'text',
            grid: { xs: 12, sm: 6 }
          },
          {
            key: 'incoTerm',
            default: extraInfomations.incoTerm,
            label: t('incoTerm'),
            rules: null,
            type: 'custom',
            component: <MyAutocomplete items={demoIncoTerms}/>,
            grid: { xs: 12, sm: 6 }
          },
        ]}
        showError={showError}
      />

      <CardActions onAdd={onAdd} onClone={onClone} onRemove={onRemove} sx={{my: 1}}/>
    </Paper>
  )
}

export default function SalesInput({value, onChange, showError, onValid}: MyInputProps & {showError: boolean, onValid: Function}) {
  const { t } = useTranslation('products')

  const [validMapping, setValidMapping] = useState({})
  const handleValidUpdate = useCallback((v, key) => {
    setValidMapping({...validMapping, [key]: v})
  }, [validMapping])
  useEffect(() => {
    onValid && onValid(every(validMapping, (value, key) => value))
  }, [validMapping])
  
  const handleInput = useCallback((v, idx) => {
    const newList = map(value, (it, jdx) => {
      if (jdx === idx) {
        return {...it, ...v}
      } else {
        return it
      }
    })
    onChange && onChange(newList)
  }, [value])
  useEffect(() => {
    if (!value?.length) {
      onChange && onChange([...(value || []), addTempId(emptySales)])
    }
  }, [value])

  const handleAction = useCallback((idx, action) => {
    if (action === 'add') {
      onChange && onChange([...slice(value, 0, idx + 1), addTempId(emptySales), ...slice(value, idx + 1)])
    } else if (action === 'clone') {
      onChange && onChange([...slice(value, 0, idx + 1), addTempId(value[idx]), ...slice(value, idx + 1)])
    } else {
      onChange && onChange([...slice(value, 0, idx), ...slice(value, idx + 1)])
      setValidMapping(omit(validMapping, value[idx]?.id || value[idx]?.tempId))
    }
  }, [value, validMapping])

  return (
    <>
      <SubTitle>{t('common:pages./sales')}</SubTitle>
      {map(value, (item, idx) =>
        <Box key={item.id || item.tempId} sx={{mt: idx ? 2 :  0}}>
          <SingleItem
            value={item}
            onChange={(v) => handleInput(v, idx)}
            showError={showError}
            onValid={(v) => handleValidUpdate(v, idx)}
            onAdd={() => handleAction(idx, 'add')}
            onClone={() => handleAction(idx, 'clone')}
            onRemove={() => handleAction(idx, 'remove')}
          />
        </Box>
      )}
    </>
  )
}