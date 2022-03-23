import { MyInputProps } from '../../@types/input'
import useTranslation from 'next-translate/useTranslation'
import MyAutocomplete from '../select/MyAutocomplete'
import { demoComponentTypes, demoMaterials } from '../../demo/product'
import AXCodeInput from './AXCodeInput'
import { useEffect, useRef, useState } from 'react'
import { Button, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import MyTextField from '../form/MyTextField'
import { debounce, every, filter, map, omit } from 'lodash'
import { addTempId } from '../../utils/common'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteButton from '../DeleteButton'
import MyFilePicker from '../MyFilePicker'
import MyImage from '../MyImage'
import PricesInput from '../sales-input/PricesInput'
import SuggestPricesInput from './SuggestPricesInput'

function SingleItem({
  value, onChange, showError, onValid, disabled, salesMode,
  marketCode, isGeneral
}: MyInputProps & {
  showError: boolean, onValid: any, disabled?: boolean,
  salesMode?: boolean, marketCode?: string, isGeneral?: boolean
}) {
  const { t } = useTranslation('products')

  const [axCode, setAxCode] = useState(value?.axCode || '')
  const [factories, setFactories] = useState(value?.factories || [])
  const [type, setType] = useState(value?.type || null)
  const [remarks, setRemarks] = useState(value?.remarks || '')
  const [materials, setMaterials] = useState(value?.materials || [])
  const [photo, setPhoto] = useState(value?.photo || null)
  const [prices, setPrices] = useState(value?.prices || [])
  const [pricesIsValid, setPricesIsValid] = useState(false)
  const [suggestPrices, setSuggestPrices] = useState(value?.suggestPrices || [])
  const [suggestPricesIsValid, setSuggestPricesIsValid] = useState(false)

  const debounceCall = useRef(
    debounce((f) => f(), 500)
  ).current
  useEffect(() => {
    debounceCall(() => {
      onChange({axCode, factories, type, remarks, materials, photo, prices, suggestPrices})
      onValid(Boolean(axCode && factories.length && type && materials.length) && 
        (!salesMode || pricesIsValid) && (!isGeneral || suggestPricesIsValid)
      )
    })
  }, [
    axCode, factories, type, remarks, materials, photo, prices, 
    pricesIsValid, suggestPrices, suggestPricesIsValid
  ])

  return (
    <>
      <Grid container columnSpacing={2} alignItems='flex-end'>
        <Grid item xs={12}>
          <Typography sx={(theme) => ({color: theme.palette.grayLabelText.main})}>
            {t('photo')}
          </Typography>
          <Button fullWidth disabled={disabled}>
            <MyFilePicker onChange={setPhoto}>
              <MyImage src={photo || '/images/photo.png'} width={150} height={150}/>
            </MyFilePicker>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AXCodeInput
            label={t('axCode')}
            value={axCode}
            onChange={setAxCode}
            error={showError && !Boolean(axCode)}
            helperText={showError && !Boolean(axCode) && t('error:required')}
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyAutocomplete
            label={t('factories')}
            value={factories}
            onChange={setFactories}
            error={showError && !Boolean(factories.length)}
            helperText={showError && !Boolean(factories.length) && t('error:required')}
            items={['YL']}
            multiple
            required
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyAutocomplete
            label={t('componentType')}
            value={type}
            onChange={setType}
            error={showError && !Boolean(type)}
            helperText={showError && !Boolean(type) && t('error:required')}
            required
            items={demoComponentTypes}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyAutocomplete
            label={t('materials')}
            value={materials}
            onChange={setMaterials}
            error={showError && !Boolean(materials.length)}
            helperText={showError && !Boolean(materials.length) && t('error:required')}
            required
            multiple
            items={demoMaterials}
            freeSolo
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            label={t('remarks')}
            value={remarks}
            onChange={setRemarks}
            multiline
            disabled={disabled}
          />
        </Grid>
      </Grid>

      {salesMode &&
        <PricesInput 
          value={prices} 
          onChange={setPrices} 
          onValid={setPricesIsValid} 
          showError={showError}
          marketCode={marketCode}
          notMust
        />
      }

      {isGeneral &&
        <SuggestPricesInput 
          value={suggestPrices} 
          onChange={setSuggestPrices} 
          onValid={setSuggestPricesIsValid} 
          showError={showError}
        />
      }
    </>
  )
}

export default function ComponentsInput({
  value, onChange, showError, onValid, disabled, salesMode,
  marketCode, isGeneral
}: MyInputProps & {
  showError: boolean, onValid: any, disabled?: boolean,
  salesMode?: boolean, marketCode?: string, isGeneral?: boolean
}) {
  const { t } = useTranslation('products')

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
    if (!value?.length) {
      onValid && onValid(true)
    } else {
      onValid && onValid(every(validMapping, (value, key) => value))
    }
  }, [validMapping])

  function handleAction(action, id=null) {
    if (action === 'remove') {
      onChange && onChange(filter(value, it => !(it.id === id || it.tempId === id)))
      setValidMapping(omit(validMapping, id))
    } else {
      onChange && onChange([...value, addTempId({})])
    }
  }

  return (
    <>
      <Grid container alignItems='center' spacing={1}>
        <Grid item>
          <Typography 
            sx={(theme) => ({
              color: theme.palette.grayLabelText.main,
            })}
          >
            {t('components')}
          </Typography>
        </Grid>
        <Grid item>
          {disabled ?
            <IconButton color='primary' disabled>
              <AddCircleOutlineIcon/>
            </IconButton> :
            <Tooltip title={t('common:add')}>
              <IconButton color='primary' onClick={() => handleAction('add')}>
                <AddCircleOutlineIcon/>
              </IconButton>
            </Tooltip>
          }
        </Grid>
      </Grid>

      {map(value, (item, idx) =>
        <Grid container key={item.id || item.tempId} alignItems='center' sx={{mt: idx ? 2 : 0}}>
          <Grid 
            item xs 
            sx={(theme) => ({
              px: 1, borderLeft: 5, 
              borderLeftStyle: 'solid', borderRadius: '5px 0 0 5px',
              borderLeftColor: theme.palette.primary.main
            })}
          >
            <SingleItem
              value={item}
              onChange={(v) => handleInput(v, item.id || item.tempId)}
              onValid={(v) => setValidMapping({...validMapping, [item.id || item.tempId]: v})}
              showError={showError}
              disabled={disabled}
              salesMode={salesMode}
              marketCode={marketCode}
              isGeneral={isGeneral}
            />
          </Grid>
          <Grid item>
            <DeleteButton onRemove={() => handleAction('remove', item.id || item.tempId)} disabled={disabled}/>
          </Grid>
        </Grid>
      )}
    </>
  )
}