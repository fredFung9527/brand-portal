import { Grid } from '@mui/material'
import MyButton from '../MyButton'
import EditIcon from '@mui/icons-material/Edit'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import useTranslation from 'next-translate/useTranslation'
import DeleteButton from '../DeleteButton'
import ShareIcon from '@mui/icons-material/Share'
import { useDialog } from '../providers/DialogProvider'
import SimpleTable from '../SimpleTable'
import MyTextField from '../form/MyTextField'
import MyDatePicker from '../datetime/MyDatePicker'
import SubTitle from '../SubTitle'

function ShareButton() {
  const { t } = useTranslation('products')
  const [openDialog] = useDialog()

  const currentSharings = [
    ['Keith Wong', '01/03/2023', 'Fred Fung', '01/03/2022'],
  ]

  function onClick() {
    openDialog({
      title: t('common:share'),
      content:
        <>
          <SimpleTable
            headers={[
              { text: t('to') },
              { text: t('until') },
              { text: t('by') },
              { text: t('at') },
            ]}
            data={currentSharings}
            component='div'
          />
          <SubTitle>{t('newShare')}</SubTitle>
          <Grid container columnSpacing={2} alignItems='flex-end'>
            <Grid item xs={12} sm={6}>
              <MyTextField 
                label={t('to')}
                value={''} 
                onChange={() => null}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyDatePicker 
                label={t('until')} 
                value={''} 
                onChange={() => null}
              />
            </Grid>
          </Grid>
        </>,
      actions:
        <MyButton variant='text'>{t('common:confirm')}</MyButton>
    })
  }

  return (
    <MyButton 
      startIcon={<ShareIcon/>} 
      variant='text'
      onClick={onClick}
    >
      {t('common:share')}
    </MyButton>
  )
}

export default function PageActions({onRemove, editPath, clonePath}) {
  const { t } = useTranslation('common')

  return (
    <Grid container spacing={2} justifyContent='flex-end' sx={{mt: '1px'}}>
      <Grid item>
        <ShareButton/>
      </Grid>
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
        <DeleteButton textMode onRemove={onRemove}/>
      </Grid>
    </Grid>
  )
}