import { Typography, Grid, IconButton, Tooltip } from '@mui/material'
import { MyListInputProps } from '../@types/input'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { debounce, every, keys, map, omit, slice } from 'lodash'
import DeleteButton from './DeleteButton'
import { useCallback, useEffect, useRef, useState } from 'react'
import { addTempId } from '../utils/common'
import MyForm from './form/MyForm'
import useTranslation from 'next-translate/useTranslation'

export default function MyListInput({
  required, label, color, defaultValue, value, items, onChange, showError, 
  onValid, sx, parseNewValue, extraAction
}: MyListInputProps & { extraAction?: any }) {
  const { t } = useTranslation('common')
  const [validMapping, setValidMapping] = useState({})

  useEffect(() => {
    if (required && !value?.length) {
      handleAction(null, 'add')
    }
  }, [value])

  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current
  const handleInput = useCallback((v, idx) => {
    const newList = map(value, (it, jdx) => {
      if (jdx === idx) {
        return {...it, ...v}
      } else {
        return it
      }
    })
    onChangeDebounce && onChangeDebounce(newList)
  }, [value])

  const handleAction = useCallback((idx, action) => {
    if (action === 'add') {
      onChange && onChange([...(value || []), addTempId(defaultValue)])
    } else {
      onChange && onChange([...slice(value, 0, idx), ...slice(value, idx + 1)])
      setValidMapping(omit(validMapping, value[idx]?.id || value[idx]?.tempId))
    }
  }, [value, validMapping])

  const handleValidUpdate = useCallback((v, key) => {
    setValidMapping({...validMapping, [key]: v})
  }, [validMapping])
  useEffect(() => {
    if (required) {
      onValid && onValid(every(validMapping, (value, key) => value))
    } else {
      if (keys(validMapping).length) {
        onValid && onValid(every(validMapping, (value, key) => value))
      } else {
        onValid && onValid(true)
      }
    }
  }, [validMapping])

  return (
    <>
      <Grid container alignItems='center' spacing={1} sx={sx}>
        <Grid item>
          <Typography 
            sx={(theme) => ({
              color: theme.palette.grayLabelText.main,
            })}
          >
            {label}
          </Typography>
        </Grid>
        {Boolean(extraAction) && 
          <Grid item>
            { extraAction }
          </Grid>
        }
        <Grid item>
          <Tooltip title={t('add')}>
            <IconButton color={color || 'primary'} onClick={() => handleAction(null, 'add')}>
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
              borderLeftColor: theme.palette[color]?.main || theme.palette.primary.main
            })}
          >
            <MyForm
              onChange={(v) => handleInput(v, idx)}
              onValid={(v) => handleValidUpdate(v, item.id || item.tempId)}
              items={map(items, it => ({...it, default: item[it.key]}))}
              showError={showError}
              parseNewValue={parseNewValue}
            />
          </Grid>
          <Grid item>
            <DeleteButton onRemove={() => handleAction(idx, 'remove')}/>
          </Grid>
        </Grid>
      )}
    </>
  )
}