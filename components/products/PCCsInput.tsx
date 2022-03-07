import { Box, Divider } from '@mui/material'
import { cloneDeep, debounce, every, map, omit, slice } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MyInputProps } from '../../@types/input'
import { addTempId } from '../../utils/common'
import { checkRequired } from '../../utils/rules'
import MyForm from '../form/MyForm'
import SubTitle from '../SubTitle'
import CardActions from './CardActions'
import PCCTestingsInput from './PCCTestingsInput'
import PCCUsagesInput from './PCCUsagesInput'
import PCCVendorsInput from './PCCVendorsInput'
import ProductComponentsInput from './ProductComponentsInput'

const emptyPCC = {
  name: '',
  remarks: '',
  components: [],
  testings: [],
  vendors: [],
  usages: []
}

function SingleItem({
  value, onChange, showError, onValid, onAdd, onClone, onRemove
}: MyInputProps & {
  showError: boolean, onValid: any,
  onAdd: any, onClone: any, onRemove: any
}) {
  const { t } = useTranslation('products')
  const [basic, setBasic] = useState(omit(value, 'components', 'testings', 'vendors', 'usages'))
  const [basicIsValid, setBasicIsValid] = useState(false)
  const [components, setComponents] = useState(cloneDeep(value.components))
  const [componentsIsValid, setComponentsIsValid] = useState(false)
  const [testings, setTestings] = useState(cloneDeep(value.testings))
  const [testingsIsValid, setTestingsIsValid] = useState(false)
  const [vendors, setVendors] = useState(cloneDeep(value.vendors))
  const [vendorsIsValid, setVendorsIsValid] = useState(false)
  const [usages, setUsages] = useState(cloneDeep(value.usages))
  const [usagesIsValid, setUsagesIsValid] = useState(false)

  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current
  useEffect(() => {
    onChangeDebounce({...basic, components, testings, vendors, usages})
  }, [basic, components, testings, vendors, usages])
  
  useEffect(() => {
    onValid && onValid(basicIsValid && vendorsIsValid && usagesIsValid && testingsIsValid && componentsIsValid)
  }, [basicIsValid, componentsIsValid, testingsIsValid, vendorsIsValid, usagesIsValid])
  
  return (
    <Box
      sx={(theme) => 
        ({
          backgroundColor: theme.palette.grayBg.main,
          borderRadius: theme.spacing(2),
          px: 2, pt: 2, pb: 1,
        })
      }
    >
      <MyForm
        onChange={setBasic}
        onValid={setBasicIsValid}
        items={[
          {
            key: 'name',
            default: basic.name,
            label: t('name'),
            rules: [checkRequired(t('error:required'))],
            type: 'text',
            grid: { xs: 12, sm: 6 }
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

      <Divider variant='middle' sx={{mb: 2}}/>
      <ProductComponentsInput value={components} onChange={setComponents} showError={showError} onValid={setComponentsIsValid}/>
      
      <Divider variant='middle' sx={{my: 2}}/>
      <PCCTestingsInput value={testings} onChange={setTestings} showError={showError} onValid={setTestingsIsValid}/>
    
      <Divider variant='middle' sx={{my: 2}}/>
      <PCCVendorsInput value={vendors} onChange={setVendors} showError={showError} onValid={setVendorsIsValid}/>
    
      <Divider variant='middle' sx={{my: 2}}/>
      <PCCUsagesInput value={usages} onChange={setUsages} showError={showError} onValid={setUsagesIsValid}/>
    
      <CardActions onAdd={onAdd} onClone={onClone} onRemove={onRemove} sx={{my: 1}}/>
    </Box>
  )
}

export default function PCCsInput({value, onChange, showError, onValid}: MyInputProps & {showError: boolean, onValid: Function}) {
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
      onChange && onChange([...(value || []), addTempId(emptyPCC)])
    }
  }, [value])

  const handleAction = useCallback((idx, action) => {
    if (action === 'add') {
      onChange && onChange([...slice(value, 0, idx + 1), addTempId(emptyPCC), ...slice(value, idx + 1)])
    } else if (action === 'clone') {
      onChange && onChange([...slice(value, 0, idx + 1), addTempId(value[idx]), ...slice(value, idx + 1)])
    } else {
      onChange && onChange([...slice(value, 0, idx), ...slice(value, idx + 1)])
      setValidMapping(omit(validMapping, value[idx]?.id || value[idx]?.tempId))
    }
  }, [value, validMapping])
  
  return (
    <>
      <SubTitle noMT>{t('pccs')}</SubTitle>
      {map(value, (pcc, idx) =>
        <Box key={pcc.id || pcc.tempId} sx={{mt: idx ? 2 :  0}}>
          <SingleItem
            value={pcc}
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