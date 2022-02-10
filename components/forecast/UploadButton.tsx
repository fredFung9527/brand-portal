import { Grid } from '@mui/material'
import MyButton from '../MyButton'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import useTranslation from 'next-translate/useTranslation'

export default function UploadButton({onClick, loading}) {
  const { t } = useTranslation('common')

  return (
    <Grid container justifyContent='center'>
      <MyButton
        onClick={onClick}
        loading={loading}
        size='large'
        sx={(theme) => ({
          mt: 2,
          borderRadius: theme.spacing(2),
          width: 300
        })}
        startIcon={<CloudUploadIcon/>}
      >
        {t('create')}
      </MyButton>
    </Grid>
  )
}