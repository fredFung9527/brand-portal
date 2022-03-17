import { MyInputProps } from '../../@types/input'
import useTranslation from 'next-translate/useTranslation'
import MyAutocomplete from '../select/MyAutocomplete'
import { demoTestingTypes } from '../../demo/product'
import { useEffect, useRef, useState } from 'react'
import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import MyTextField from '../form/MyTextField'
import { debounce, every, filter, map, omit } from 'lodash'
import { addTempId } from '../../utils/common'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DeleteButton from '../DeleteButton'
import PullTestInput from './PullTestInput'
import MySelect from '../select/MySelect'

function SingleItem({
  value, onChange, showError, onValid, disabled
}: MyInputProps & {showError: boolean, onValid: any, disabled?: boolean}) {
  const { t } = useTranslation('products')

  const [type, setType] = useState(value?.type || null)
  const [result, setResult] = useState(value?.result || '')
  const [remarks, setRemarks] = useState(value?.remarks || '')

  const debounceCall = useRef(
    debounce((f) => f(), 500)
  ).current
  useEffect(() => {
    debounceCall(() => {
      onChange({type, result, remarks})
      onValid(Boolean(type && result))
    })
  }, [type, result, remarks])
  
  function handleTypeInput(v) {
    setType(v)
    setResult('')
  }

  return (
    <Grid container columnSpacing={2} alignItems='flex-end'>
      <Grid item xs={12} sm={6}>
        <MyAutocomplete
          label={t('type')}
          value={type}
          onChange={handleTypeInput}
          error={showError && !Boolean(type)}
          helperText={showError && !Boolean(type) && t('error:required')}
          required
          items={demoTestingTypes}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        {(!type || type === 'Others') ?
          <MyTextField
            label={t('result')}
            value={result}
            onChange={setResult}
            error={showError && !Boolean(result)}
            helperText={showError && !Boolean(result) && t('error:required')}
            required
            disabled={disabled}
          /> :
          type === 'Needle' ?
            <MySelect
              label={t('result')}
              value={result}
              onChange={setResult}
              error={showError && !Boolean(result)}
              helperText={showError && !Boolean(result) && t('error:required')}
              required
              items={['Yes', 'No']}
              disabled={disabled}
            /> :
            <PullTestInput
              label={t('result')}
              value={result}
              onChange={setResult}
              error={showError && !Boolean(result)}
              helperText={showError && !Boolean(result) && t('error:required')}
              required
              disabled={disabled}
            />
        }
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
  )
}

export default function TestingsInput({
  value, onChange, showError, onValid, disabled
}: MyInputProps & {showError: boolean, onValid: any, disabled?: boolean}) {
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
            {t('testings')}
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
              borderLeftColor: theme.palette.info.main
            })}
          >
            <SingleItem
              value={item}
              onChange={(v) => handleInput(v, item.id || item.tempId)}
              onValid={(v) => setValidMapping({...validMapping, [item.id || item.tempId]: v})}
              showError={showError}
              disabled={disabled}
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