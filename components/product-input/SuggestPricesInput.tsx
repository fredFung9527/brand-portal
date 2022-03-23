import { MyInputProps } from '../../@types/input'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useRef, useState } from 'react'
import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import MyTextField from '../form/MyTextField'
import { debounce, every, filter, forEach, map, omit } from 'lodash'
import { addTempId } from '../../utils/common'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteButton from '../DeleteButton'
import SeasonInput from './SeasonInput'
import MySelect from '../select/MySelect'
import { demoCurrencies, demoUnits } from '../../demo/sales'
import { checkSeasonOrYear } from '../../utils/rules'
import FileCopyIcon from '@mui/icons-material/FileCopy'

function SingleItem({
  value, onChange, showError, onValid
}: MyInputProps & {showError: boolean, onValid: any}) {
  const { t } = useTranslation('products')

  const [season, setSeason] = useState(value?.season || '')
  const [color, setColor] = useState(value?.color || '')
  const [currency, setCurrency] = useState(value?.currency || 'USD')
  const [itemValue, setItemValue] = useState(value?.value || '')
  const [unit, setUnit] = useState(value?.unit || 'PCS')

  const debounceCall = useRef(
    debounce((f) => f(), 500)
  ).current
  useEffect(() => {
    debounceCall(() => {
      onChange({season, color, currency, value: itemValue, unit})
      onValid(Boolean((!season || checkSeasonOrYear(season)) && currency && itemValue && unit))
    })
  }, [season, color, currency, itemValue, unit])

  return (
    <Grid container columnSpacing={2} alignItems='flex-end'>
      <Grid item xs={12} sm={6}>
        <SeasonInput
          label={t('seasonOrYear')}
          value={season}
          onChange={setSeason}
          error={showError && season && !checkSeasonOrYear(season)}
          helperText={showError && season && !checkSeasonOrYear(season) && t('error:invalidSeason')}
          orYear
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MyTextField
          label={t('color')}
          value={color}
          onChange={setColor}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MySelect
          label={t('currency')}
          value={currency}
          onChange={setCurrency}
          required
          items={demoCurrencies}
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
          required
          items={demoUnits}
        />
      </Grid>
    </Grid>
  )
}

export default function SuggestPricesInput({
  value, onChange, showError, onValid
}: MyInputProps & {
  showError: boolean, onValid: any
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
      return
    }
    onValid && onValid(every(validMapping, (value, key) => value))
  }, [validMapping])

  function handleAction(action, id=null) {
    if (action === 'remove') {
      onChange && onChange(filter(value, it => !(it.id === id || it.tempId === id)))
      setValidMapping(omit(validMapping, id))
    } else if (action === 'add') {
      onChange && onChange([...value, addTempId({})])
    } else {
      let newList = []
      forEach(value, it => {
        newList.push(it)
        if (it.id === id || it.tempId === id) {
          newList.push(addTempId(it))
        }
      })
      onChange && onChange(newList)
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
            {t('suggestPrices')}
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title={t('common:add')}>
            <IconButton color='warning' onClick={() => handleAction('add')}>
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
              borderLeftColor: theme.palette.warning.main
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
            <Grid container direction='column'>
              <Tooltip title={t('common:clone')}>
                <IconButton color='info' onClick={() => handleAction('clone', item.id || item.tempId)}>
                  <FileCopyIcon/>
                </IconButton>
              </Tooltip>
              <DeleteButton onRemove={() => handleAction('remove', item.id || item.tempId)}/>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}