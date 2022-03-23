import { Grid } from '@mui/material'
import MyButton from '../MyButton'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import useTranslation from 'next-translate/useTranslation'

export default function EditSalesButton({to}) {
  const { t } = useTranslation('products')

  return (
    <Grid container justifyContent='center'>
      <MyButton
        to={to}
        size='large'
        sx={(theme) => ({
          mt: 2,
          borderRadius: theme.spacing(2),
          width: 300
        })}
        startIcon={<AttachMoneyIcon/>}
      >
        {t('editSales')}
      </MyButton>
    </Grid>
  )
}