import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDialog } from './providers/DialogProvider'
import useTranslation from 'next-translate/useTranslation'
import { DeleteButtonProps } from '../@types/button'
import MyButton from './MyButton'

export default function DeleteButton({onRemove, title, content, disabled, textMode}: DeleteButtonProps) {
  const { t } = useTranslation('common')
  const [openDialog] = useDialog()

  async function tryConfirm() {
    const confirm = await openDialog({
      type: 'confirm',
      color: 'secondary',
      title: title || t('dialog.confirmDelete'),
      content: content || t('dialog.confirmDeleteText')
    })
    if (confirm) {
      onRemove && onRemove()
    }
  }

  if (textMode) {
    return (
      <MyButton 
        color='secondary'
        startIcon={<DeleteIcon/>}
        onClick={tryConfirm}
        disabled={disabled}
      >
        {t('delete')}
      </MyButton>
    )
  }

  if (disabled) {
    return (
      <IconButton color='secondary' disabled>
        <DeleteIcon/>
      </IconButton>
    )
  }

  return (
    <Tooltip title={t('delete')}>
      <IconButton color='secondary' onClick={tryConfirm}>
        <DeleteIcon/>
      </IconButton>
    </Tooltip>
  )
}