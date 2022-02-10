import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDialog } from './providers/DialogProvider'
import useTranslation from 'next-translate/useTranslation'
import { DeleteButtonProps } from '../@types/button'

export default function DeleteButton({onRemove, title, content}: DeleteButtonProps) {
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

  return (
    <Tooltip title={t('delete')}>
      <IconButton color='secondary' onClick={tryConfirm}>
        <DeleteIcon/>
      </IconButton>
    </Tooltip>
  )
}