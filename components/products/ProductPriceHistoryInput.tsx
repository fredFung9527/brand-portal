import { Typography, Grid, IconButton, Tooltip } from '@mui/material'
import { MyInputProps } from '../../@types/input'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import useTranslation from 'next-translate/useTranslation'
import { map, slice } from 'lodash'
import MyDatePicker from '../datetime/MyDatePicker'
import MyTextField from '../form/MyTextField'
import DeleteButton from '../DeleteButton'
import { checkDate, checkPrice } from '../../utils/rules'

export default function ProductPriceHistoryInput({label, value, onChange, error}: MyInputProps) {
  const { t } = useTranslation('products')

  function addItem() {
    onChange && onChange([
      ...(value || []),
      { before: null,  price: null}
    ])
  }

  function handlInput(v, idx, key) {
    const newItem = {...value[idx], [key]: v}
    onChange && onChange([
      ...slice(value, 0, idx),
      newItem,
      ...slice(value, idx + 1)
    ])
  }

  function removeItem(idx) {
    onChange && onChange([
      ...slice(value, 0, idx),
      ...slice(value, idx + 1)
    ])
  }

  return (
    <>
      <Grid container alignItems='center'>
        <Grid item>
          <Typography sx={(theme) => ({color: theme.palette.grayLabelText.main})}>{label || t('priceHistory')}</Typography>
        </Grid>
        <Grid item>
          <Tooltip title={t('addHistory')}>
            <IconButton color='primary' onClick={addItem}>
              <AddCircleOutlineIcon/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      {map(value, (item, idx) =>
        <Grid container key={idx} alignItems='center' sx={{mt: idx ? 2 : 0}}>
          <Grid 
            item xs 
            container 
            columnSpacing={2}
            sx={(theme) => ({
              backgroundColor: theme.palette.grayBg.main,
              borderRadius: theme.spacing(2),
              mx: 1,
              pr: 2,
            })}
          >
            <Grid item xs={12} sm={6}>
              <MyDatePicker 
                label={t('before')} 
                value={item.before} 
                onChange={(v) => handlInput(v, idx, 'before')}
                helperText={error ? checkDate(t('error:invalidDate'))(item.before) : ''}
                error={error && Boolean(checkDate(t('error:invalidDate'))(item.before))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MyTextField 
                label={t('price')} 
                type='number' 
                value={item.price || ''} 
                onChange={(v) => handlInput(v, idx, 'price')}
                helperText={error ? checkPrice(t('error:wrongPrice'))(item.price) : ''}
                error={error && Boolean(checkPrice(t('error:wrongPrice'))(item.price))}
              />
            </Grid>
          </Grid>
          <Grid item>
            <DeleteButton onRemove={() => removeItem(idx)}/>
          </Grid>
        </Grid>
      )}
    </>
  )
}