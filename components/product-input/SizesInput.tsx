import useTranslation from 'next-translate/useTranslation'
import { MyInputProps } from '../../@types/input'
import SeasonInput from './SeasonInput'
import { useEffect, useRef, useState } from 'react'
import { Divider, Grid, Paper } from '@mui/material'
import MyTextField from '../form/MyTextField'
import SubTitle from '../SubTitle'
import { debounce, every, filter, forEach, map, omit } from 'lodash'
import CardActions from './CardActions'
import { addTempId } from '../../utils/common'
import ComponentsInput from './ComponentsInput'
import TestingsInput from './TestingsInput'
import SizeDetailsInput from './SizeDetailsInput'
import { checkSeasonOrYear } from '../../utils/rules'
import MyDropzone from '../MyDropzone'
import SuggestPricesInput from './SuggestPricesInput'

function SingleItem({
  value, onChange, showError, onValid, isGeneral
}: MyInputProps & {showError: boolean, onValid: any, isGeneral?: boolean}) {
  const { t } = useTranslation('products')

  const [name, setName] = useState(value?.name || '')
  const [devSeason, setDevSeason] = useState(value?.devSeason || '')
  const [designer, setDesigner] = useState(value?.designer || '')
  const [remarks, setRemarks] = useState(value?.remarks || '')
  const [components, setComponents] = useState(value?.components || [])
  const [componentsIsValid, setComponentsIsValid] = useState(false)
  const [testings, setTestings] = useState(value?.testings || [])
  const [testingsIsValid, setTestingsIsValid] = useState(false)
  const [sizeDetails, setSizeDetails] = useState(value?.sizeDetails || [])
  const [sizeDetailsIsValid, setSizeDetailsIsValid] = useState(false)
  const [documents, setDocuments] = useState(value?.documents || [])
  const [suggestPrices, setSuggestPrices] = useState(value?.suggestPrices || [])
  const [suggestPricesIsValid, setSuggestPricesIsValid] = useState(false)

  const debounceCall = useRef(
    debounce((f) => f(), 500)
  ).current
  useEffect(() => {
    debounceCall(() => {
      onChange({
        name, devSeason, designer, remarks, components, testings, 
        sizeDetails, documents, suggestPrices
      })
      onValid(
        Boolean(name) && componentsIsValid && testingsIsValid && 
        (!isGeneral || (sizeDetailsIsValid && suggestPricesIsValid)) && (!devSeason || checkSeasonOrYear(devSeason))
      )
    })
  }, [
    name, devSeason, designer, remarks, components, componentsIsValid, 
    testings, testingsIsValid, sizeDetails, sizeDetailsIsValid, documents,
    suggestPrices, suggestPricesIsValid
  ])

  return (
    <>
      <Grid container columnSpacing={2} alignItems='flex-end'>
        <Grid item xs={12} sm={6}>
          <MyTextField
            label={t('sizeName')}
            value={name}
            onChange={setName}
            error={showError && !Boolean(name)}
            helperText={showError && !Boolean(name) && t('error:required')}
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            label={t('designer')}
            value={designer}
            onChange={setDesigner}
          />
        </Grid>
      </Grid>

      <ComponentsInput
        value={components}
        onChange={setComponents}
        showError={showError}
        onValid={setComponentsIsValid}
        isGeneral={isGeneral}
      />

      <Divider sx={{my: 2}}/>
      <TestingsInput
        value={testings}
        onChange={setTestings}
        showError={showError}
        onValid={setTestingsIsValid}
      />

      {isGeneral &&
        <>
          <Divider sx={{my: 2}}/>
          <SizeDetailsInput
            value={sizeDetails}
            onChange={setSizeDetails}
            showError={showError}
            onValid={setSizeDetailsIsValid}
          />

          <Divider sx={{my: 2}}/>
          <SuggestPricesInput
            value={suggestPrices} 
            onChange={setSuggestPrices} 
            onValid={setSuggestPricesIsValid} 
            showError={showError}
          />
        </>
      }

      <Divider sx={{my: 2}}/>
      <MyTextField
        label={t('remarks')}
        value={remarks}
        onChange={setRemarks}
        multiline
      />

      <MyDropzone 
        label={t('attachments')} 
        value={documents} 
        onChange={setDocuments}
        listView
      />
    </>
  )
}

export default function SizesInput({
  value, onChange, showError, onValid, isGeneral
}: MyInputProps & {showError: boolean, onValid: any, isGeneral?: boolean}) {
  const { t } = useTranslation('products')
  
  useEffect(() => {
    if (!value?.length) {
      onChange && onChange([...(value || []), addTempId({})])
    }
  }, [value])
  
  function handleInput(v, id) {
    const newList = map(value, it => {
      if (it.id === id || it.tempId === id) {
        return {...it, ...v}
      } else {
        return it
      }
    })
    onChange && onChange(newList)
  }

  const [validMapping, setValidMapping] = useState({})
  useEffect(() => {
    onValid && onValid(every(validMapping, (value, key) => value))
  }, [validMapping])

  function handleAction(action, id) {
    if (action === 'remove') {
      onChange && onChange(filter(value, it => !(it.id === id || it.tempId === id)))
      setValidMapping(omit(validMapping, id))
    } else {
      let newList = []
      forEach(value, it => {
        newList.push(it)
        if (it.id === id || it.tempId === id) {
          newList.push(action === 'add' ? addTempId({}) : addTempId(it))
        }
      })
      onChange && onChange(newList)
    }
  }

  return (
    <>
      <SubTitle>{t('sizes')}</SubTitle>

      {map(value, (size, idx) =>
        <Paper 
          key={size.id || size.tempId} 
          sx={{mt: idx ? 2 :  0, px: 2, pt:2, pb: 1}}
        >
          <SingleItem
            value={size}
            onChange={(v) => handleInput(v, size.id || size.tempId)}
            showError={showError}
            onValid={(v) => setValidMapping({...validMapping, [size.id || size.tempId]: v})}
            isGeneral={isGeneral}
          />
          <CardActions 
            onAdd={() => handleAction('add', size.id || size.tempId)}
            onClone={() => handleAction('clone', size.id || size.tempId)} 
            onRemove={() => handleAction('remove', size.id || size.tempId)} 
            sx={{my: 1}}
          />
        </Paper>
      )}
    </>
  )
}