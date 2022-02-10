import { useCallback, useEffect } from 'react'
import { IconButton } from '@mui/material'
import { useRecoilState } from 'recoil'
import { recoilAlert } from '../../recoil/common'
import { includes, split } from 'lodash'
import CloseIcon from '@mui/icons-material/Close'
import { SnackbarProvider, useSnackbar } from 'notistack'

function LogicPart() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const handleNewMessage = useCallback((message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      action: (key) => (
        <IconButton size='small' color='inherit' aria-label='close' onClick={_ => closeSnackbar(key)}>
          <CloseIcon/>
        </IconButton>
      )
    })
  }, [enqueueSnackbar, closeSnackbar])

  const [alert, setAlert] = useRecoilState(recoilAlert)
  useEffect(() => {
    if (!alert) {
      return
    }
    const splited = split(alert, ':')
    if (splited[1]) {
      const variant = includes(['success', 'error', 'warning', 'info'], splited[0]) ? splited[0] : 'success'
      handleNewMessage(splited[1], variant)
    } else {
      handleNewMessage(alert, 'success')
    }
    setTimeout(() => setAlert(''), 1000)
  }, [alert])

  return null
}

export default function AlertHandler() {
  return (
    <SnackbarProvider>
      <LogicPart/>
    </SnackbarProvider>
  )
}