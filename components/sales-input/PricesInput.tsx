import { MyInputProps } from '../../@types/input'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useRef, useState } from 'react'
import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import MyTextField from '../form/MyTextField'
import { debounce, every, filter, forEach, map, omit } from 'lodash'
import { addTempId } from '../../utils/common'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteButton from '../DeleteButton'
import SeasonInput from '../product-input/SeasonInput'
import MyCheckBox from '../MyCheckBox'
import MySelect from '../select/MySelect'
import { demoCurrencies, demoUnits } from '../../demo/sales'
import PriceRangeIcon from './PriceRangeIcon'
import { checkSeasonOrYear } from '../../utils/rules'
import ColorPicker from './ColorPicker'
import FileCopyIcon from '@mui/icons-material/FileCopy'

function SingleItem({
  value, onChange, showError, onValid, marketCode
}: MyInputProps & {showError: boolean, onValid: any, marketCode?: string}) {
  const { t } = useTranslation('products')

  const [isActive, setIsActive] = useState(value?.isActive || true)
  const [season, setSeason] = useState(value?.season || '')
  const [color, setColor] = useState(value?.color || null)
  const [currency, setCurrency] = useState(value?.currency || 'USD')
  const [itemValue, setItemValue] = useState(value?.value || '')
  const [unit, setUnit] = useState(value?.unit || 'PCS')

  const debounceCall = useRef(
    debounce((f) => f(), 500)
  ).current
  useEffect(() => {
    debounceCall(() => {
      onChange({isActive, season, color, currency, value: itemValue, unit})
      onValid(isActive ? Boolean(checkSeasonOrYear(season) && currency && itemValue && unit) : checkSeasonOrYear(season))
    })
  }, [isActive, season, color, currency, itemValue, unit])

  return (
    <Grid container columnSpacing={2} alignItems='flex-end'>
      <Grid item xs={12}>
        <MyCheckBox
          label={t('isActive')}
          value={isActive}
          onChange={setIsActive}
          required
          hideHelperText
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SeasonInput
          label={t('seasonOrYear')}
          value={season}
          onChange={setSeason}
          error={showError && !checkSeasonOrYear(season)}
          helperText={showError && !checkSeasonOrYear(season) && t('error:invalidSeason')}
          required
          orYear
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ColorPicker
          label={t('color')}
          value={color}
          onChange={setColor}
          marketCode={marketCode}
        />
      </Grid>
      {isActive &&
        <>
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
              error={showError && isActive && !Boolean(itemValue)}
              helperText={showError && isActive && !Boolean(itemValue) && t('error:required')}
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
        </>
      }
    </Grid>
  )
}

export default function PricesInput({
  value, onChange, showError, onValid, marketCode, notMust
}: MyInputProps & {
  showError: boolean, onValid: any, marketCode?: string,
  notMust?: boolean
}) {
  const { t } = useTranslation('products')

  useEffect(() => {
    if (!notMust && !value?.length) {
      handleAction('add')
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
    if (notMust && !value?.length) {
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
            {t('prices')}
          </Typography>
        </Grid>
        <Grid item>
          <PriceRangeIcon/>
        </Grid>
        <Grid item>
          <Tooltip title={t('common:add')}>
            <IconButton color='success' onClick={() => handleAction('add')}>
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
              marketCode={marketCode}
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