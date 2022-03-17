import { MyInputProps } from '../../@types/input'
import useTranslation from 'next-translate/useTranslation'
import MyAutocomplete from '../select/MyAutocomplete'
import { demoSizeDetailTypes, demoSizeUnits } from '../../demo/product'
import { useEffect, useRef, useState } from 'react'
import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import MyTextField from '../form/MyTextField'
import { debounce, every, filter, map, omit } from 'lodash'
import { addTempId } from '../../utils/common'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteButton from '../DeleteButton'
import MySelect from '../select/MySelect'

function SingleItem({
  value, onChange, showError, onValid
}: MyInputProps & {showError: boolean, onValid: any}) {
  const { t } = useTranslation('products')

  const [type, setType] = useState(value?.type || null)
  const [itemValue, setItemValue] = useState(value?.value || '')
  const [unit, setUnit] = useState(value?.unit || 'mm')

  const debounceCall = useRef(
    debounce((f) => f(), 500)
  ).current
  useEffect(() => {
    debounceCall(() => {
      onChange({type, value: itemValue, unit})
      onValid(Boolean(type && value && unit))
    })
  }, [type, itemValue, unit])

  return (
    <Grid container columnSpacing={2} alignItems='flex-end'>
      <Grid item xs={12} sm={6}>
        <MyAutocomplete
          label={t('type')}
          value={type}
          onChange={setType}
          error={showError && !Boolean(type)}
          helperText={showError && !Boolean(type) && t('error:required')}
          required
          items={demoSizeDetailTypes}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MyTextField
          label={t('value')}
          value={itemValue}
          onChange={setItemValue}
          error={showError && !Boolean(itemValue)}
          helperText={showError && !Boolean(itemValue) && t('error:required')}
          required
          type='number'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MySelect
          label={t('unit')}
          value={unit}
          onChange={setUnit}
          items={demoSizeUnits}
        />
      </Grid>
    </Grid>
  )
}

export default function SizeDetailsInput({
  value, onChange, showError, onValid
}: MyInputProps & {showError: boolean, onValid: any}) {
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
            {t('sizeDetails')}
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title={t('common:add')}>
            <IconButton color='primary' onClick={() => handleAction('add')}>
              <AddCircleOutlineIcon/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      {map(value, (item, idx) =>
        <Grid container key={item.id || item.tempId} alignItems='center' sx={{mt: idx ? 2 : 0}}>
          <Grid 
            item xs 
            sx={(theme) => ({
              px: 1, borderLeft: 5, 
              borderLeftStyle: 'solid', borderRadius: '5px 0 0 5px',
              borderLeftColor: theme.palette.success.main
            })}
          >
            <SingleItem
              value={item}
              onChange={(v) => handleInput(v, item.id || item.tempId)}
              onValid={(v) => setValidMapping({...validMapping, [item.id || item.tempId]: v})}
              showError={showError}
            />
          </Grid>
          <Grid item>
            <DeleteButton onRemove={() => handleAction('remove', item.id || item.tempId)}/>
          </Grid>
        </Grid>
      )}
    </>
  )
}