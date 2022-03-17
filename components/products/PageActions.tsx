import { Grid } from '@mui/material'
import MyButton from '../MyButton'
import EditIcon from '@mui/icons-material/Edit'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import useTranslation from 'next-translate/useTranslation'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDialog } from '../providers/DialogProvider'

export default function PageActions({onRemove, editPath, clonePath}) {
  const { t } = useTranslation('common')
  const [openDialog] = useDialog()

  async function tryConfirmDelete() {
    const confirm = await openDialog({
      type: 'confirm',
      color: 'secondary',
      title: t('dialog.confirmDelete'),
      content: t('dialog.confirmDeleteText')
    })
    if (confirm) {
      onRemove && onRemove()
    }
  }

  return (
    <Grid container columnSpacing={2} justifyContent='flex-end' sx={{mt: 2}}>
      <Grid item>
        <MyButton to={editPath} startIcon={<EditIcon/>}>
          {t('edit')}
        </MyButton>
      </Grid>
      <Grid item>
        <MyButton to={clonePath} startIcon={<FileCopyIcon/>} color='info'>
          {t('clone')}
        </MyButton>
      </Grid>
      <Grid item>
        <MyButton startIcon={<DeleteIcon/>} color='secondary' onClick={tryConfirmDelete}>
          {t('delete')}
        </MyButton>
      </Grid>
    </Grid>
  )
}