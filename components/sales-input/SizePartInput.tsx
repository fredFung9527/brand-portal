import { Grid, Paper } from '@mui/material'
import { debounce } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useRef, useState } from 'react'
import { MyInputProps } from '../../@types/input'
import MyTextField from '../form/MyTextField'
import MyDropzone from '../MyDropzone'

export default function SizePartInput({
  value, onChange, showError, onValid, disableEditSize
}: MyInputProps & {showError: boolean, onValid: any, disableEditSize?: boolean}) {
  const { t } = useTranslation('products')

  const [name, setName] = useState(value?.name || '')
  const [newSizeName, setNewSizeName] = useState(value?.newSizeName || '')
  const [remarks, setRemarks] = useState(value?.remarks || '')
  const [documents, setDocuments] = useState(value?.documents || [])

  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current
  const onValidDebounce = useRef(
    debounce((v) => {
      onValid && onValid(Boolean(v))
    }, 500)
  ).current
  useEffect(() => {
    onChangeDebounce({
      name, newSizeName, remarks, documents
    })
    onValidDebounce(name)
  }, [name, newSizeName, remarks, documents])

  return (
    <Paper sx={{p:2}}>
      <Grid container columnSpacing={2} alignItems='flex-end'>
        <Grid item xs={12} sm={6}>
          <MyTextField
            label={t('sizeName')}
            value={name}
            onChange={setName}
            error={showError && !Boolean(name)}
            helperText={showError && !Boolean(name) && t('error:required')}
            required
            disabled={disableEditSize}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            label={t('newSizeName')}
            value={newSizeName}
            onChange={setNewSizeName}
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            label={t('remarks')}
            value={remarks}
            onChange={setRemarks}
            multiline
            disabled={disableEditSize}
          />
        </Grid>
      </Grid>

      <MyDropzone 
        label={t('attachments')} 
        value={documents} 
        onChange={setDocuments}
        listView
        disabled={disableEditSize}
      />
    </Paper>
  )
}