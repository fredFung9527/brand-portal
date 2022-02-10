import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Zoom } from '@mui/material'
import { last, map, slice } from 'lodash'
import { createContext, useContext, useRef, useState, forwardRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import useTranslation from 'next-translate/useTranslation'
import { MyDialog } from '../../@types/providers'

const Transition = forwardRef(function Transition(props: any, ref: any) {
  return <Zoom ref={ref} {...props}/>
})

const DialogContext = createContext(null)

function ConfirmActions({reslove, closeDialog, color}) {
  const { t } = useTranslation('common')

  return (
    <>
      <Button 
        sx={{color: (theme) => theme.palette.grayText.main}} 
        onClick={_ => {reslove(false); closeDialog()}}
      >
        {t('cancel')}
      </Button>
      <Button 
        color={color || 'primary'} 
        onClick={_ => {reslove(true); closeDialog()}}
      >
        {t('confirm')}
      </Button>
    </>
  )
}

export default function DialogProvider({children}) {
  const [dialogs, setDialogs] = useState<MyDialog[]>([])

  function openDialog(dialog: MyDialog) {
    if (!dialog) {
      return
    }
    if (dialog.type === 'confirm') {
      return new Promise((reslove) => {
        setDialogs([...dialogs, {
          ...dialog, 
          reslove,
        }])
      })
    } else {
      setDialogs([...dialogs, dialog])
    }
  }

  function closeDialog(reslove, checkPersistent) {
    const lastOne = last(dialogs)
    if (checkPersistent && lastOne.persistent) {
      return
    }
    lastOne?.onClose && lastOne.onClose()
    reslove && reslove(false)
    setDialogs(slice(dialogs, 0, dialogs.length - 1))
  }

  const contextValue = useRef([openDialog, closeDialog])

  return (
    <DialogContext.Provider value={contextValue.current}>
      {children}
      {map(dialogs, (dialog, idx) => {
        const {type, reslove, title, content, actions, persistent, color, ...otherProps} = dialog
        return (
          <Dialog key={idx} {...otherProps} TransitionComponent={Transition} open={true} onClose={() => closeDialog(reslove, true)}>
            {(!Boolean(persistent) || Boolean(title)) &&
              <DialogTitle sx={{mr: 2}}>
                {title}
                {!Boolean(persistent) &&
                  <IconButton 
                    onClick={() => closeDialog(reslove, true)} 
                    aria-label='close' 
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon/>
                  </IconButton>
                }
              </DialogTitle>
            }
            <DialogContent>
              {content}
            </DialogContent>
            {(Boolean(actions) || type === 'confirm') &&
              <DialogActions>
                { actions || <ConfirmActions reslove={reslove} closeDialog={() => closeDialog(reslove, false)} color={color}/> }
              </DialogActions>
            }
          </Dialog>
        )
      })}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const result = useContext(DialogContext)
  if (!result) {
    throw new Error('Dialog context is only available inside its provider')
  }
  return result
}