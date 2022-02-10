import { Grid, Typography } from '@mui/material'
import useTranslation from 'next-translate/useTranslation'
import MyImage from './MyImage'

export default function NoResultHint() {
  const { t } = useTranslation('common')

  return (
    <Grid container spacing={2} sx={{m: 2}}>
      <Grid item xs={12} container justifyContent='center'>
        <MyImage src='/images/no-result.png' width={150} height={150}/>
      </Grid>
      <Grid item xs={12} container justifyContent='center'>
        <Typography 
          sx={(theme) => ({color: theme.palette.grayText.main})}
        >
          { t('noResult') }
        </Typography>
      </Grid>
    </Grid>
  )
}