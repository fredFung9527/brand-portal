import { Divider, Grid, IconButton, Tooltip } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import DeleteButton from '../DeleteButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FileCopyIcon from '@mui/icons-material/FileCopy'

export default function CardActions({onAdd, onRemove, onClone, sx=null}) {
  const { t } = useTranslation('common')

  return (
    <>
      <Divider sx={sx}/>
      <Grid container justifyContent='flex-end'>
        <Tooltip title={t('add')}>
          <IconButton color='primary' onClick={onAdd}>
            <AddCircleOutlineIcon/>
          </IconButton>
        </Tooltip>

        <Tooltip title={t('clone')}>
          <IconButton color='info' onClick={onClone}>
            <FileCopyIcon/>
          </IconButton>
        </Tooltip>

        <DeleteButton onRemove={onRemove}/>
      </Grid>
    </>
  )
}