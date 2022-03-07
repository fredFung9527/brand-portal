import { Box, Paper } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import { MyInputProps } from '../../@types/input'
import SubTitle from '../SubTitle'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cloneDeep, debounce, every, map, omit, slice } from 'lodash'
import MyForm from '../form/MyForm'
import { checkRequired } from '../../utils/rules'
import ProductSeasonInput from './ProductSeasonInput'
import MyAutocomplete from '../select/MyAutocomplete'
import { demoDesigners } from '../../demo/user'
import CardActions from './CardActions'
import { addTempId } from '../../utils/common'
import PCCsInput from './PCCsInput'
import ProductSizeDetailsInput from './ProductSizeDetailsInput'

const emptySize = {
  sizeName: '',
  remarks: '',
  devSeason: '',
  effectiveSeason: '',
  designer: null,
  pccs: [],
  productSizeDetails: []
}

function SingleItem({
  value, onChange, showError, onValid, onAdd, onClone, onRemove, isGeneral
}: MyInputProps & {
  showError: boolean, onValid: any,
  onAdd: any, onClone: any, onRemove: any,
  isGeneral?: boolean
}) {
  const { t } = useTranslation('products')
  const [basic, setBasic] = useState(omit(value, 'pccs', 'productSizeDetails'))
  const [basicIsValid, setBasicPccsIsValid] = useState(false)
  const [pccs, setPccs] = useState(cloneDeep(value.pccs))
  const [pccsIsValid, setPccsIsValid] = useState(false)
  const [productSizeDetails, setProductSizeDetails] = useState(cloneDeep(value.productSizeDetails))
  const [productSizeDetailsIsValid, setProductSizeDetailsIsValid] = useState(false)

  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current
  useEffect(() => {
    onChangeDebounce({...basic, pccs})
  }, [basic, pccs])

  const onValidDebounce = useRef(
    debounce((v) => {
      onValid && onValid(v)
    }, 500)
  ).current
  useEffect(() => {
    onValidDebounce(basicIsValid && pccsIsValid && (!isGeneral || productSizeDetailsIsValid))
  }, [basicIsValid, pccsIsValid, isGeneral, productSizeDetailsIsValid])

  return (
    <Paper sx={{px: 2, pt:2, pb: 1}}>
      <MyForm
        onChange={setBasic}
        onValid={setBasicPccsIsValid}
        items={[
          {
            key: 'sizeName',
            default: basic.sizeName,
            label: t('sizeName'),
            rules: [checkRequired(t('error:required'))],
            type: 'text',
            grid: { xs: 12, sm: 6 }
          },
          {
            key: 'devSeason',
            default: basic.devSeason,
            label: t('devSeason'),
            rules: [checkRequired(t('error:required'))],
            type: 'custom',
            grid: { xs: 12, sm: 6 },
            component: <ProductSeasonInput single/>
          },
          {
            key: 'effectiveSeason',
            default: basic.effectiveSeason,
            label: t('effectiveSeason'),
            rules: [checkRequired(t('error:required'))],
            type: 'custom',
            grid: { xs: 12, sm: 6 },
            component: <ProductSeasonInput single/>
          },
          {
            key: 'designer',
            default: basic.designer,
            label: t('designer'),
            rules: [checkRequired(t('error:required'))],
            type: 'custom',
            grid: { xs: 12, sm: 6 },
            component: <MyAutocomplete items={demoDesigners}/>
          },
          {
            key: 'remarks',
            default: basic.remarks,
            label: t('remarks'),
            rules: null,
            type: 'textArea',
            grid: { xs: 12 },
          },
        ]}
        showError={showError}
      />

      {isGeneral && <ProductSizeDetailsInput value={productSizeDetails} onChange={setProductSizeDetails} showError={showError} onValid={setProductSizeDetailsIsValid}/>}

      <PCCsInput value={pccs} onChange={setPccs} showError={showError} onValid={setPccsIsValid}/>

      <CardActions onAdd={onAdd} onClone={onClone} onRemove={onRemove} sx={{my: 1}}/>
    </Paper>
  )
}

export default function ProductSizesInput({
  value, onChange, showError, onValid, isGeneral
}: MyInputProps & {showError: boolean, onValid: Function , isGeneral?: boolean}) {
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
      onChange && onChange([...(value || []), addTempId(emptySize)])
    }
  }, [value])

  const handleAction = useCallback((idx, action) => {
    if (action === 'add') {
      onChange && onChange([...slice(value, 0, idx + 1), addTempId(emptySize), ...slice(value, idx + 1)])
    } else if (action === 'clone') {
      onChange && onChange([...slice(value, 0, idx + 1), addTempId(value[idx]), ...slice(value, idx + 1)])
    } else {
      onChange && onChange([...slice(value, 0, idx), ...slice(value, idx + 1)])
      setValidMapping(omit(validMapping, value[idx]?.id || value[idx]?.tempId))
    }
  }, [value, validMapping])

  return (
    <>
      <SubTitle>{t('sizes')}</SubTitle>

      {map(value, (size, idx) =>
        <Box key={size.id || size.tempId} sx={{mt: idx ? 2 :  0}}>
          <SingleItem
            value={size}
            onChange={(v) => handleInput(v, idx)}
            showError={showError}
            onValid={(v) => handleValidUpdate(v, idx)}
            onAdd={() => handleAction(idx, 'add')}
            onClone={() => handleAction(idx, 'clone')}
            onRemove={() => handleAction(idx, 'remove')}
            isGeneral={isGeneral}
          />
        </Box>
      )}
    </>
  )
}