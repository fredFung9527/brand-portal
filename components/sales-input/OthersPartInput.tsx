import { Grid, Paper } from '@mui/material'
import { debounce } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useRef, useState } from 'react'
import { MyInputProps } from '../../@types/input'
import { demoIncoTerms } from '../../demo/sales'
import MyTextField from '../form/MyTextField'
import MyAutocomplete from '../select/MyAutocomplete'

export default function OthersPartInput({
  value, onChange
}: MyInputProps) {
  const { t } = useTranslation('products')

  const [moldCharge, setMoldCharge] = useState(value?.moldCharge || '')
  const [bulkLeadtime, setBulkLeadtime] = useState(value?.bulkLeadtime || '')
  const [bulkOrderMoq, setBulkOrderMoq] = useState(value?.bulkOrderMoq || '')
  const [bulkColorMoq, setBulkColorMoq] = useState(value?.bulkColorMoq || '')
  const [incoTerm, setIncoTerm] = useState(value?.incoTerm || null)

  const onChangeDebounce = useRef(
    debounce((v) => {
      onChange && onChange(v)
    }, 500)
  ).current
  useEffect(() => {
    onChangeDebounce({
      moldCharge, bulkLeadtime, bulkOrderMoq, bulkColorMoq, incoTerm
    })
  }, [moldCharge, bulkLeadtime, bulkOrderMoq, bulkColorMoq, incoTerm])

  return (
    <Paper sx={{p:2}}>
      <Grid container columnSpacing={2} alignItems='flex-end'>
        <Grid item xs={12} sm={6}>
          <MyTextField
            label={t('moldCharge')}
            value={moldCharge}
            onChange={setMoldCharge}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            label={t('bulkLeadtimeInput')}
            value={bulkLeadtime}
            onChange={setBulkLeadtime}
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            label={t('bulkOrderMoq')}
            value={bulkOrderMoq}
            onChange={setBulkOrderMoq}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            label={t('bulkColorMoq')}
            value={bulkColorMoq}
            onChange={setBulkColorMoq}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyAutocomplete
            label={t('incoTerm')}
            value={incoTerm}
            onChange={setIncoTerm}
            items={demoIncoTerms}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}