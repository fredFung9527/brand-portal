import { Button, IconButton, Tooltip } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import useTranslation from 'next-translate/useTranslation'
import { useDialog } from './providers/DialogProvider'
import MyForm from './form/MyForm'
import { useEffect, useState } from 'react'
import { cloneDeep, isEqual, map } from 'lodash'
import { MyFormProps } from '../@types/input'

export default function FilterButton({value, initValue, onChange, items}: {value: any, initValue?: any} & MyFormProps) {
  const { t } = useTranslation('common')
  const [openDialog, closeDialog] = useDialog()
  const [cloneData, setCloneData] = useState({})
  const [status, setStatus] = useState('init')

  useEffect(() => {
    if (status === 'confirmed' && !isEqual(cloneData, value)) {
      onChange && onChange(cloneData)
    }
  }, [status])

  function openFilter() {
    const clonedValue = cloneDeep(value) || {}
    setCloneData(clonedValue)
    setStatus('open')
    openDialog({
      title: t('filter'),
      fullWidth: true,
      maxWidth: 'md',
      content: 
        <MyForm
          onChange={setCloneData}
          items={map(items, it => ({
            ...it,
            default: clonedValue[it.key] || ''
          }))}
        />
      ,
      actions: 
        <>
          <Button 
            sx={{color: (theme) => theme.palette.grayText.main}} 
            onClick={() => {closeDialog(); setCloneData(initValue); setStatus('confirmed')}}
          >
            {t('clear')}
          </Button>
          <Button 
            color='primary'
            onClick={() => {closeDialog(); setStatus('confirmed')}}
          >
            {t('confirm')}
          </Button>
        </>
    })
  }

  return (
    <>
      <Tooltip title={t('filter')}>
        <IconButton color='primary' onClick={openFilter}>
          <TuneIcon/>
        </IconButton>
      </Tooltip>
    </>
  )
}